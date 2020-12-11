import Focus_scene from "../focus_scene";
import PopupPlugin from "../../dist/pop";
var initialTime2;
var timeLeftText;
var timeLeftRect;
var score = 0;

var x1;
var y1;
var y2;
var y3;
var y4;
var y5;
var y6;
var y7;
var sortingArray;
var sortingArray2;
var Name1;
var Name2;
var Name3;
var Name4;
var Name5;
var Name6;
var Name7;
var Name8;
var Name9;
var Name10;
var Name11;
var Name12;
var Name13;
var Name14;
var Name15;
var Name16;
var newX2;
var freePosX;
var freePosY;
var executed;
var collisionArray;
var timer;
var playRemove;
var x;
var y;
var done;
var check_X_PositionArray;
var check_Y_PositionArray;
var counter;
var whiteLayer;
export default class Focus6 extends Focus_scene {

  constructor() {
    //initialise work scene
    super(
      "focus6",
      "city",
      { x: 475, y: 500, scale: 1.3 },
      { x: 50, y: 220, width: 1220, height: 580 },
      [{}, {}, {}, {}, {}, { x: 693, y: 720, img: "arrow_down" }]
    );
    initialTime2 = 60;
  }

  init(data) {
    super.Init(data);
    super.done = data.done;
  }

  create() {
    playRemove = false;
    this.fired = 0;

    this.add.graphics().fillStyle(0x505050, 0.4);
    this.add.graphics().fillRect(0, 0, 1366, 768);
    this.add.graphics().setDepth(-900);

    super.create();


    super.createTaskbarButton(1, 300, 715, 115, "Go to work", 160);

    if (this.finished != 1) {
      this.btn1.on("pointerdown", () => {        
        this.btn1_create();
        this.pop;

        this.play_btn = this.add
          .sprite(680, 600, "borderPlay")
          .setInteractive({ useHandCursor: true })
          .setScale(0.5);

        this.play_btn.on(
          "pointerdown",
          () => {
            this.play_btn.setVisible(false);
            this.pop.toggleWindow();
            this.angryBoss.x = 1190;
            timer = this.time.addEvent({
              delay: 18000,
              callback: changePosition,
              repeat: 3,
            });

            this.createNames();
            //countdown for task
            timeLeftRect = this.add
              .graphics()
              .fillStyle(0x8b0000, 1)
              .setDepth(1200);
            timeLeftRect = this.add
              .graphics()
              .fillRoundedRect(880, 125, 250, 50, [20])
              .setDepth(1200);
            timeLeftText = this.add
              .text(885, 140, "Time left: 1:00", {
                fontSize: "25px",
                fill: "white",
              })
              .setDepth(1400);

            this.done = this.add
              .image(950, 240, "done")
              .setScale(1)
              .setInteractive({ useHandCursor: true })
              .setDepth(1200)
              .on("pointerdown", () => {
                //check and update score based on correct names
                counter = 0;
                for (var i = 0; i < sortingArray.length; i++) {
                  sortingArray[i].input.enabled = false;
                  sortingArray[i].setVisible(false);
                  if (
                    sortingArray[i].x == check_X_PositionArray[i] &&
                    sortingArray[i].y == check_Y_PositionArray[i]
                  ) {
                    score = score + 10;
                    counter = counter + 10;
                  }
                }
                this.sheet.setVisible(false);
                this.dyslexia.setVisible(false);
                this.dyslexia2.setVisible(false);
                this.done.setVisible(false);
                timeLeftText.setVisible(false);
                timeLeftRect.setVisible(false);
                this.angryBoss.setVisible(false);
                timer.destroy();
                if (counter < 50) {
                  this.Fired();
                }
                whiteLayer.setVisible(false);
                this.timedEvent.destroy();
                timeLeftText.destroy();
                timeLeftText.frame.glTexture = 0;
                this.btn1.input.enabled = false;
                this.finished = 1;
                super.updateText(4);
              });
          },
          this
        );
        this.btn1.input.enabled = false;
      });
    } else {
      this.btn1.input.enabled = false;
    }
    function changePosition() {
      //random event to change two names
      this.value = Phaser.Math.Between(0, 15);
      this.value2 = Phaser.Math.Between(0, 15);
      x = sortingArray[this.value].x;
      y = sortingArray[this.value].y;
      sortingArray[this.value].x = sortingArray[this.value2].x;
      sortingArray[this.value].y = sortingArray[this.value2].y;
      sortingArray[this.value2].x = x;
      sortingArray[this.value2].y = y;
    }
  }
  
  onEvent() {
    if (timeLeftText && timeLeftText.frame.glTexture !== 0) {
      initialTime2 -= 1;
      this.seconds2 = initialTime2;
      this.minutes2 = Math.floor(this.seconds2 / 60);
      this.partInSeconds2 = this.seconds2 % 60;
      this.partInSeconds2 = this.partInSeconds2.toString().padStart(2, "0");
      this.fa = `${this.minutes2}:${this.partInSeconds2}`;
      timeLeftText.setText("Time left: " + this.fa);
    }
  }

