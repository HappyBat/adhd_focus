import Focus_scene from "../focus_scene";
import PopupPlugin from "../../dist/pop";
var initialTime2;
var timeLeftText;
var timeLeftRect;
var billCounter;
var oH;
var updated = 0;
var counter;
var changed =0;

export default class Focus4 extends Focus_scene {
  constructor() {
    super(
      "focus4",
      "studyRoom",
      { x: 683, y: 384, scale: 1.5 },
      { x: 40, y: 190, width: 1240, height: 640 },
      [{}, {}, {}, {}, { x: 1290, y: 650, img: "arrow_right_white" }, {}]
    );

    initialTime2 = 150;
  }
  init(data) {
    super.Init(data);
    billCounter = data.billCounter;
    oH = data.oH;
  }
  create() {
    console.log("oH");
    console.log(oH);
    super.create();

    timeLeftText;
    //this.timer2 = setInterval(this.onEvent(), 1000);

    //create taskbar

    this.nowCreate = 0;
    this.created = 0;
    this.allObjects = new Array();
    this.allEmpties = new Array();
    this.buttonThere = 0;
    //this.executed = 0;
    this.executed2 = 0;
    this.x = 0;

    super.createTaskbarButton(1, 300, 715, 140, "Prep for exam");
    super.createTaskbarButton(2, 500, 715, 100, "Pay bills");

    //open instructions on click
    this.btn1.on("pointerdown", () => {
      this.btn1_create();
      this.pop;
      this.check = 1;

      this.input.on(
        "gameobjectup",
        function (pointer, gameObject) {
          if (this.x == 0 && this.created == 0) {
            gameObject.emit("clicked", gameObject);
          }
        },
        this
      );

      this.play_btn = this.add
        .sprite(680, 600, "borderPlay")
        .setInteractive({ useHandCursor: true })
        .setScale(0.5);
      //this.play_btn.on("clicked2", playRemove, this);

      this.play_btn.on(
        "pointerdown",
        () => {
          this.play_btn.input.enabled = false;
          this.btn1.input.enabled = false;
          this.pop.toggleWindow();
          this.play_btn.setVisible(false);
          if (this.x == 0) {
            if (this.check == 1) {
              //text to read
              this.studyText = this.add
                .image(683, 384, "studyText")
                .setDepth(1000);

              //countdown for task
              timeLeftRect = this.add
                .graphics()
                .fillStyle(0x8b0000, 1)
                .setDepth(1200);
              timeLeftRect = this.add
                .graphics()
                .fillRoundedRect(950, 15, 240, 50, [20])
                .setDepth(1200);

              timeLeftText = this.add
                .text(960, 30, "Time left: 1:30", {
                  fontSize: "25px",
                  fill: "white",
                })
                .setDepth(1200);

              //flying objects as distruction from text
              for (var i = 0; i < 50; i++) {
                var x = Phaser.Math.Between(60, 1300);
                var y = Phaser.Math.Between(35, 750);

                this.virus = this.physics.add
                  .sprite(x, y, "virus")
                  .setInteractive({ useHandCursor: true })
                  .setDepth(1300);
                if (i % 2 != 0) {
                  this.virus.setScale(2);
                }

                this.virus.on("clicked", virusRemove, this);
                this.allObjects.push(this.virus);
                this.check = 0;
              }
            }

            //remove on click
            function virusRemove(virus = this.virus) {
              //this.check = 0;
              virus.input.enabled = false;
              virus.off("clicked", virusRemove);
              virus.setVisible(false);
            }
          }
        },
        this
      );
      this.btn1.input.enabled = false;
    });
    this.call = 0;
    this.btn2.on("pointerdown", () => {
      this.pop_billsCreated = 0;
      if (billCounter < 3 && !oH) {
        this.bills_blurred = this.add
          .image(683, 384, "bills_blurred")
          .setScale(0.5);
        this.t =
          "Oh no! Why do you feel so overwhelmed? The text seems blurred, you can't see a single letter.\n\n" +
          "Try again later!";
        this.pop_bills = new PopupPlugin(
          this,
          10,
          "0x907748",
          300,
          32,
          520,
          1,
          433,
          -50,
          0,
          "28px",
          true
        );
        this.pop_bills.setText(this.t, true);
        this.pop_billsCreated = 1;

        this.call = this.call + 1;
        updateCounter(this);
      } else if (oH && this.call < 3 && this.x != 1) {
        this.bills_blurred2 = this.add.image(683, 384, "bills").setScale(0.5);
        this.tHob =
          "You forgot the rice\n" +
          "in the kitchen and it smells burned. Go rescue your meal and do the bills later!";

        this.popHob = new PopupPlugin(
          this,
          6,
          "0xff0000",
          150,
          16,
          320,
          1,
          523,
          -400,
          0,
          "16px",
          false
        );
        this.popHob.setText(this.tHob, true);
      } else {
        //if medication
        console.log("pay bills clicked");
        this.bills = this.add
          .image(683, 384, "bills")
          .setScale(0.5)
          .setDepth(950);
        var rt = this.add.renderTexture(260, 10, 800, 730).setDepth(1000);

        this.input.on(
          "pointermove",
          function (pointer) {
            if (pointer.isDown) {
              rt.draw("dot", pointer.x - 255, pointer.y - 5);
              updateScore(this);
              BatteryUpdate();
            }

          },
          this
        );
        
        this.input.on("pointerup", function (pointer){
          if(counter == 1){
          this.scene.bills.setVisible(false);
          rt.setVisible(false);
          billCounter = 0;
          }
          counter = 1;
        })
        //this.x serves to check if pay bills is clicked and disable execution of prepexam
        //set this.x to 0 when finishing pay bills task so that prep for exam can be executed
        this.x = 1;
      }
      function updateCounter(d) {
        if (d.call < 3) {
          d.callSuper();
        }
      }
      function updateScore(d) {
        d.updateScore();
      }
    });
  }

