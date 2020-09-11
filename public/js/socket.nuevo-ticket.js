/*
    Este es el fontend
*/

// Comando para establecer la conexión


var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado.....');
});

socket.on('disconnect', function() {
    console.log('Desconectado del sistema de ticket');
});

// on "estadoActula"
socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});

$('button').on('click', function() {
    console.log('un CLICK !!!');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});