  btn1_create() {
    //create work popup
    this.t =
      '"You are late, again! \n\n' +
      "Today you will be sorting files in the personnel apartment.\n \n" +
      "Sort the names from A to Z, please, and don't make mistakes this time.\n \n" +
      "I'll have to fire you, if you don't submit your work in time. It's your final chance!" +
      '"' +
      "\n \n";
    this.pop = new PopupPlugin(
      this,
      10,
      "0x907748",
      650,
      32,
      800,
      1,
      280,
      -50,
      0,
      "28px",
      true
    );
    this.pop.setText(this.t, true);
    this.angryBoss = this.add
      .image(1190, 430, "angryBoss")
      .setScale(2)
      .setDepth(1400);
  }

  createNames() {    
    //create names and place them in the right positions
    this.elementDragged = false;
    whiteLayer = this.add
      .graphics()
      .fillStyle(0x505050, 0.6)
      .fillRect(0, 0, 1366, 768)
      .setDepth(950);
    this.sheet = this.add.image(492, 350, "sheet").setDepth(1000);
    this.dyslexia = this.add.image(100, 350, "dyslexia").setDepth(1000);
    this.dyslexia2 = this.add
      .image(70, 150, "dyslexia2")
      .setDepth(1000)
      .setScale(1.3);
    x1 = 490;

    y1 = 87;
    y2 = y1 + 75;
    y3 = y2 + 75;
    y4 = y3 + 75;
    y5 = y4 + 75;
    y6 = y5 + 75;
    y7 = y6 + 75;

    sortingArray = [
      Name9,
      Name10,
      Name11,
      Name4,
      Name12,
      Name2,
      Name5,
      Name6,
      Name13,
      Name15,
      Name3,
      Name16,
      Name1,
      Name8,
      Name14,
      Name7,
    ];
    sortingArray2 = [
      "name9",
      "name10",
      "name11",
      "name4",
      "name12",
      "name2",
      "name5",
      "name6",
      "name13",
      "name15",
      "name3",
      "name16",
      "name1",
      "name8",
      "name14",
      "name7",
    ];

    newX2 = [
      317,
      317,
      317,
      317,
      317,
      317,
      317,
      317,
      667,
      667,
      667,
      667,
      667,
      667,
      667,
      667,
    ];
    check_X_PositionArray = [
      667,
      667,
      667,
      317,
      667,
      317,
      317,
      317,
      667,
      667,
      317,
      667,
      317,
      317,
      667,
      317,
    ];
    check_Y_PositionArray = [
      90 - 40,
      205 - 40,
      280 - 40,
      355 - 40,
      355 - 40,
      205 - 40,
      430 - 40,
      505 - 40,
      430 - 40,
      580 - 40,
      280 - 40,
      655 - 40,
      90 - 40,
      655 - 40,
      505 - 40,
      580 - 40,
    ];

    for (var i = 0; i < sortingArray.length; i++) {
      sortingArray[i] = this.add
        .sprite(newX2[i], 90 + (i % 8) * 75, sortingArray2[i])
        .setInteractive({ useHandCursor: true, draggable: true })
        .setDepth(1200);

      sortingArray[i].on("drag", function (pointer, dragX, dragY) {
        this.pointer = pointer;
        this.x = dragX;
        this.y = dragY;
      });
      function createFreePos(x, y, i) {
        freePosX = x;
        freePosY = y;
      }
      sortingArray[i].on("dragstart", function () {
        createFreePos(this.x, this.y);
        this.elementDragged = true;
      });

      sortingArray[i].on("dragend", function () {
        //control the movement of the left row
        executed = 0;
        if (this.x < x1 && this.y < y1) {
          this.x = 317;
          this.y = 90;
        } else if (this.x < x1 && this.y > y1 && this.y < y2 + 20) {
          this.x = 317;
          this.y = 90 + 75;
        } else if (this.x < x1 && this.y > y2 && this.y < y3 + 20) {
          this.x = 317;
          this.y = 90 + 2 * 75;
        } else if (this.x < x1 && this.y > y3 && this.y < y4 + 20) {
          this.x = 317;
          this.y = 90 + 3 * 75;
        } else if (this.x < x1 && this.y > y4 && this.y < y5 + 20) {
          this.x = 317;
          this.y = 90 + 4 * 75;
        } else if (this.x < x1 && this.y > y5 && this.y < y6 + 20) {
          this.x = 317;
          this.y = 90 + 5 * 75;
        } else if (this.x < x1 && this.y > y6 && this.y < y7 + 20) {
          this.x = 317;
          this.y = 90 + 6 * 75;
        } else if (this.x < x1 && this.y > y7 && this.y > y7) {
          this.x = 317;
          this.y = 90 + 7 * 75;
        }

        //control the movement of the right row
        if (this.x > x1 && this.y < y1) {
          this.x = 667;
          this.y = 90;
        } else if (this.x > x1 && this.y > y1 && this.y < y2 + 20) {
          this.x = 667;
          this.y = 90 + 75;
        } else if (this.x > x1 && this.y > y2 && this.y < y3 + 20) {
          this.x = 667;
          this.y = 90 + 2 * 75;
        } else if (this.x > x1 && this.y > y3 && this.y < y4 + 20) {
          this.x = 667;
          this.y = 90 + 3 * 75;
        } else if (this.x > x1 && this.y > y4 && this.y < y5 + 20) {
          this.x = 667;
          this.y = 90 + 4 * 75;
        } else if (this.x > x1 && this.y > y5 && this.y < y6 + 20) {
          this.x = 667;
          this.y = 90 + 5 * 75;
        } else if (this.x > x1 && this.y > y6 && this.y < y7) {
          this.x = 667;
          this.y = 90 + 6 * 75;
        } else if (this.x > x1 && this.y > y7 && this.y > y7) {
          this.x = 667;
          this.y = 90 + 7 * 75;
        }
      });
    }
  }