  //create pop-up
  btn1_create() {
    this.t =
      "Arrghhhh...study for the exam? You really don't feel like it. Anyway, what has to be done, has to be done. \n\n" +
      "Only this article you read - about a vaccine for COVID-19! So interesting! If only you could stop thinking about it.\n \n" +
      "Can you push your thoughts away and concentrate on your studies?\n \n" +
      "Read and click the virus away if it prevents you from focusing!\n \n";
    ("After that there will be a test! You will get +10 for every right and -5 points for every wrong answer.");
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
  }

  callSuper() {
    super.updateBills();
  }
  updateScore() {
    if (updated == 0) {
      super.updatescore(10);
      updated = 1;
    }
  }
  //countdown for task

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

  createQuestionnaire() {
    this.dolphinsQ = this.add
      .image(683, 384, "dolphin_questions")
      .setScale(0.5)
      .setDepth(950);

    for (var i = 1; i < 16; i++) {
      //console.log("hello");
      var x = 390;
      this._1clicked = 0;
      this._2clicked = 0;
      this._3clicked = 0;
      this._4clicked = 0;
      this._5clicked = 0;
      this._6clicked = 0;
      this._7clicked = 0;
      this._8clicked = 0;
      this._9clicked = 0;
      this._10clicked = 0;
      this._11clicked = 0;
      this._12clicked = 0;
      this._13clicked = 0;
      this._14clicked = 0;
      this._15clicked = 0;

      if ([i] == 1) {
        this.y1 = 164;
        this.emptyNamef(x, this.y1);
        this.emptyName.on("pointerdown", () => {
          if (
            this._1clicked < 1 &&
            this._2clicked == 0 &&
            this._3clicked == 0
          ) {
            this.createRight(x, this.y1);
            this._1clicked += 1;
          }
        });
      }

      if ([i] == 2) {
        this.y2 = 186.5;
        this.emptyNamef(x, this.y2);
        this.emptyName.on("pointerdown", () => {
          if (
            this._2clicked < 1 &&
            this._1clicked == 0 &&
            this._3clicked == 0
          ) {
            this.createWrong(x, this.y2);
            this._2clicked = 1;
          }
        });
      }

      if ([i] == 3) {
        this.y3 = 209;
        this.emptyNamef(x, this.y3);
        this.emptyName.on("pointerdown", () => {
          if (
            this._3clicked < 1 &&
            this._1clicked == 0 &&
            this._2clicked == 0
          ) {
            this.createWrong(x, this.y3);
            this._3clicked = 1;
          }
        });
      }
      if ([i] == 4) {
        this.y4 = 283;
        this.emptyNamef(x, this.y4);
        this.emptyName.on("pointerdown", () => {
          if (
            this._4clicked < 1 &&
            this._5clicked == 0 &&
            this._6clicked == 0
          ) {
            this.createRight(x, this.y4);
            this._4clicked = 1;
          }
        });
      }

      if ([i] == 5) {
        this.y5 = 305;
        this.emptyNamef(x, this.y5);
        this.emptyName.on("pointerdown", () => {
          if (
            this._5clicked < 1 &&
            this._4clicked == 0 &&
            this._6clicked == 0
          ) {
            this.createWrong(x, this.y5);
            this._5clicked = 1;
          }
        });
      }
      if ([i] == 6) {
        this.y6 = 327;
        this.emptyNamef(x, this.y6);
        this.emptyName.on("pointerdown", () => {
          if (
            this._6clicked < 1 &&
            this._4clicked == 0 &&
            this._5clicked == 0
          ) {
            this.createWrong(x, this.y6);
            this._6clicked = 1;
          }
        });
      }
      if ([i] == 7) {
        this.y7 = 401;
        this.emptyNamef(x, this.y7);
        this.emptyName.on("pointerdown", () => {
          if (
            this._7clicked < 1 &&
            this._8clicked == 0 &&
            this._9clicked == 0
          ) {
            this.createWrong(x, this.y7);
            this._7clicked = 1;
          }
        });
      }
      if ([i] == 8) {
        this.y8 = 423;
        this.emptyNamef(x, this.y8);
        this.emptyName.on("pointerdown", () => {
          if (
            this._8clicked < 1 &&
            this._7clicked == 0 &&
            this._9clicked == 0
          ) {
            this.createRight(x, this.y8);
            this._8clicked = 1;
          }
        });
      }
      if ([i] == 9) {
        this.y9 = 445;
        this.emptyNamef(x, this.y9);
        this.emptyName.on("pointerdown", () => {
          if (
            this._9clicked < 1 &&
            this._7clicked == 0 &&
            this._8clicked == 0
          ) {
            this.createWrong(x, this.y9);
            this._9clicked = 1;
          }
        });
      }
      if ([i] == 10) {
        this.y10 = 518;
        this.emptyNamef(x, this.y10);
        this.emptyName.on("pointerdown", () => {
          if (
            this._10clicked < 1 &&
            this._11clicked == 0 &&
            this._12clicked == 0
          ) {
            this.createRight(x, this.y10);
            this._10clicked = 1;
          }
        });
      }
      if ([i] == 11) {
        this.y11 = 540.5;
        this.emptyNamef(x, this.y11);
        this.emptyName.on("pointerdown", () => {
          if (
            this._11clicked < 1 &&
            this._10clicked == 0 &&
            this._12clicked == 0
          ) {
            this.createWrong(x, this.y11);
            this._11clicked = 1;
          }
        });
      }
      if ([i] == 12) {
        this.y12 = 563;
        this.emptyNamef(x, this.y12);
        this.emptyName.on("pointerdown", () => {
          if (
            this._12clicked < 1 &&
            this._10clicked == 0 &&
            this._11clicked == 0
          ) {
            this.createWrong(x, this.y12);
            this._12clicked = 1;
          }
        });
      }
      if ([i] == 13) {
        this.y13 = 636;
        this.emptyNamef(x, this.y13);
        this.emptyName.on("pointerdown", () => {
          if (
            this._13clicked < 1 &&
            this._14clicked == 0 &&
            this._15clicked == 0
          ) {
            this.createWrong(x, this.y13);
            this._13clicked = 1;
          }
        });
      }
      if ([i] == 14) {
        this.y14 = 658.5;
        this.emptyNamef(x, this.y14);
        this.emptyName.on("pointerdown", () => {
          if (
            this._14clicked < 1 &&
            this._13clicked == 0 &&
            this._15clicked == 0
          ) {
            this.createRight(x, this.y14);
            this._14clicked = 1;
          }
        });
      }
      if ([i] == 15) {
        this.y15 = 681;
        this.emptyNamef(x, this.y15);
        this.emptyName.on("pointerdown", () => {
          if (
            this._15clicked < 1 &&
            this._13clicked == 0 &&
            this._14clicked == 0
          ) {
            this.createWrong(x, this.y15);
            this._15clicked = 1;
          }
        });
      }
      this.allEmpties.push(this.emptyName);
    }
    this.Right = [];
    this.Wrong = [];
    this.done = this.add
      .image(1050, 710, "done")
      .setScale(0.7)
      .setInteractive({ useHandCursor: true })
      .setDepth(1200)
      .on("pointerdown", () => {
        for (var i = 0; i < this.allEmpties.length; i++) {
          this.allEmpties[i].input.enabled = false;
          this.allEmpties[i].setVisible(false);
          this.dolphinsQ.setVisible(false);
          for (var j = 0; j < this.Right.length; j++) {
            this.Right[j].setVisible(false);
          }
          for (var j = 0; j < this.Wrong.length; j++) {
            this.Wrong[j].setVisible(false);
          }
          this.done.setVisible(false);
          timeLeftText.frame.glTexture = 0;
          //this.done.input.enabled = false;
        }
      });
  }

