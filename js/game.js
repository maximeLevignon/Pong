var game = {
    
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor: "#FFFFFF",
    playersBallLayer : null,

    scorePlayer1 : 0,
    scorePlayer2 : 0,
    scorePosPlayer1 : 300,
    scorePosPlayer2 : 365,

    wallSound : null,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        speed : 1,
        directionX : 1,
        directionY : 1,

        move : function() {
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },

        reInitBall : function(){
            this.posX = 200;
            this.posY = 200;
            this.directionX = 1 ;
            game.clearLayer(game.scoreLayer);
            game.displayScore(game.scorePlayer1, game.scorePlayer2);
        },

        bounce : function() {
            if ( this.posX > game.groundWidth){
                //this.directionX = -this.directionX;
                game.scorePlayer1++;
                this.reInitBall();
            }

            if (this.posX < 0 ){
                game.scorePlayer2++;
                this.reInitBall();
            }
              
            if ( this.posY > game.groundHeight || this.posY < 0  ){
                this.directionY = -this.directionY; 
            }     
        },

        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
                || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
                  // Collision
                  return true;
                } 
                return false;
          },
    },

    playerOne : {
        width : 10,
        height : 70,
        color : "#FFFFFF",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false
    },
       
    playerTwo : {
        width : 10,
        height : 70,
        color : "#FFFFFF",
        posX : 680,
        posY : 200,
        goUp : false,
        goDown : false
    },

    playerThree : {
        width : 10,
        height : 70,
        color : "#FFFFFF",
        posX : 580,
        posY : 200,
        goUp : false,
        goDown : false
    },

    playerFour : {
        width : 10,
        height : 70,
        color : "#FFFFFF",
        posX : 110,
        posY : 200,
        goUp : false,
        goDown : false
    },
     

    groundLayer : null,

    init : function() {
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
    
        game.display.drawTextInLayer(this.scoreLayer, "SCORE", "10px Arial", "#FF0000", 10, 10);
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);

        game.display.drawTextInLayer(this.playersBallLayer, "JOUEURSETBALLE", "10px Arial", "#FF0000", 100, 100);

        this.displayScore(this.scorePlayer1, this.scorePlayer2);
        this.displayBall(this.ball.posX,this.ball.posY);
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

        this.wallSound = new Audio();
        this.wallSound.src = "big-shaq-boom-sound-effect.mp3";
        console.log(this.wallSound);
    },

    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
    },

    moveBall : function() { 
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
    }, 

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    

    movePlayers : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 0){
          game.playerOne.posY-=5;
        }
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height){
          game.playerOne.posY+=5;
        }
      

        if (game.playerTwo.goUp && game.playerTwo.posY > 0)
          game.playerTwo.posY-=5;
        else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
          game.playerTwo.posY+=5;

        if (game.playerThree.goUp && game.playerThree.posY > 0)
          game.playerThree.posY-=5;
        else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
          game.playerThree.posY+=5;

        if (game.playerFour.goUp && game.playerFour.posY > 0)
          game.playerFour.posY-=5;
        else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
          game.playerFour.posY+=5;
    },

    movePlayer1 : function(){
        if (game.playerOne.goUp && game.playerOne.posY > 0)
          game.playerOne.posY-=5;
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
          game.playerOne.posY+=5;
    },

    movePlayer2 : function(){
        if (game.playerTwo.goUp && game.playerTwo.posY > 0)
        game.playerTwo.posY-=5;
      else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
        game.playerTwo.posY+=5;
    },

    movePlayer3 : function(){
        if (game.playerThree.goUp && game.playerThree.posY > 0)
        game.playerThree.posY-=5;
      else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
        game.playerThree.posY+=5;
    },

    movePlayer4 : function(){
        if (game.playerFour.goUp && game.playerFour.posY > 0)
        game.playerFour.posY-=5;
      else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
        game.playerFour.posY+=5;
    },

      collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) ){
            game.ball.directionX = -game.ball.directionX;
            this.wallSound.play();
        }
          
        if ( this.ball.collide(game.playerTwo) ){
            game.ball.directionX = -game.ball.directionX;
            this.wallSound.play();
        }

        if ( this.ball.collide(game.playerThree) ){
            game.ball.directionX = -game.ball.directionX;
            this.wallSound.play();
        }

        if ( this.ball.collide(game.playerFour) ){
            game.ball.directionX = -game.ball.directionX;
            this.wallSound.play();
        }
          
      },  

};