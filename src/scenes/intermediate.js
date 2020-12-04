import Config from "../config";
import PopupPlugin from "../../dist/pop";
var btn;
var pointer;
var btn3;
var intro;
export default class intermediate extends Phaser.Scene {
  constructor() {
    super({ key: "intermediate" });
  }

  create() {
    pointer = this.input.activePointer;
    this.t =
      "Focus! is a game developed to allow you to experience the world as someone with Attention Deficit (Hyperactivity) Disorder (AD(H)D.)[i] The game is based on science & interviews within the AD(H)D community & experts.\n\n";
    this.t +=
      "You will play as a student with AD(H)D who has two days left until his final exam. Can you prepare the exam & do your daily chores without ruining your mental health?\n\n";
    this.t +=
      'In the community of people with AD(H)D the phrase "just focus!" is a neurotypical nuisance: As if it was that easy! See how well you can regulate attention with attention regulation problems & FOCUS!';
    this.pop = new PopupPlugin(
      this,
      10,
      "0x005e58",
      700,
      32,
      1366,
      0,
      0,
      0,
      0,
      "28px",
      true
    );
    //MAKE QUESTION MARKS GREY AFTER HOVER AND TELL TO "HOVER OVER QUESTION MARK AND READ THE INSTRUCTION" INSTEAD OF "READ INSTRUCTIONS" ONLY
    this.pop.setText(this.t, true),
      (btn = this.add
        .sprite(Config.width / 2, Config.height - 170, "prePlay")
        .setInteractive({ useHandCursor: true })
        .setScale(1)
        .setDepth(2000));

    btn.on("pointerdown", () => {
      this.startIntro();
    });
  }
  startIntro(){
    //this.scene.start('focus1');
    intro = this.add.image(683, 384, "intro").setDepth(-1200);
    this.layer = this.add
      .graphics()
      .fillStyle(0x303030, 0.9)
      .fillRect(0, 0, 1366, 768)
      .setDepth(-1000);
    this.pop.toggleWindow();
    btn.setVisible(false);

    this.instructionsText =
      'Almost ready to go! Read the instructions by hovering over the question marks and press "FOUCS" if you are done.\n\nAh sorry, "FOCUS"' +
      " - can't get it right!";
    this.instructions = new PopupPlugin(
      this,
      3,
      "0x005e58",
      350, //height
      16,
      500, //width
      0,
      290, //x
      -190, //y
      0,
      "24px",
      false
    );
    this.instructions.setText(this.instructionsText, true);

    this.qMark1 = this.add.image(698, 140, "qMark").setInteractive(); //batteries
    this.qMark2 = this.add.image(1233, 156, "qMark").setInteractive(); //day
    this.qMark3 = this.add.image(186, 330, "qMark").setInteractive(); //items
    this.qMark4 = this.add.image(360, 657, "qMark").setInteractive(); //arrows
    this.qMark5 = this.add.image(980, 380, "qMark").setInteractive(); //player
    this.qMark6 = this.add.image(251, 35, "qMark").setInteractive(); //score&countdown
    this.qMark7 = this.add.image(391, 74, "qMark").setInteractive(); //

    this.input.on("pointerdown", () => {
      console.log(pointer.x);
      console.log(pointer.y);
    });
    this.t1 =
      "How good you do in keeping your batteries full, will contribute towards the outcome of the game.\n\n" +
      "Keep an close eye on them!";
    this.t2 = "Display of the current day.";
    this.t3 =
      "Here you find items, that might help you. Be careful, when to use them.";
    this.t4 = "Go to the arrows to enter a different room.";
    this.t5 =
      "That's you! Be nice to yourself.\n\n" +
      "You can move the player by pressing the arrow keys. ";
    this.t6 =
      "The score is your primary factor towards winning the game.\n"+"Try to collect as many points as possible by solving the tasks in each room!\n\n";
    ("The countdown shows you the remaining time.\n\n");
    this.t7 = "You have 10 minutes to complete the game.\n\n"+ "The countdown shows you, how much time is left."
    this.createQMarks(this.qMark1, this.t1, 230, 300, 362, -400, "batteries");
    this.createQMarks(this.qMark2, this.t2, 90, 300, 895, -530, "monday");
    this.createQMarks(this.qMark3, this.t3, 125, 300, 230, -320, "items"); //items
    this.createQMarks(this.qMark4, this.t4, 90, 300, 220, -180, "arrows");
    this.createQMarks(this.qMark5, this.t5, 180, 300, 1021, -220, "player");
    this.createQMarks(this.qMark6, this.t6, 130, 600, 290, -600, "score", 0, 0);
        this.createQMarks(
          this.qMark7,
          this.t7,
          170,
          300,
          435,
          -530,
          "countdown",
          0,
          0
        );
    btn3 = this.add
      .sprite(543, 493, "borderPlay")
      .setInteractive({ useHandCursor: true })
      .setScale(0.4);
    btn3.on("pointerdown", () => {
      this.scene.start("focus1");
    });
  }
  createQMarks(name, text, height, width, x, y, lightUp) {
    name.on("pointerover", () => {
      this.pop1 = new PopupPlugin(
        this,
        3,
        "0xdbc1ac",
        height, //height
        16,
        width, //width
        0,
        x, //x
        y, //y
        0,
        "16px",
        false
      );
      this.pop1.setText(text, true);
      this.lightUp = lightUp;
      if (this.lightUp == "score"&&!this.score) {
        this.score = this.add.text(20, 20, "Score: 0", {
          fontSize: "34px",
          fill: "white",
        });
        this.add.text(20, 64, "Countdown: 10:00", {
          fontSize: "34px",
          fill: "white",
        }).setDepth(-900);
      }else if (this.lightUp == "monday" && !this.Monday){
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
      }else if(this.lightUp == "batteries" && !this.battery1){
        this.battery2 = this.add.image(605.5, 50, "battery_focus");
        this.battery3 = this.add.image(810.5, 50, "battery_efficiency");
      }else if(this.lightUp == "items" && !this.draggable1){
        this.draggable1 = this.add.image(65, 500, "cup");
        this.draggable2 = this.add.image(65, 400, "medication");
        this.todo_btn = this.add.image(70, 200, "todo");
      }
      else if(this.lightUp == "player" && !this.player){
        this.player = this.physics.add.sprite(900, 550, "guy").setScale(1);
        this.anims.create({
         key: "turn",
         frames: [{ key: "guy", frame: 2 }],
        });
        this.player.anims.play("turn", true);
      }else if(this.lightUp == "arrows" && !this.arrow1){
          this.arrow1 = this.add.image(240,610,"arrow_up")
          this.arrow2 = this.add.image(475, 610, "arrow_up");
          this.arrow3 = this.add.image(1085, 610, "arrow_up");
          this.arrow4 = this.add.image(70, 650, "arrow_left");
          this.arrow5 = this.add.image(1290,650,"arrow_right")
      }
    });

    name.on("pointerout", () => {
      this.pop1.toggleWindow();
    });
  }

