'use strict';
/* global require, console */

var express = require('express');
var app = express();

var _checkAnswer = function(question, answer) {
    var correctAnswer;
    if (question === '¿Quién descubrió América?') {
        correctAnswer = 'Colón';
        return correctAnswer === answer || correctAnswer;
    } else if (question === '¿Capital de Portugal?') {
        correctAnswer = 'Lisboa';
        return correctAnswer === answer || correctAnswer;
    }
};

app.get('/preguntas', function(req, res) {
    res.send('<html>' +
        '<title>Quiz preguntas</title>' +
        '<body>' +
        '<h1>Quiz preguntas</h1>' +
        '<h2>¿Quién descubrió América?</h2>' +
        '<form method="GET" action="/respuesta">' +
        '<input type="hidden" value="¿Quién descubrió América?" name="question">' +
        '<input type="text" value="" name="answer" placeholder="Introduce tu respuesta">' +
        '<button type="submit">Enviar</button>' +
        '</form>' +
        '<br>' +
        '<h2>¿Capital de Portugal?</h2>' +
        '<form method="GET" action="/respuesta">' +
        '<input type="hidden" value="¿Capital de Portugal?" name="question">' +
        '<input type="text" value="" name="answer" placeholder="Introduce tu respuesta">' +
        '<button type="submit">Enviar</button>' +
        '</form>' +
        '</body>' +
        '</html>');
});

app.get('/respuesta', function(req, res) {

    var value = _checkAnswer(req.query.question, req.query.answer),
        htmlMessage;
    if (value === true) {
        htmlMessage = '<p>Tu respuesta es: ' + req.query.answer + '</p>' +
            '<p style="color:green">¡Tu respuesta es correcta! :)</p>';
    } else {
        htmlMessage = '<p>Tu respuesta no es correcta :(</p>' +
            '<p>La respuesta correcta es: ' + value + '</p>';
    }

    res.send('<html>' +
        '<title>Quiz respuesta</title>' +
        '<body>' +
        '<h1>Quiz respuesta</h1>' +
        '<h2>' + req.query.question + '</h2>' +
        htmlMessage +
        '<br>' +
        '<a href="/preguntas">Volver a la página inicial</a>' +
        '</body>' +
        '</html>');

});

app.get('*', function(req, res, next) {
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err.toString());
});

app.listen(8000);
console.log('Listenting on port 8000');
