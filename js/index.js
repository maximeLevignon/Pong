const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);
let nbPlayers = 0 ;

let socketJ1 ;
let socketJ2 ;
let socketJ3 ;
let socketJ4 ;
  
app.get('/gameControl', (req, res) => {
    res.sendFile(__dirname + '/game.control.js');
  });

  app.get('/gameDisplay', (req, res) => {
    res.sendFile(__dirname + '/game.display.js');
  });

  app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.js');
  });

  app.get('/gameKeycode', (req, res) => {
    res.sendFile(__dirname + '/game.keycode.js');
  });

  app.get('/sound', (req, res) => {
    res.sendFile(__dirname + '/big-shaq-boom-sound-effect.mp3');
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pong.html');
  });

   /**
    * io.emit : server vers socket
    * socket.emit : socket vers server
    */

io.on('connection',(socket) => {
    console.log('a user connected');
    nbPlayers ++;

    if(nbPlayers === 1){
      socketJ1 = socket.id;
      socket.emit('player',  'player1');
    }

    if(nbPlayers === 2){
      socketJ2 = socket.id;
      socket.emit('player',  'player2');
    }

    if(nbPlayers === 3){
      socketJ3 = socket.id;
      socket.emit('player',  'player3');
    }

    if(nbPlayers === 4){
      socketJ4 = socket.id;
      socket.emit('player',  'player4');
    }


    socket.on('playerOne move', (player)=>{
      io.emit("updatePosP1", player);
    });

    socket.on('playerTwo move', (player)=>{
      io.emit("updatePosP2", player);
    });
    

    socket.on('playerThree move', (player)=>{
      io.emit("updatePosP3", player);
    });
    

    socket.on('playerFour move', (player)=>{
      io.emit("updatePosP4", player);
    });

    socket.on('updatePosBall', (ball) =>{
      io.emit("updatePosBallFromServer", ball)
    });
    
    
  
    socket.on('disconnect', () =>{
      nbPlayers--;
      console.log("user disconnected");
    });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
