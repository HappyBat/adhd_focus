import Focus_scene from "../focus_scene";
var sleep;
var layer;
var sleep2;
var imageArray;
var imageArray2;
var executed;
export default class Focus3 extends Focus_scene {
  constructor() {
    super(
      "focus3",
      "living_room",
      { x: 683, y: 384, scale: 1.5 },
      { x: 40, y: 190, width: 1240, height: 640 },
      [
        {},
        {},
        {},
        { x: 70, y: 650, img: "arrow_left" },
        { x: 1290, y: 650, img: "arrow_right" },
        {},
      ]
    );
  }
  init(data) {
    super.Init(data);
  }
  create() {
    super.create();
    imageArray = ["cloud_focus2", "cloud_brainfog", "cloud_late","cloud_focus","cloud_class","cloud_intelligent","cloud_failure","cloud_lazy","cloud_stared"]
    imageArray2 = ["sheep1","sheep2","sheep2","sheep3"]

    this.sleepObjects = [];
    super.createTaskbarButton(1, 300, 715, 105, "Go to bed");
    this.btn1.on("pointerdown", () => {
        executed = 0;
        layer = this.add
          .graphics()
          .fillStyle(0x505050, 9)
          .fillRect(0, 0, 1366, 768)
          .setDepth(1900);
        sleep = this.add
          .sprite(650, 380, "sleeping2")
          .setScale(2)
          .setDepth(2000);
        this.sound.play("gnMusic");
      
      for (var i = 0; i < imageArray.length; i++) {
        var x = Phaser.Math.Between(60, 1300);
        var y = Phaser.Math.Between(40, 745);

        this.sleepObject = this.physics.add
          .sprite(x, y, imageArray[i])
          .setDepth(2200);
        this.sleepObjects.push(this.sleepObject);
      }
    });
  }
  onEvent() {}
  updateBatteries() {
    super.updateB1(-2);
    super.updateB2(-2);
    super.updateB3(-2);
  }

  update() {
    super.update();
      if (sleep && executed != 1) {
      this.timedEvent1 = this.time.addEvent({
        delay: 18000,
        callback: onEvent1,
        callbackScope: this,
      });
      if(1)
      console.log(executed)
      function onEvent1(){
        sleep2 = this.add
          .sprite(650, 380, "sleeping")
          .setScale(2)
          .setDepth(2000);
        sleep.setVisible(false);
      }
      this.timedEvent2 = this.time.addEvent({
        delay: 20000,
        callback: onEvent2,
        callbackScope: this,
      });
      function onEvent2() {
        for (var i = 0; i < this.sleepObjects.length; i++) {
          this.sleepObjects[i].setVisible(false);
        }
        for (var i = 0; i < imageArray2.length; i++) {
        var x = Phaser.Math.Between(60, 1300);
        var y = Phaser.Math.Between(40, 745);

        this.sleepObject = this.physics.add
          .sprite(x, y, imageArray2[i])
          .setDepth(2200);
        this.sleepObjects.push(this.sleepObject);
       }

      }

      this.timedEvent3 = this.time.addEvent({
        delay: 28000,
        callback: onEvent3,
        callbackScope: this,
      });

      function onEvent3() {
        if (layer) {
          layer.setVisible(false);
          sleep2.setVisible(false);
          this.updateBatteries();
        }
        for (var i = 0; i < this.sleepObjects.length; i++) {
          this.sleepObjects[i].setVisible(false);
        }
      }
      this.btn1.input.enabled = true;
      executed = 1;
    }

    for (var i = 0; i < this.sleepObjects.length; i++) {
      if (i % 2 == 0) {
        this.sleepObjects[i].x += 0.2;
        if (this.sleepObjects[i].x > 1366) {
          this.sleepObjects[i].x = -150;
        }
      }
      if (i % 3 == 0) {
        this.sleepObjects[i].x -= 0.4;
        if (this.sleepObjects[i].x < -30) {
          this.sleepObjects[i].x = +1360;
        }
      } else {
        this.sleepObjects[i].x += 0.35;
        if (this.sleepObjects[i].x > 1366) {
          this.sleepObjects[i].x = -250;
        }
        if (i % 3 == 0) {
          this.sleepObjects[i].x -= 0.3;
          if (this.sleepObjects[i].x < 10) {
            this.sleepObjects[i].x = +1500;
          }
        }
      }
    }
  }
}
