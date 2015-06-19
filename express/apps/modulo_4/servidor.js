var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var servidor = express();
servidor.use(bodyParser.urlencoded({ extended: false }));

servidor.get('/pregunta', function(req,res) {
	res.sendFile(path.join(__dirname, './public/pregunta.htm'));
});
servidor.post('/respuesta', function(req,res) {
	//res.send("_pregunta=" + req.body._pregunta + " resp=" + req.body.resp);
	if (req.body._pregunta == "1") {
		var cad = "Su respuesta es : " + req.body.resp + "<br>";
		var correcta = "Cristobal Colón";
		if (req.body.resp == correcta) {
			cad += "<br>Correcto!<br>";
		} else {
			cad += "<br>La respuesta correcta es: " + correcta + "<br>";
		}
		cad += "<a href=\"/pregunta\">Volver</a>\n";
		res.send(cad);
	} else if (req.body._pregunta == "2") {
		var cad = "Su respuesta es : " + req.body.resp + "<br>";
		var correcta = "Lisboa";
		if (req.body.resp == correcta) {
			cad += "<br>Correcto!<br>";
		} else {
			cad += "<br>La respuesta correcta es: " + correcta + "<br>";
		}
		cad += "<a href=\"/pregunta\">Volver</a>\n";
		res.send(cad);
	} else {
		cad = "Pregunta incorrecta (" + req.body._pregunta + ")";
		cad += "<a href=\"/pregunta\">Volver</a>\n";
		res.send(cad);
	}		
});
servidor.get('*', function(req,res) {
	res.redirect('/pregunta');
});

servidor.listen(8000);
console.log("Escuchando el puerto 8000");
console.log("Acceder con http://localhost:8000");
console.log("Control-C para terminar");
