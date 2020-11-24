import { Tilemaps } from 'phaser';
import PopupPlugin from '../dist/pop';
var initialTime;
var countdownText;
var scoreAnimation;
var scoreValue;
var scoreText;
var colour;
var sign;
var tween;
var call =0;
var pointer;
var arrow_up1Tween;
var called2 =0;


//var combo;
export default class Focus_scene extends Phaser.Scene {
  constructor(name, background, guyvalues, bounds, arrows) {
    super({ key: name });
    this.name = name;
    this.background = background;
    this.guyvalues = guyvalues;
    this.bounds = bounds;
    this.player;
    //this.add.graphics();
    this.battery1;
    this.battery2;
    this.battery3;
    //scoreValue;
    this.draggable1;
    this.draggable2;
    this.medication;
    this.todo_btn;
    initialTime = 601;
    this.minutes;
    this.cursors;
    this.partInSeconds;
    this.arrow_up1;
    this.arrow_up2;
    this.arrow_up3;
    this.arrow_left;
    this.arrow_right;
    this.arrows = arrows;
    this.timer;
    this.timer2;
    this.notClicked = 1;
    this.executed = 0;
    this.executed2 = 0;
    this.ovw_executed = 0;
    this.depGuy;
    this.depressionTime;
    this.hands;
    this.cup;
    this.pill;
    this.b1;
    this.b2;
    this.b3;
    this.b1Frame;
    this.b2Frame;
    this.b3Frame;
    this.oH;
    this.col3Collided = 0;
    this.billCounter;
    this.depression;
    this.ovw;
    this.ovwName;
    this.bG;
    this.inSceneExecuted = 0;
  }