  createRight(x1, y1) {
    console.log("right");
    this.right = this.add.image(x1, y1, "right").setScale(0.6).setDepth(1200);
    super.updatescore(10);
    console.log(this);
    this.Right.push(this.right);
  }
  createWrong(x2, y2) {
    console.log("wrong");
    this.wrong = this.add.image(x2, y2, "wrong").setScale(0.6).setDepth(1200);
    super.updatescore(-5);
    this.Wrong.push(this.wrong);
  }
  emptyNamef(x, y, i) {
    var x = 390;
    this.emptyName = this.add
      .image(x, y, "empty")
      .setInteractive({ useHandCursor: true })
      .setScale(0.6)
      .setDepth(1000);
  }
  BatteryUpdate(){
    super.updateB1("-1");
    super.updateB2("-1");
    super.updateB3("-1");
  }

  update() {
    super.update();

    //create timer for when the task runs out of time
    if (this.allObjects) {
      this.timedEvent = this.time.addEvent({
        delay: 20000,
        callback: onEvent2,
        callbackScope: this,
      });

      function onEvent2() {
        for (var i = 0; i < this.allObjects.length; i++) {
          this.allObjects[i].input.enabled = false;
          this.allObjects[i].setVisible(false);
          this.studyText.setVisible(false);
          timeLeftText.setVisible(false);
          timeLeftRect.setVisible(false);
          this.btn1.input.enabled = false;
          this.play_btn.input.enable = false;
          timeLeftText.frame.glTexture = 0;
          this.BatteryUpdate();
        }
        this.nowCreate = 1;
      }
      if (
        this.nowCreate == 1 &&
        this.created == 0 &&
        this.allObjects.length == 50
      ) {
        this.createQuestionnaire();
        this.nowCreate = 0;
        this.created = 1;
      }
    }
    /*if (this.bills_blurred && this.pop_billsCreated != 1) {
      this.t =
        "Oh no! Why do you feel so overwhelmed? The text seems blurred, you can't see a single letter.\n\n" +
        "Try again later!";
      this.pop_bills = new PopupPlugin(
        this,
        10,
        "0x907748",
        300,
        32,
        520,
        1,
        433,
        -50,
        0,
        "28px",
        true
      );
      this.pop_bills.setText(this.t, true);
      this.pop_billsCreated = 1;
    }*/
    if (this.pop_bills) {
      if (this.pop_bills.closeBtn.closedFlag == 1) {
        this.bills_blurred.setVisible(false);
      }
    }
    if (this.popHob) {
      if (this.popHob.closeBtn.closedFlag == 1) {
        this.bills_blurred2.setVisible(false);
      }
    }
    //remove button when pop-up is closed
    if (this.pop) {
      if (this.pop.closeBtn.closedFlag == 1) {
        if (this.play_btn) {
          this.play_btn;
          this.play_btn.setVisible(false);
          this.play_btn.input.enabled = false;
          this.btn1.input.enabled = false;
        }
      }
    }

    //make Corona-Sprites move with time
    for (var i = 0; i < this.allObjects.length; i++) {
      if (i % 2 == 0) {
        this.allObjects[i].x += 0.5;
        if (this.allObjects[i].x > 1366) {
          this.allObjects[i].x = -150;
        }
      }
      if (i % 3 == 0) {
        this.allObjects[i].x -= 0.8;
        if (this.allObjects[i].x < -30) {
          this.allObjects[i].x = +1360;
        }
      } else {
        this.allObjects[i].x += 0.2;
        if (this.allObjects[i].x > 1366) {
          this.allObjects[i].x = -150;
        }
        if (i % 3 == 0) {
          this.allObjects[i].x -= 0.4;
          if (this.allObjects[i].x < 10) {
            this.allObjects[i].x = +1360;
          }
        }
      }
    }
  }
}