  Fired() {
    //fired event handler
    if (!this.firedExecuted) {

      this.layer = this.add.graphics().fillStyle(0x303030, 0.8);

      this.bigWhiteLayer = this.add
        .graphics()
        .fillRect(0, 0, 1366, 768)
        .setDepth(900);

      super.updateB2("12");
      super.updateB3("18");

      var fired_text = {
        x: 240,
        y: 250,
        text: "You are fired!!!",
        style: {
          fontSize: "140px",
          fontStyle: "bold",
          fontFamily: "Aleo",
          color: "#ff0f0f",
          align: "center",
          lineSpacing: 20,
          stroke: "#000000",
          stokeThickness: 20,
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: "#000",
            blur: 0,
            stroke: true,
            fill: true,
          },
          wordWrap: { width: 900, useAdvancedWrap: true },
        },
      };
      this.firedExecuted = true;
    }

    this.notification = this.make.text(fired_text).setDepth(1200);
    this.callThere = 1;

    if (this.callThere == 1) {
      this.timedEvent2 = this.time.addEvent({
        delay: 2000,
        callback: notificationDelete,
        callbackScope: this,
      });
      this.callThere = 0;

      function notificationDelete() {
        this.bigWhiteLayer.clear();
        this.notification.setVisible(false);
      }
    }
  }

  US(s) {
    super.updatescore(s);
  }

  update() {
    super.update();
    if (executed == 0) {
      for (var item = 0; item < sortingArray.length; item++) {
        //check which two names are being moved around
        for (var i = 0; i < sortingArray.length; i++) {
          if (
            sortingArray[i].getBounds().y == sortingArray[item].getBounds().y &&
            sortingArray[i].getBounds().x == sortingArray[item].getBounds().x &&
            sortingArray[i] != sortingArray[item]
          ) {
            if (sortingArray[i].elementDragged) {
              sortingArray[item].y = freePosY;
              sortingArray[item].x = freePosX;
              sortingArray[i].elementDragged = false;
            }
            if (sortingArray[item].elementDragged) {
              sortingArray[i].y = freePosY;
              sortingArray[i].x = freePosX;
              sortingArray[item].elementDragged = false;
            }
          }
        }
        executed = 1;
      }
    }

    if (this.done) {
      this.timedEvent = this.time.addEvent({
        delay: 60000,
        callback: onEvent,
        callbackScope: this,
      });

      function onEvent() {
        for (var i = 0; i < sortingArray.length; i++) {
          sortingArray[i].input.enabled = false;
          sortingArray[i].setVisible(false);
        }
        this.sheet.setVisible(false);
        this.dyslexia.setVisible(false);
        this.dyslexia2.setVisible(false);
        this.done.setVisible(false);
        timeLeftText.setVisible(false);
        timeLeftText.destroy();
        timeLeftRect.setVisible(false);
        this.angryBoss.setVisible(false);
        whiteLayer.setVisible(false);
        timer.destroy();
        this.timedEvent.destroy();
        if (this.fired == 0) {
          this.Fired();

          for (var i = 0; i < sortingArray.length; i++) {
            sortingArray[i].input.enabled = false;
            sortingArray[i].setVisible(false);
            if (
              sortingArray[i].x == check_X_PositionArray[i] &&
              sortingArray[i].y == check_Y_PositionArray[i]
            ) {
              score = score + 10;
              counter = counter + 10;
            }
          }
          this.US(score);
          this.fired = 1;
        }
        timeLeftText.frame.glTexture = 0;
      }
    }

    if (this.pop) {
      if (this.pop.closeBtn.closedFlag == 1) {
        if (this.play_btn) {
          this.play_btn;
          this.play_btn.setVisible(false);
          this.play_btn.input.enabled = false;
          this.btn1.input.enabled = false;
        }
        this.btn1.input.enabled = true;
      }
    }
  }
}
