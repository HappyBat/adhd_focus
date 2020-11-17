import Focus_scene from "../focus_scene";

var maze = [];
var mazeWidth = 80;
var mazeHeight = 61;
var tileSize = 10;
var mazeGraphics;
var moves = [];
var posX = 1;
var posY = 1;
export default class Focus7 extends Focus_scene {
  constructor() {
    super(
      "focus7",
      "bathroom",
      { x: 475, y: 500, scale: 1.5 },
      { x: 40, y: 195, width: 1220, height: 640 },
      [{}, {}, {}, {}, {}, { x: 693, y: 720, img: "arrow_down" }]
    );
  }

  /*init(data){
        super.setInitialTime(data.it);
        super.setScoreValue(data.sv);
    }*/
  init(data) {
    super.Init(data);
  }
  create() {
    super.create();

    mazeGraphics = this.add.graphics(0, 0);
    this.timedEvent = this.time.addEvent({
      delay: 10,
      callback: this.mazeCall,
      callbackScope: this,
      repeat: 10,
    });
    
    maze[posX][posY] = 0;
    moves.push(posY + posY * mazeWidth);    
  }
  onEvent() {}
  drawMaze() {
    console.log("maze drawn")

    for (var i = 0; i < mazeHeight; i++) {
      maze[i] = [];
      for (var j = 0; j < mazeWidth; j++) {
        maze[i][j] = 1;
      }
    }
      mazeGraphics.clear();
      mazeGraphics.fillStyle(0xcccccc);
      for (i = 0; i < mazeHeight; i++) {
        for (j = 0; j < mazeWidth; j++) {
          if (maze[i][j] == 1) {
            mazeGraphics.fillRect(
              j * tileSize,
              i * tileSize,
              tileSize,
              tileSize
            );
          }
        }
      }
      //mazeGraphics.endPath();
      mazeGraphics.fillStyle(0xff0000);
      mazeGraphics.fillRect(
        posY * tileSize,
        posX * tileSize,
        tileSize,
        tileSize
      );
      //mazeGraphics.endPath();
      mazeGraphics.setDepth(2000);
    
  }
mazeCall() {
      if (moves.length) {
        console.log("maze called");
        var possibleDirections = "";
        if (
          posX + 2 > 0 &&
          posX + 2 < mazeHeight - 1 &&
          maze[posX + 2][posY] == 1
        ) {
          possibleDirections += "S";
        }
        if (
          posX - 2 > 0 &&
          posX - 2 < mazeHeight - 1 &&
          maze[posX - 2][posY] == 1
        ) {
          possibleDirections += "N";
        }
        if (
          posY - 2 > 0 &&
          posY - 2 < mazeWidth - 1 &&
          maze[posX][posY - 2] == 1
        ) {
          possibleDirections += "W";
        }
        if (
          posY + 2 > 0 &&
          posY + 2 < mazeWidth - 1 &&
          maze[posX][posY + 2] == 1
        ) {
          possibleDirections += "E";
        }
        if (possibleDirections) {
          var move = Phaser.Math.Between(0, possibleDirections.length - 1);
          switch (possibleDirections[move]) {
            case "N":
              maze[posX - 2][posY] = 0;
              maze[posX - 1][posY] = 0;
              posX -= 2;
              break;
            case "S":
              maze[posX + 2][posY] = 0;
              maze[posX + 1][posY] = 0;
              posX += 2;
              break;
            case "W":
              maze[posX][posY - 2] = 0;
              maze[posX][posY - 1] = 0;
              posY -= 2;
              break;
            case "E":
              maze[posX][posY + 2] = 0;
              maze[posX][posY + 1] = 0;
              posY += 2;
              break;
          }
          moves.push(posY + posX * mazeWidth);
        } else {
          var back = moves.pop();
          posX = Math.floor(back / mazeWidth);
          posY = back % mazeWidth;
        }
      drawMaze(posX, posY);
      }
    }
  update() {
    super.update();
  }
}
