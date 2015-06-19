var express = require('express');
var app = express();

app.get('/preguntas', function(req, res){
  res.send(
    '<!DOCTYPE html><html>'
    + '<head><title>Preguntas</title><meta charset="UTF-8"></head>'
    + '<body>'
    + '<form method="get" action="/respuesta">'
    +   '<input type="hidden" name="pregunta" value="america"/>'
    +   '¿Quién descubrió América?<br>'
    +   '<input type="text" name="respuesta"/><br>'
    +   '<input type="submit" value="Enviar">'
    + '</form>'
    + '<form method="get" action="/respuesta">'
    +   '<input type="hidden" name="pregunta" value="portugal"/>'
    +   '¿Capital de Portugal?<br>'
    +   '<input type="text" name="respuesta"/><br>'
    +   '<input type="submit" value="Enviar">'
    + '</form>'
    +'</body></html>');
});

app.get('/respuesta', function(req, res){
  var respuesta = "";
  if(req.query.pregunta === "america"){
    console.log(req.query.respuesta.trim().toLowerCase());
    console.log("cristobalcolon");
    console.log(req.query.respuesta.trim().toLowerCase() == "cristobalcolon");
    console.log(req.query.respuesta.trim().toLowerCase() === "cristobalcolon");
    if(req.query.respuesta.toLowerCase() == "cristobal colon" || req.query.respuesta.toLowerCase() == "cristobal colón"){
      respuesta = "Enhorabuena, respuesta correcta.";
    }else{
      respuesta = "Respuesta incorrecta. La respuesta correcta es \"Cristobal Colón\".";
    }
  }else{
    if(req.query.pregunta === "portugal"){
      if(req.query.respuesta.toLowerCase() == "lisboa"){
        respuesta = "Enhorabuena, respuesta correcta.";
      }else{
        respuesta = "Respuesta incorrecta. La respuesta correcta es \"Lisboa\".";
      }
    }else{
      respuesta = "La respuesta no está asociada a una pregunta correcta."
    }
  }
  res.send(
    '<!DOCTYPE html><html>'
    + '<head><title>Respuesta</title><meta charset="UTF-8"></head>'
    + '<body>'
    +   respuesta + '<br>'
    +   '<a href="preguntas">Volver</a>'
    +'</body></html>');
});

app.listen(8000);
