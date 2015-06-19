var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req, res, next){
  app.locals.cont = (app.locals.cont || 0);
  app.locals.cont += 1;
  console.log("Visitas: " + app.locals.cont);
  next();
});

app.get('/mi_ruta', function(req, res, next){
  res.send('<html><body>Mi ruta</body></html>');
});

app.get('/mi*', function(req, res){
  res.send('<html><body>Mi ruta2</body></html>');
});

app.get('/hola/:n', function(req, res){
  res.send('Hola ' + req.params.n);
});

app.get('/service/:op/user/:id', function(req, res){
  res.send('Usuario ' + req.params.id + ' solicita ' + req.params.op);
});

app.get('/user/:id?', function(req, res){
  res.send('User ' + (req.params.id || 'anonimo'));
});

app.get('/user1/:id(\\d+)', function(req, res){
  res.send('User1 ' + req.params.id);
});

app.get('*', function(req, res){
  res.send("Visita número: " + app.locals.cont);
});

app.listen(8000);
