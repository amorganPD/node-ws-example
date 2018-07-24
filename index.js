const express = require('express');
const WebSocket = require('ws');

const app = express();
var port = process.env.port || 3000;

app.use(express.static(__dirname + '/app'));

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', function (socket) {
  console.log("Connected");
  
  socket.on('message', function incoming(message) {
    var data = JSON.parse(message);
    console.log(data);
    socket.send(message);
  });

  socket.on('disconnect', function incoming(message) {
  });
  socket.on('error', function incoming(error) {
  });


});

webSocketServer.on('upgrade', function(req, socket, head) {
  console.log("Connection upgrade.");
  webSocketServer.handleUpgrade(req, socket, head, function(client){ /* etc */ });
});

app.listen(port, function () {
	console.log('Now listening on port ' + port);
});