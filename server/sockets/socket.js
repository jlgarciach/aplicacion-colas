/*
    Este es el backend
*/

const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callbak) => {
        let siguiente = ticketControl.siguiente();
        console.log('Cuál es el siguiente ticket...: ', siguiente);
        callbak(siguiente);
    });

    // emitir un evento "estadoActual"

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callbak) => {
        if (!data.escritorio) {
            return callbak({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callbak(atenderTicket);

        // actualizar/notificar cambios en los ULTIMOS 4
        // emitir 'ultimos4' y hay que envier un broadcast
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });



});