  create() {
    console.log(this.name);
    pointer = this.input.activePointer;

    this.bG = this.add.image(683, 384, this.background).setDepth(-1200);
    if (this.ovw) {
      this.bG.setAngle(180);
    } 
    if(!this.ovw){
      this.bG.setAngle(0);
    }

    this.pot2Created = 0;
    //background for items
    this.add.graphics().fillStyle(0x303030, 0.8);
    this.add.graphics().fillRect(20, 100, 100, 500);

    //taskbar
    if (this.name != "focus1") {
      //console.log(this.scene);
      this.add.graphics().fillStyle(0x907748, 0.9); //.setDepth(900);
      this.add.graphics().fillRoundedRect(440, 700, 480, 50, [32]); //(280, 700, 800, 50, [32]);
      //.setDepth(900);

      this.add.graphics().lineStyle(1, 0xffffff, 1.0);
      this.add.graphics().strokeRoundedRect(440, 700, 480, 50, [32]);
    }
    // create arrows
    try {
      this.arrow_up1 = this.add.image(
        this.arrows[0].x,
        this.arrows[0].y,
        this.arrows[0].img
      ).setInteractive();
      
      this.arrow_up1.on("pointerdown",  () => {
        this.tweenPlayer(this, this.arrow_up1,0, -100, "focus2", 1500);
      })
    } catch (e) {}
    try {
      this.arrow_up2 = this.add.image(
        this.arrows[1].x,
        this.arrows[1].y,
        this.arrows[1].img
      ).setInteractive();
        this.arrow_up2.on("pointerdown",  () => {
        this.tweenPlayer(this, this.arrow_up2, 0, -100, "focus3", 1100);
      })
    } catch (e) {}
    try {
      this.arrow_up3 = this.add.image(
        this.arrows[2].x,
        this.arrows[2].y,
        this.arrows[2].img
      ).setInteractive();
        this.arrow_up3.on("pointerdown",  () => {
        this.tweenPlayer(this, this.arrow_up3,0, -100, "focus6", 900);
      })
    } catch (e) {}
    try {
      this.arrow_left = this.add.image(
        this.arrows[3].x,
        this.arrows[3].y,
        this.arrows[3].img
      ).setInteractive();
        if(this.name == "focus5" || this.name == "focus3"){
          this.myScene2 = "focus1";
          this.duration = 850;
          this.Yvalue = -180;
        }else {
          this.myScene2 = "focus4"
          this.duration = 1600;
          this.Yvalue = -100;
        }
        this.arrow_left.on("pointerdown",  () => {
        this.tweenPlayer(this, this.arrow_left, +200, this.Yvalue, this.myScene2, this.duration);
      })
    } catch (e) {}
    try {
      this.arrow_right = this.add.image(
        this.arrows[4].x,
        this.arrows[4].y,
        this.arrows[4].img
      ).setInteractive();
        if(this.name == "focus4" ||
          this.name == "focus3"
      ) {
        this.myScene = "focus1"
        this.Yvalue = -180;
      } else  {
        this.myScene = "focus5";
        this.Yvalue = -100;
      }
        this.arrow_right.on("pointerdown",  () => {
        this.tweenPlayer(this, this.arrow_right, -200, this.Yvalue, this.myScene, 800);
      })
    } catch (e) {}
    try {
      this.arrow_down = this.add.image(
        this.arrows[5].x,
        this.arrows[5].y,
        this.arrows[5].img
      ).setInteractive();
      this.arrow_down.setDepth(950);
      this.arrow_down.on("pointerdown",  () => {
      this.tweenPlayer(this, this.arrow_down,0, -200, "focus1", 750);
      })
    } catch (e) {}

    //this.physics.add.sprite(this.guyvalues.x,this.guyvalues.y, "guy").setScale(this.guyvalues.scale);
    this.player = this.physics.add
      .sprite(this.guyvalues.x, this.guyvalues.y, "guy")
      .setScale(this.guyvalues.scale);
    //.setAngle(180);
    this.physics.world.bounds.setTo(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height
    );

    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "up",
      frames: [{ key: "guy", frame: 3 }],
      //frameRate: 10,
    });
    this.anims.create({
      key: "left",
      frames: [{ key: "guy", frame: 0 }],
      //frameRate: 10,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "guy", frame: 2 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "right",
      frames: [{ key: "guy", frame: 1 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "down",
      frames: [{ key: "guy", frame: 2 }],
      frameRate: 10,
    });
    //######################## Player END ###############################

    //####################### Create Batteries ##########################
    if (!this.b1Frame) {
      this.b1Frame = 1;
      this.b2Frame = 7;
      this.b3Frame = 13;
    }
    if (initialTime > 600) {
      this.billCounter = 0;
    }
    this.Monday = this.add
      .graphics()
      .fillStyle(0xffffff, 0.8)
      .fillRect(1150, 15, 180, 80)
      .lineStyle(1, 0x000000, 1.0)
      .strokeRect(1150, 15, 180, 80);
    this.MondayText = this.add.text(1180, 40, "Monday", {
      fontSize: "34px",
      fill: "black",
      fontStyle: "bold",
    });
    if (initialTime > 600 || this.b1) {
      this.battery1 = this.physics.add.sprite(450.5, 50, "battery_focus");

      this.anims.create({
        key: "1",
        frames: [{ key: "battery_focus", frame: 0 }],
      });
      this.anims.create({
        key: "2",
        frames: [{ key: "battery_focus", frame: 1 }],
      });
      this.anims.create({
        key: "3",
        frames: [{ key: "battery_focus", frame: 2 }],
      });
      this.anims.create({
        key: "4",
        frames: [{ key: "battery_focus", frame: 3 }],
      });
      this.anims.create({
        key: "5",
        frames: [{ key: "battery_focus", frame: 4 }],
      });
      this.anims.create({
        key: "6",
        frames: [{ key: "battery_focus", frame: 5 }],
      });

      this.battery1.anims.play(this.b1Frame.toString(), true);
    }

    if (initialTime > 595 || this.b2) {
      this.battery2 = this.physics.add.sprite(655.5, 50, "battery_energy");

      this.anims.create({
        key: "7",
        frames: [{ key: "battery_energy", frame: 0 }],
      });
      this.anims.create({
        key: "8",
        frames: [{ key: "battery_energy", frame: 1 }],
      });
      this.anims.create({
        key: "9",
        frames: [{ key: "battery_energy", frame: 2 }],
      });
      this.anims.create({
        key: "10",
        frames: [{ key: "battery_energy", frame: 3 }],
      });
      this.anims.create({
        key: "11",
        frames: [{ key: "battery_energy", frame: 4 }],
      });
      this.anims.create({
        key: "12",
        frames: [{ key: "battery_energy", frame: 5 }],
      });
      this.battery2.anims.play(this.b2Frame.toString(), true);
    }
    if (initialTime > 600 || this.b3) {
      this.battery3 = this.physics.add.sprite(860.5, 50, "battery_efficiency");

      this.anims.create({
        key: "13",
        frames: [{ key: "battery_efficiency", frame: 0 }],
      });
      this.anims.create({
        key: "14",
        frames: [{ key: "battery_efficiency", frame: 1 }],
      });
      this.anims.create({
        key: "15",
        frames: [{ key: "battery_efficiency", frame: 2 }],
      });
      this.anims.create({
        key: "16",
        frames: [{ key: "battery_efficiency", frame: 3 }],
      });
      this.anims.create({
        key: "17",
        frames: [{ key: "battery_efficiency", frame: 4 }],
      });
      this.anims.create({
        key: "18",
        frames: [{ key: "battery_efficiency", frame: 5 }],
      });
      this.battery3.anims.play(this.b3Frame.toString(), true);
    }
    //######################### BATTERY END ############################
    if (!scoreValue) {
      scoreValue = 0;
    }
    scoreText = this.add.text(20, 20, "Score: " + scoreValue, {
      fontSize: "34px",
      fill: "white",
    });

    //######################## ADDING ITEMS ###################################
    //CUP

    if (initialTime > 600 || this.cup) {
      this.draggable1 = this.add
        .sprite(65, 500, "cup")
        .setInteractive({ draggable: true, useHandCursor: true });
      this.draggable1.on("pointerover", () => {
        if (this.draggable1.dragged == 0 && this.draggable1.x <= 70) {
          this.t =
            "Coffee can help you to recharge your focus and energy battery a bit.";

          this.pop1 = new PopupPlugin(
            this,
            3,
            "0xdbc1ac",
            120,
            16,
            300,
            0,
            106,
            -190,
            0,
            "16px",
            false
          );
          this.pop1.setText(this.t, true);
        }
      });
      this.draggable1.justDragged = 0;
      this.draggable1.dragged = 0;

      this.draggable1.on("pointerdown", () => {
        this.pop1.toggleWindow();
      });

      this.draggable1.on("pointerout", () => {
        if (this.draggable1.justDragged == 0) {
          this.pop1.toggleWindow();
        } else {
          this.draggable1.justDragged = 0;
        }
      });

      this.draggable1.on("drag", function (pointer, dragX, dragY) {
        this.pointer = pointer;
        this.x = dragX;
        this.y = dragY;
        //console.log(this.x);
        //console.log(this.y);
      });

      this.draggable1.on("dragend", function () {
        this.x = 65;
        this.y = 500;
        this.justDragged = 1;
        this.dragged = 0;
      });
    }

    //this.dragged2 = 0;

    /*this.draggable1.on("pointerover", () => {
      if(this.dragged2 == 0){
      //this.pointer = pointer;
      this.t =
        "Coffee can help you to refill your focus and energy battery a bit.";      
        this.pop1 = new PopupPlugin(
          this,
          3,
          "0xdbc1ac",
          120,
          16,
          300,
          0,
          106,
          -190,
          0,
          "16px",
          false
        );
      this.pop1.setText(this.t, true);
      }
    });

    this.draggable1.on("pointerout", () => {
      this.pop1.toggleWindow();
    });  

   this.draggable1.on("dragstart", () => {
     this.dragged2 = 1;
     if (this.pop1) {
       this.pop1.toggleWindow();
     }
   });

    this.draggable1.on("drag", function (pointer, dragX, dragY) {
      this.pointer = pointer;
      this.x = dragX;



      this.y = dragY;
    });   

   this.draggable1.on("dragend", function() {
     this.dragged2 = 0;
     this.x = 65;
     this.y = 500;
     if(this.pop1){
     this.pop1.toggleWindow();
     }
   });*/

    this.clicked = 0;

    if (initialTime > 600 || this.pill) {
      this.draggable2 = this.add
        .sprite(65, 400, "medication")
        .setInteractive({ draggable: true, useHandCursor: true });

      this.draggable2.on("pointerover", () => {
        if (this.draggable2.dragged == 0 && this.draggable2.x <= 70) {
          this.t =
            "Medication can help you to recharge your focus and energy battery.\n" +
            "However, it might sometimes leave you depressive when it wears out.";
          this.pop2 = new PopupPlugin(
            this,
            3,
            "0xff0000",
            200,
            16,
            300,
            0,
            106,
            -250,
            0,
            "16px",
            false
          );
          this.pop2.setText(this.t, true);
        }
      });
      this.draggable2.justDragged = 0;
      this.draggable2.dragged = 0;

      this.draggable2.on("pointerdown", () => {
        this.pop2.toggleWindow();
      });

      this.draggable2.on("pointerout", () => {
        //console.log(this.draggable2.justDragged);
        if (this.draggable2.justDragged == 0) {
          this.pop2.toggleWindow();
        } else {
          this.draggable2.justDragged = 0;
        }
      });

      this.draggable2.on("drag", function (pointer, dragX, dragY) {
        this.pointer = pointer;
        this.x = dragX;
        this.y = dragY;
      });

      this.draggable2.on("dragend", function () {
        this.x = 65;
        this.y = 400;
        this.justDragged = 1;
        this.dragged = 0;
      });
    }

    //TODO LIST
    this.todo_btn = this.add
      .sprite(70, 200, "todo")
      .setInteractive({ useHandCursor: true })
      .setScale(0.8);
    //put future variables into global space so that they are accessible
    this.pop;
    this.pop1;
    this.pop2;
    this.pop3;
    this.pop4;
    this.pop_dep;

    this.todo_btn.on("pointerdown", () => {
      this.btn_create();
      this.todo_btn.input.enabled = false;
    });

    this.todo_btn.on("pointerover", () => {
      //this.pointer = pointer;
      this.t = "Click to view your To-Do list!";
      this.pop4 = new PopupPlugin(
        this,
        3,
        "0xcccc00",
        100,
        16,
        300,
        0,
        106,
        -500,
        0,
        "16px",
        false
      );
      this.pop4.setText(this.t, true);
    });

    this.todo_btn.on("pointerout", () => {
      this.pop4.toggleWindow();
    });

    //########################################################################

    //###################### TIMER-CODE STARTS ############################
    if (!initialTime) {
      countdownText = this.add.text(
        20,
        64,
        "Countdown: " + this.formatTime(initialTime),
        {
          fontSize: "34px",
          fill: "white",
          //fontStyle: "bold",
        }
      );
    } else {
      countdownText = this.add.text(20, 64, "Countdown: ", {
        fontSize: "34px",
        fill: "white",
        //fontStyle: "bold",
      });
    }
    //this.timer = this.time.addEvent({ delay: 1000, callback: this.onEvent(), callbackScope: this , repeat: 10 });
    // Each 1000 ms call onEvent

    //window.setInterval(this.onEvent(),1000) ;

    //###################### TIMER-CODE ENDS ############################
    //this.timer = this.time.addEvent({ delay: 1000, callback: this.onEvent(), callbackScope: this , loop: true });
    //this.timer = setInterval(this.onEvent, 1000);
    this.createTimer();
    //this.createTimer2();
    this.closedFlag = 0;

    this.depressionTime = Phaser.Math.Between(500, 400); //;
    this.ocdTime = Phaser.Math.Between(200, 100); //(200, 100);

    this.anims.create({
      key: "20",
      frames: [{ key: "hands", frame: 0 }],
    });

    this.anims.create({
      key: "21",
      frames: [{ key: "hands", frame: 1 }],
    });

    this.combo = this.input.keyboard.createCombo("wash");
    //console.log(this)
    this.combo.resetOnMatch = true;

    //console.log(this);
    this.washHands();

    this.triggered = 1;

    if(this.depression){
      this.add
        .graphics()
        .fillStyle(0x303030, 0.8)
        .fillRect(0, 0, 1366, 768)
        .setDepth(-1000);
        this.executed = 1;
    }
  }
  createTaskbarButton(number, x, y, width, text,points) {
    this.add.graphics().fillStyle(0xffffff, 0.8); //.setDepth(900);
    this.add.graphics().fillRoundedRect(x +160, y, width, 20, [5]); //.setDepth(900);
    var text1 = {
      x: x + 5 +160,
      y: y + 2,
      text: text,
      style: { color: "#000000" },
    };
    if (number == 1) {
      this.btn1 = this.make.text(text1);
      this.btn1.setInteractive({ useHandCursor: true });
      //this.btn1.setDepth(900);
    }
    if (number == 2) {
      this.btn2 = this.make.text(text1);
      this.btn2.setInteractive({ useHandCursor: true });
      //this.btn2.setDepth(900);
    }
    this.points = this.add
      .graphics()
      .fillStyle(0x0086b3, 1)
      .fillRoundedRect(x + width + 165, y - 10, 65, 40, [20]);
    if(points == 160){
      this.points.fillRoundedRect(x + width + 165, y - 10, 80, 40, [20]);
    }
    this.pointsText = this.add.text(x + width + 170, y -3, points+"p.", {
        fontSize: "25px",
        fill: "white",
  });
}
  Init(data) {
    super.scoreValue = data.sv;
    super.cup = data.cup;
    super.pill = data.pill;
    super.b1Frame = data.b1Frame;
    super.b2Frame = data.b2Frame;
    super.b3Frame = data.b3Frame;
    super.b1 = data.b1;
    super.b2 = data.b2;
    super.b3 = data.b3;
    super.oH = data.oH;
    super.pot = data.pot;
    super.billCounter = data.billCounter;
    super.depression = data.depression;
    super.ovw = data.ovw;
  }
  tweenPlayer(D, arrow, Xchange, Ychange, TheScene, duration){   
    //console.log("tweenPlayer executed")     
    arrow_up1Tween = this.tweens.add({
    targets: this.player,
    x: arrow.x + Xchange,
    y: arrow.y + Ychange,
    ease: "Linear",
    duration: duration,
    repeat: 0,
    onComplete: function () {
      D.changeScene(TheScene);
    },
  });
};

  createDone(x, y) {
    this.done = this.add
      .image(x, y, "done")
      .setScale(0.7)
      .setInteractive({ useHandCursor: true })
      .setDepth(1200);
  }

  washHands() {
    this.hands = this.physics.add.sprite(650, 390, "hands").setVisible(false);
    //console.log("hello");
    this.hands.washingCounter = 0;

    this.input.keyboard.on("keycombomatch", function (event) {
      this.scene.hands.setVisible(true);
      this.scene.hands.justChanged = 0;
     // console.log("hands washed");

      if (this.scene.hands.washingCounter < 6) {
        if (!this.scene.hands.anims.currentAnim) {
          this.scene.hands.anims.play("20", true);
          //console.log("no previous anim and I played 20");
          this.scene.hands.washingCounter += 1;
        }
        if (this.scene.hands.anims.currentAnim) {
          if (this.scene.hands.anims.currentAnim.key == 20) {
            //console.log("played 21");
            this.scene.hands.anims.play("21", true);
            this.scene.hands.justChanged = 1;
            this.scene.hands.washingCounter += 1;
          }
          if (
            this.scene.hands.anims.currentAnim.key == 21 &&
            this.scene.hands.justChanged == 0
          ) {
            this.scene.hands.anims.play("20", true);
            //this.scene.hands.anims.currentFrame.duration = 50000;
            //console.log("played 20");
            this.scene.hands.justChanged = 0;
            this.scene.hands.washingCounter += 1;
          }
        }
      }
      if (this.scene.hands.washingCounter == 6) {
        this.scene.battery3.anims.play("13", true);
        this.scene.hands.setVisible(false);
        this.scene.hands.washingCounter = 0;
      }

      //https://www.freepik.com/free-photos-vectors/washing-hands
      //+ pictures of the word wash with letters typed as green
    });
  }

  /*triggerOCD(){
    if(this.triggered == 0){
    //trigger event every 20 seconds
    this.OCD_timer = setInterval(this.washHands(), 20000);

    console.log("triggered");
    this.triggered = 1;
  }
  }*/

  createTimer() {
    //console.log("createTimer");
    if (!this.timer) {
      this.timer = setInterval(this.onEvent, 1000);
    }
  }

  btn_create() {
    this.t =
      "TO-DO list: \n\n\n" +
      "> prepare exam\v\v\v\v/50p.\n \n" +
      "> pay bills\v\v\v\v\v\v\v/50p. \n \n" +
      "> do the laundry\v\v/45p.\n \n" +
      "> go to work \v\v\v\v\v/160p.\n \n" +
      "> cook \v\v\v\v\v\v\v\v\v\v\v/20p. \n \n" +
      "> do the dishes\v\v\v/20p.\n \n";

       this.pop = new PopupPlugin(
         this,
         10,
         "0x907748",
         600,
         32,
         500,
         1,
         100,
         0,
         0,
         "24px",
         false
       );
    this.pop.setText(this.t, true);
  }

  showMessageBox() {
    this.add.graphics().fillStyle(0xffffff, 1);
    this.add.graphics().fillRoundedRect(280, 95, 700, 500, [50]);
    this.add.graphics().lineStyle(3, 0xff0000, 1.0);
    this.add.graphics().strokeRoundedRect(280, 95, 700, 500, [50]);

    this.GameOver = this.add
      .text(410, 190, "GAME\n" + "OVER", {
        fontSize: "180px",
        fill: "black",
        fontStyle: "bold",
      })
      .setDepth(1000); //.setInteractive(true);
  }

  formatTime(seconds) {
    // Minutes
    this.minutes = Math.floor(seconds / 60);
    // Seconds
    this.partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    this.partInSeconds = this.partInSeconds.toString().padStart(2, "0");
    // Returns formatted time
    return `${this.minutes}:${this.partInSeconds}`;
  }
  /*setScoreValue(sv){
        scoreValue = sv;
    }
    setInitialTime(it){
        initialTime = it;
        console.log("here")
    }*/

  onEvent() {
    initialTime -= 1; // One second
    this.seconds = initialTime;
    this.minutes = Math.floor(this.seconds / 60);
    this.partInSeconds = this.seconds % 60;
    this.partInSeconds = this.partInSeconds.toString().padStart(2, "0");
    this.f = `${this.minutes}:${this.partInSeconds}`;

    countdownText.setText("Countdown: " + this.f);
  }
  /*updateCountdown(){
        countdownText.setText('Countdown: ' + formatTime(initialTime));
    }
    getInitialTime(){
        return this.initialTime;
    }*/
  getCursors() {
    return this.cursors;
  }

  collision(s1, s2) {
    let r1 = [
      s1.getBounds().x + s1.getBounds().width,
      s1.getBounds().y - s1.getBounds().height,
    ];
    let r2 = [
      s2.getBounds().x + s2.getBounds().width,
      s2.getBounds().y - s2.getBounds().height,
    ];
    if (s1.getBounds().x >= r2[0] || s2.getBounds().x >= r1[0]) {
      return false;
    }
    if (s1.getBounds().y <= r2[1] || s2.getBounds().y <= r1[1]) {
      return false;
    }
    return true;
  }

  applyeffect(Draggable) {
    this.removeDrag(Draggable);
    if (Draggable == this.draggable2) {
      this.battery1.anims.play("1", true);
      this.battery2.anims.play("7", true);
    }
    //should sometimes lead to depressive phase
    if (Draggable == this.draggable1) {
      this.updateB1("-2");
      this.updateB2("-2");
      this.updateB3("-2");
      /*if (this.b1Frame < 6) {
        this.battery1.anims.play("2", true);
      }
      if (this.b2Frame < 12) {
        this.battery2.anims.play("8", true);
      }
      if (this.b3Frame < 18) {
        this.battery3.anims.play("14", true);
      }*/
    }
  }
  updatescore(value) {
    if (value < 0) {
      colour = "#ff6666";
      sign = "";
    }
    if (value > 0) {
      colour = "#39d179";
      sign = "+";
    }
    scoreAnimation = this.add
      .text(400, 200, sign + value, {
        fontFamily: "Arial",
        fontSize: "60px",
        color: colour,
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setDepth(3000);

    tween = this.tweens.add({
      targets: scoreAnimation,
      x: scoreText.x + 100,
      y: scoreText.y - 10,
      ease: "Linear",
      duration: 1000,
      repeat: 0,
      onComplete: function () {
        scoreAnimation.setVisible(false);
        scoreValue += value;
        scoreText.setText("Score: " + scoreValue);
      },
    });
  }
  updateB1(frame) {
    //console.log(this.b1Frame);
    if (frame == -2 && this.b1Frame != 1) {
      this.battery1.anims.play(parseInt(this.b1Frame) - 1, true);
    } else if (frame == -1 && this.b1Frame != 6) {
      console.log("updating battery 1 with -1")
      this.battery1.anims.play(parseInt(this.b1Frame) + 1, true);
    } else if (frame != -2) {
      this.battery1.anims.play(frame, true);
    }
  }

  updateB2(frame) {
    //console.log(this.b2Frame);
    if (frame == -2 && this.b2Frame != 7) {
      this.battery2.anims.play(parseInt(this.b2Frame) - 1, true);
    } else if (frame == -1 && this.b2Frame != 12) {
      this.battery2.anims.play(parseInt(this.b2Frame) + 1, true);
    }else if (frame != -2) {
      this.battery2.anims.play(frame, true);
    }
  }
  updateB3(frame) {
    //console.log(this.b3Frame);
    if (frame == -2 && this.b3Frame != 13) {
      this.battery3.anims.play(parseInt(this.b3Frame) - 1, true);
    } else if (frame == -1 && this.b3Frame != 18) {
      this.battery3.anims.play(parseInt(this.b3Frame) + 1, true);
    } else if (frame != -2) {
      this.battery3.anims.play(frame, true);
    }
  }
  updateHob() {
    this.oH = true;
    this.pot = true;
  }
  updateBills() {
    if (typeof this.billCounter == "undefined") {
      this.billCounter = 0;
    }
    this.billCounter = this.billCounter + 1;
  }
  removeDrag(drag) {
    //console.log(drag);
    drag.x = -10;
    drag.y = -10;
    drag.destroy();
    //console.log(drag.getBounds());
    //console.log(drag);
  }
  getScene() {
    return this;
  }

  updateTime(value) {
    initialTime += value;
  }

  //################# ARROW SCENE CHANGE ##############################

  arrowCollision(s1, s2) {
    let r1 = s1.getBounds().x + s1.getBounds().width;
    let r2 = s2.getBounds().x + s2.getBounds().width;
    if (s1.getBounds().x >= r2 || s2.getBounds().x >= r1) {
      return false;
    }
    return true;
  }
  changeScene(next) {
    this.done = false;
    this.pill = false;
    this.b1 = false;
    this.b2 = false;
    this.b3 = false;
    this.depression = false;
    this.ovw = false;
    // this.popUP = false;
    if (this.ovw_executed == 1) { 
      this.ovw = true;
      this.ovw_executed = 0;
    }
    console.log("this.executed");
    console.log(this.executed)
    if (this.executed == 1) {
      this.depression = true;
      this.executed = 0;
      //this.popUp = true;
    }
    console.log("this.depression")
    console.log(this.depression)
    if (this.draggable1) {
      if (typeof this.draggable1.scene !== "undefined") {
        this.cup = true;
      }
    }
    if (this.draggable2) {
      if (typeof this.draggable2.scene !== "undefined") {
        this.pill = true;
      }
      if (this.battery1) {
        if (typeof this.battery1.scene !== "undefined") {
          this.b1 = true;
          this.b2 = true;
          this.b3 = true;
        }
        this.b1Frame = this.battery1.anims.currentAnim.key;
      }
      if (this.battery2) {
        this.b2Frame = this.battery2.anims.currentAnim.key;
      }
      if (this.battery3) {
        this.b3Frame = this.battery3.anims.currentAnim.key;
      }
        if ((next == "focus5" || next == "focus2") && this.ovw) {

            this.t =
              "No, it wasn't this room you wanted to go to, was it?\n\n" +
              "Thoughts fly so fast, how are you supposed to ever catch one?";
            this.stop = new PopupPlugin(
              this,
              10,
              "0x907748",
              200,
              10,
              800,
              1,
              280,
              -50,
              0,
              "28px",
              true
            );
            this.stop.setText(this.t, true);
          }
         else {
          this.scene.start(next, {
            sv: scoreValue,
            it: initialTime,
            p: this.player,
            b1: this.b1,
            b2: this.b2,
            b3: this.b3,
            b1Frame: this.b1Frame,
            b2Frame: this.b2Frame,
            b3Frame: this.b3Frame,
            cup: this.cup,
            pill: this.pill,
            done: this.done,
            oH: this.oH,
            pot: this.pot,
            billCounter: this.billCounter,
            depression: this.depression,
            ovw: this.ovw,
          });
          console.log("battery");
          console.log(this.battery1);
          console.log(this.b1);
        }
    }
  }
  getPlayer() {
    return this.player;
  }

  update() {
    if (initialTime == 0) {
      this.showMessageBox();
      //this.sys.game.destroy(true);
      this.timedEvent = this.time.addEvent({
        delay: 2000,
        callback: toResults,
        callbackScope: this,
      });
    }
    if (initialTime == 300) {
      if (this.TuesdayCreated != 1) {
        this.Monday.setVisible(false);
        this.MondayText.setVisible(false);
        this.Tuesday = this.add
          .graphics()
          .fillStyle(0xffffff, 0.8)
          .fillRect(1140, 15, 195, 80)
          .lineStyle(1, 0x000000, 1.0)
          .strokeRect(1140, 15, 195, 80);
        this.TuesdayText = this.add.text(1165, 40, "Tuesday", {
          fontSize: "34px",
          fill: "black",
          fontStyle: "bold",
        });
        this.TuesdayCreated = 1;
      }
    }
    function toResults() {
      this.changeScene("results");
    }
    if (this.pop) {
      if (this.pop.closeBtn) {
        if (this.pop.closeBtn.closedFlag == 1) {
          if (this.todo_btn) {
            this.todo_btn.input.enabled = true;
          }
        }
      }
    }
    //console.log("this.depLAYER")
    //console.log(this.dep_layer)

    if (this.executed == 0) {

      //Random event (depression)
      //export depressed variable to check for during study task?
      if(initialTime == this.depressionTime || this.depression){
          this.add
            .graphics()
            .fillStyle(0x303030, 0.8)
            .fillRect(0, 0, 1366, 768)
            .setDepth(-1000);
          console.log("dep_layerCreated")
          this.executed = 1;
      }
      if (this.battery3.anims.currentAnim) {
        //random depression or if wellbeing to low
        if (
          initialTime == this.depressionTime ||
          this.battery3.anims.currentAnim == 18
        ) {
          console.log("hello depression");

          if (!this.depression) {
            this.t =
              "Uhhh...ohhhh. How unlucky can anyone be?\n" +
              "Depression can often occur with AD(H)D, and of course, it had to hit you.\n\n" +
              "Doing nothing might have long term adverse affects. Studying will probably be impossible.\n\n" +
              "Try to recharge your batteries instead!";
            this.pop_dep = new PopupPlugin(
              this,
              10,
              "0x907748",
              650,
              32,
              800,
              1,
              280,
              -50,
              -350,
              "28px",
              true
            );

            this.pop_dep.setText(this.t, true);
            this.depGuy = this.add.image(500, 384, "depGuy").setScale(0.75);

            this.battery1.anims.play("6", true);
            this.battery2.anims.play("12", true);
            this.battery3.anims.play("18", true);
          }

          if (this.executed == 1) {
            this.timedEvent = this.time.addEvent({
              delay: 60000,
              callback: onEvent2,
              callbackScope: this,
            });

            function onEvent2() {
              console.log("depression deleted");
              this.executed = 0;
              this.depression = false;
              this.add.graphics().clear();
              console.log(scoreValue);
            }
          }
        }
        
      }
     
    }

    if (this.pop_dep) {
      if (this.pop_dep.closedFlag == 1) {
        if (this.depGuy) {
          this.depGuy.setVisible(false);
        }
      }
    }

    //feeling overwhelmed
    if (this.ovw_executed == 0) {
      if (this.battery2.anims.currentAnim ||this.battery1.anims.currentAnim) {
        if (
          ((this.battery1.anims.currentAnim.key == 6 ||
          this.battery2.anims.currentAnim.key == 12) && !this.pop_dep) ||
          this.ovw
        ) {
          if (!this.ovw) {
            this.tO =
              "BEING OVERWHELMED.\n\n" +
              "This paralysing feeling when you want to do everything but you just cannot get anything done.\n\n" +
              "Like a wall that repels you every time you try to climb it.\n\n" +
              "Like trying to swim in cement - A body and a mind that are shut down.\n\n" +
              "How can you ever get hold of your life??? ";
            this.pop_ovw = new PopupPlugin(
              this,
              10,
              "0x907748",
              560,
              32,
              800,
              1,
              280,
              -50,
              0,
              "28px",
              true
            );
            this.pop_ovw.setText(this.tO, true);
            this.bG.setAngle(180);
            this.ovw = true;
          }
          this.ovw_executed = 1;
          if (this.ovw_executed == 1) {
            this.timedEventOvw = this.time.addEvent({
              delay: 60000,
              callback: onEvent2,
              callbackScope: this,
            });

            function onEvent2() {
              this.ovw_executed = 0;
              this.executed = 0;
              this.ovw = false;
              this.bG.setAngle(0);
            }
          }
        }
      }
    }

    //OCD Event
    if (this.executed2 == 0) {
      //if (this.battery3.anims.currentAnim && !this.depression) {
      //random depression or if wellbeing to low

      if (
        initialTime == this.ocdTime //||
        //this.battery3.anims.currentAnim.key == 18
      ) {
        console.log("hello ocd");

        this.t =
          "Uhhh...ohhhh. You've had this before but this time it feels like a demon.\n\n" +
          "Obsessive compulsive disorder can often occur with AD(H)D and for some reason the compulsory hand-washing during Corona made you obsess over it.\n\n" +
          "Although you can try to fight it, you will most likely end up washing your hands every couple minutes.\n\n" +
          "To do that type 'wash' SIX TIMES when the notification appears.";
        this.pop_ocd = new PopupPlugin(
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

        this.pop_ocd.setText(this.t, true);

        this.executed2 = 1;
        this.triggered = 0;
        //this.triggerOCD();

        this.timedEvent = this.time.addEvent({
          delay: 50000,
          callback: washCall,
          callbackScope: this,
          repeat: 10,
        });

        function washCall() {
          console.log("washCall");

          this.layer = this.add.graphics().fillStyle(0x303030, 0.8);

          this.bigWhiteLayer = this.add
            .graphics()
            .fillRect(0, 0, 1366, 768)
            .setDepth(1000);

          var OCD_text = {
            x: 240,
            y: 180,
            text: "I need to wash my hands!!!",
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
              wordWrap: { width: 1000, useAdvancedWrap: true },
            },
          };

          this.notification = this.make.text(OCD_text).setDepth(1200);
          this.callThere = 1;

          if (this.callThere == 1) {
            this.timedEvent2 = this.time.addEvent({
              delay: 2000,
              callback: notificationDelete,
              callbackScope: this,
            });
            this.callThere = 0;

            function notificationDelete() {
              //depression not working? => this.graphics instead of this.add
              this.bigWhiteLayer.clear();
              this.notification.setVisible(false);
            }
          }
        }
      }
    }

    //######################## PLAYER ########################
    if (this.ovw) {
      this.cursors = this.input.keyboard.createCursorKeys();
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("left", true);
        this.left_down = false;
      } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("right", true);
        this.left_down = false;
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play("up");
        this.left_down = true;
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play("down");
        this.left_down = false;
      } else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        if (this.left_down) {
          this.player.anims.play("up");
        } else {
          this.player.anims.play("down");
        }
      }
    } else {
      this.cursors = this.input.keyboard.createCursorKeys();
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play("left", true);
        this.left_down = false;
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play("right", true);
        this.left_down = false;
      } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play("up");
        this.left_down = true;
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play("down");
        this.left_down = false;
      } else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        if (this.left_down) {
          this.player.anims.play("up");
        } else {
          this.player.anims.play("down");
        }
      }
    }

    //################# change battery on timer ##########################
    if (
      initialTime == 500 ||
      initialTime == 400 ||
      initialTime == 300 ||
      initialTime == 200 ||
      initialTime == 100
    ) {
      this.updateB1(-1);
      this.updateB2(-1);
      this.updateB3(-1);
    }

    //####################################################################
    /*if (this.input.pointer1.isDown) {
      this.add.graphics().clear();
    }*/
    if (this.draggable1) {
      this.col = this.collision(this.player, this.draggable1);
      if (this.col) {
        this.applyeffect(this.draggable1);
        //console.log(this.draggable1.parentContainer);
      }
    }
    if (this.draggable2) {
      this.col1 = this.collision(this.player, this.draggable2);
      if (this.col1) {
        this.applyeffect(this.draggable2);
      }
    }

    try {
      this.col2 = this.arrowCollision(this.player, this.arrow_up1);
      if (this.col2 && this.cursors.up.isDown) {
        this.changeScene("focus2");
      }
    } catch (e) {}

    try {
      this.col3 = this.arrowCollision(this.player, this.arrow_up2);
      if (this.col3 && this.cursors.up.isDown) {
        this.changeScene("focus3");
      }
    } catch (e) {}

    try {
      this.col3 = this.arrowCollision(this.player, this.arrow_up3);
      if (this.col3 && this.cursors.up.isDown && this.col3Collided == 0) {
        //function to contai if and else?
        if (this.oH) {
          this.tHob =
            "Oh, you forgot the pot\non the hob! Go quick and turn the hob off, your food might be burned already!";

          this.popHob = new PopupPlugin(
            this,
            6,
            "0xff0000",
            150,
            16,
            320,
            1,
            925,
            -400,
            0,
            "16px",
            false
          );
          this.popHob.setText(this.tHob, true);
        } else {
          this.changeScene("focus6");
        }
        this.col3Collided = 1;
      }
    } catch (e) {}

    try {
      this.col4 = this.arrowCollision(this.player, this.arrow_right);
      if (
        this.col4 &&
        this.cursors.right.isDown &&
        (this.name == "focus4" || this.name == "focus3")
      ) {
        this.changeScene("focus1");
      } else if (this.col4 && this.cursors.right.isDown) {
        this.changeScene("focus5");
      }
    } catch (e) {}

    try {
      this.col5 = this.arrowCollision(this.player, this.arrow_left);
      if (
        this.col5 &&
        this.cursors.left.isDown &&
        (this.name == "focus3" || this.name == "focus5")
      ) {
        this.changeScene("focus1");
      } else if (this.col5 && this.cursors.left.isDown) {
        this.changeScene("focus4");
      }
    } catch (e) {
      //console.log(e);
      //console.log(this.col5, this.name);
    }

    try {
      this.col6 = this.arrowCollision(this.player, this.arrow_down);
      if (this.col6 && this.cursors.down.isDown) {
        this.changeScene("focus1");
      }
    } catch (e) {}
    if (this.pot && this.name == "focus5" && this.pot2Created == 0) {
      this.pot2 = this.add
        .sprite(500, 310, "pot")
        .setInteractive({ useHandCursor: true, draggable: true })
        .setScale(1.5)
        .setDepth(-100);

      this.pot2.on("drag", function (pointer, dragX, dragY) {
        this.pointer = pointer;
        this.x = dragX;
        this.y = dragY;
      });

      this.pot2.on("dragend", function () {
        //console.log(this.x);
        //console.log(this.y);
        if (this.x > 1057 && this.x < 1300 && this.y > 400 && this.y < 740) {
          this.setVisible(false);
          call = 1;
        } else {
          this.x = 500;
          this.y = 310;
        }
      });
      this.pot2Created = 1;
      this.oH = false;
      this.pot = false;
    }
    if ((call == 1) & (called2 == 0)) {
      called2 = 1;
      this.updatescore(10);
    }
  }
}
  