  update() {
    if (this.pop) {
      if (this.pop.timedEvent) {
        if (this.pop.timedEvent.hasDispatched && !intro && !this.created) {
          btn.destroy();
          this.btn2 = this.add
            .sprite(Config.width / 2, Config.height - 170, "borderPlay")
            .setInteractive({ useHandCursor: true });
          this.btn2.on("pointerdown", () => {
            this.btn2.setVisible(false);
            this.startIntro();
          });
          this.created = true;
        }
      }
    }
    /*if (!this.pop.timedEvent && !intro) {
      console.log("huhu");
      btn.destroy();
      this.btn2 = this.add
        .sprite(Config.width / 2, Config.height - 170, "borderPlay")
        .setInteractive({ useHandCursor: true });
      this.btn2.on("pointerdown", () => {
        this.btn2.setVisible(false);
        this.startIntro();
      });
    }
  }*/

//this.btn.on('pointerup', () => this.btn.setScale(0.9));*/
/*console.log("here");
        generateButton(this,0);
        function generateButton(scene,tog) {
            console.log(scene);
            var img;
            if (tog == 0){
                img = "prePlay";
            }else{
                img = "borderPlay";
            }
            btn = new Sprite(scene, Config.width / 2, Config.height-170, img).setScale(0.05);

            btn.on('pointerdown', () => {
                btn.setScale(0.5);
                btn.destroy();
                scene.start('focus1');
            });
            //btn.on('pointerup', () => btn.setScale(0.5));

            if (tog == 0){
                btn.on("pointerover", () =>{
                    btn.destroy();
                    generateButton(scene,1);
                }); 
            }else {
                btn.on("pointerout", () =>{
                    btn.destroy();
                    generateButton(scene,0);
                });
            }
            console.log(btn)
        } */
      }}