import Focus_scene from "../focus_scene";
import PopupPlugin from "../../dist/pop";

var pokal;
var pointer;
var sv;
var item;
var achievements;
var scoreText;
var scoreAnimation;
var tween;
var colour;

export default class results extends Focus_scene {
  constructor() {
    super("results", "", {}, {}, [{}, {}, {}, {}, {}, {}]);
  }
  init(data) {
    super.Init(data);
    sv = data.sv;
  }
  create() {
    pointer = this.input.activePointer;
    achievements = [];
    super.create();
    this.add.image(683, 384, "graduation").setDepth(3000);
    this.layer = this.add
      .graphics()
      .fillStyle(0x101010, 0.9)
      .fillRect(0, 0, 1366, 768)
      .setDepth(3100);
    //this.add.image(300, 384, "pokal").setScale(0.8).setDepth(3200);
    scoreText = this.add
      .text(320, 20, "Your score: " + sv, {
        fontFamily: "Arial",
        fontSize: "120px",
        color: "#39d179",
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setDepth(3100);
    this.input.on("pointerdown", () => {
      console.log(pointer.x);
      console.log(pointer.y);
    });
    //grey background to achievements
    //this.add.graphics().fillStyle(0x303030, 0.8).setDepth(3100);
    //this.add.graphics().fillRect(20, 150, 300, 500).setDepth(3100);

    //golden squirrel
    this.generateFrame(50, 177, 230, 240);
    //squirrel text
    this.generateFrame(50, 417, 230, 40, 0x303030);
    this.generateText(50, 423, "The Golden Squirrel");
    // golden battery
    this.generateFrame(50, 550, 230, 110);
    //battery text
    this.generateFrame(50, 660, 230, 40, 0x303030);
    this.generateText(50, 665, "The Golden Battery");
    this.generateQuestionmark(112, 580, 100, 60, 0);
    this.generateQuestionmark(116, 236, 100, 100, 20);
    
  }
  generateFrame(x, y, width, height, fillStyle = 0x000000) {
    this.add
      .graphics()
      .fillStyle(fillStyle, 0.8)
      .fillRect(x, y, width, height)
      .lineStyle(4, 0x005e58, 1.0)
      .strokeRect(x, y, width, height)
      .setDepth(3100);
  }
  generateText(x, y, text) {
    this.add
      .text(x + 10, y, text, {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#39d179", //"#005e58",
        //strokeThickness: 1,
        //stroke: "#ffffff",
      })
      .setDepth(3200);
  }

  generateQuestionmark(x, y, width, height, plus) {
    this.q = this.add
      .graphics()
      .fillStyle(0x303030, 0.8)
      .fillRect(x, y, width, height)
      .lineStyle(4, 0x000000, 1.0)
      .strokeRect(x, y, width, height)
      .setDepth(3100);
    this.add
      .text(x + 37, y+10+plus, "?", {
        fontFamily: "Arial",
        fontSize: "40px",
        color: "#39d179", //"#005e58",
      })
      .setDepth(3200);
  }
  makeFinalInfo() {
    if (sv == 100) {
      this.t =
        "CONGRATULATIONS!\n\n" +
        "You managed your AD(H)D quite \n\nwell and finished all your tasks \n\nsuccessfully!";
      colour = "green";
    } else {
      this.t =
        "TRY AGAIN!\n\n" +
        "You were not able to finish all \n\ntasks and manage your AD(H)D.";
      colour = "darkred";
    }

    /*this.resultInfo = this.add
      .graphics()
      .fillStyle(0x303030, 0.8)
      .setDepth(3200)
      .fillRect(533, 100, 600 - 1, 150)
      .lineStyle(1, 0x005e58, 1.0)
      .setDepth(3200)
      .strokeRect(533, 100, 600, 150)
      .setDepth(3200);*/
    this.resultInfo = this.add
      .text(340, 261, this.t, {
        fontSize: "46px",
        fill: colour,
        //fontStyle: "bold",
      })
      .setDepth(3200);
  }
  showAchievements(image, scale, visible) {
    item = this.add
      .image(725, 430, image)
      .setScale(scale)
      .setDepth(3200)
      .setVisible(visible);
    achievements.push(item);
    if (this.firstUpdate != 1) {
      this.updateScore(50);
      this.firstUpdate = 1;
    }
  }
  updateScore(n) {
    scoreAnimation = this.add
      .text(1200, 400, "+" + n, {
        fontFamily: "Arial",
        fontSize: "120px",
        color: "#39d179",
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setDepth(4000);

    tween = this.tweens.add({
      targets: scoreAnimation,
      x: 1010,
      y: 28,
      ease: "Linear",
      duration: 1000,
      repeat: 0,
      onComplete: function () {
        scoreAnimation.setVisible(false);
        sv = sv + 50;
        scoreText.setText("Your score: " + sv);
      },
    });
  }
  update() {
    //super.update()

    if (this.executedAchievement != 1) {
      this.showAchievements("pokal", 1.2, true);
      this.showAchievements("batterySaver", 3, false);

      this.timedEvent = this.time.addEvent({
        delay: 3000,
        callback: moveMe,
        callbackScope: this,
        repeat: 2,
      });
      function moveMe() {
        console.log(this.timedEvent);
        if (this.timedEvent.repeatCount == 1) {
          this.q.setVisible(false);
          achievements[0].x = 165;
          achievements[0].y = 300;
          achievements[0].setScale(0.5);
          achievements[1].setVisible(true);
          this.updateScore(50);
        }
        if (this.timedEvent.repeatCount == 0) {
          achievements[1].x = 165;
          achievements[1].y = 605;
          achievements[1].setScale(1);
        }
      }
      this.executedAchievement = 1;
    }
    if (this.timedEvent.hasDispatched) {
      this.makeFinalInfo();
    }

    //if depression + ocd - gotta catch em all (-20) "you did not look after your(yourself, your wellbeing) batteries it seems."
    //if depression + ocd (x2) - gotta catch em all (-40)
  }
}
