importScripts('socket.io.js');


var socket = io('ws://virtualconcertserver.herokuapp.com:80/socket.io/?EIO=4&transport=websocket');

var connections = 0;

self.addEventListener("connect", function(e) {
    var port = e.ports[0];
    connections ++;
    port.addEventListener("message", function(e) {
        if (e.data === "start") {

            port.postMessage('hello');
        }
    }, false);
    port.start();

    socket.on('push', function(pushed){

        port.postMessage(pushed);
    });


    socket.on('connect', function () {
        port.postMessage('connect');
    });

    socket.on('disconnect', function () {
        port.postMessage('disconnect');
    });

}, false);