var express = require('express');
var app = express();
var preguntas = ["¿Quién descubrió América?", "¿Capital de Portugal?"];
var respuestas = ["cristóbal colón", "lisboa"];

// ------------------------ FUNCIONES AUXILIARES ------------------------

function convertir(string){
    string = string.trim(); // elimina espacios iniciales y finales
    string = string.replace(/\s+/g, " "); // reemplaza varios espacios en 1
    string = string.toLowerCase(); //Lo pasa a minuscula
    return string;
}

function getFormularioPreguntas() { //genera las diferentes preguntas
    var formulario = '';
    for (var i = 0; i < preguntas.length; i++) {
        formulario +=
                '<form method="get" action="/respuesta">' +
                    '<input type="hidden" name="id" value="' + i + '"/>' +
                    '<label for="pregunta_' + i + '">' + preguntas[i] + '</label>&nbsp;' +
                    '<input type="text" id="pregunta_' + i + '" name="resp" required/>&nbsp;' +
                    '<button type="submit">Enviar</button>' +
                '</form>';
    }
    return formulario;
}

function getRespuestaPregunta(id_pregunta, respuesta) { //comprueba y devuelve la respuesta
    var resultado = 'No existe la pregunta';
    respuesta = convertir(respuesta);
    if (id_pregunta < preguntas.length) { //Por si la pregunta no existe
        if (id_pregunta >= respuestas.length){ //Por si se añade una pregunta pero no una respuesta
            resultado = 'No se tienen datos de esa pregunta';
        }else if (respuesta == respuestas[id_pregunta]) { //Si existe la pregunta y la respuesta, se comprueba la que ha introducido
            resultado = '<h2>Respuesta Correcta</h2> Felicidades!!';
        }else{
            resultado = '<h2>Respuesta incorrecta</h2> La respuesta correcta es: ' + respuestas[id_pregunta];
        }
    }
    resultado += '<br/><br/><a href="/preguntas">Volver a la página inicial</a>';
    return resultado;
}

// ----------------------------- MIDDLEWARE -----------------------------

app.get('/preguntas', function (request, response) {
    var preguntas = getFormularioPreguntas();
    response.send(preguntas);
});

app.get('/respuesta', function (request, response) {
    var params = request.query;
    var respuesta = getRespuestaPregunta(params.id, params.resp);
    response.send(respuesta);
});

app.get('*', function (request, response) {
    response.status(404);
    response.send('Error 404: Página no encontrada');
});

app.listen(8000);

console.log('Escuchando peticiones');