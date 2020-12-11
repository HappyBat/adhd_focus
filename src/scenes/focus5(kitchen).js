import Focus_scene from "../focus_scene";
import PopupPlugin from "../../dist/pop";
var pointer;
var executed;
var call = 0;
var whiteLayer;
var arrayDish;
var arrayDirt;
var counter = 0;
var updated;
var finished = 0;

export default class Focus5 extends Focus_scene {

  constructor() {
    //initialise kitchen scene
    super(
      "focus5",
      "kitchen",
      { x: 683, y: 384, scale: 1.5 },
      { x: 40, y: 190, width: 1220, height: 640 },
      [{}, {}, {}, { x: 70, y: 650, img: "arrow_left_white" }, {}, {}]
    );
  }

  init(data) {
    super.Init(data);
  }

  create() {
    super.create();
    arrayDish = [];
    arrayDirt = [];
    this.dirtRemoved = 0;
    this.dirt;
    this.updated = 0;
    pointer = this.input.activePointer;
    super.createTaskbarButton(1, 300, 715, 145, "Cook something", 20);

    this.btn1.on("pointerdown", () => {
      this.btn1_create();
      this.pop;
      this.btn1.input.enabled = false;
    });

    super.createTaskbarButton(2, 530, 715, 145, "Do the dishes", 20);
    if (finished != 1) {
      this.btn2.on("pointerdown", () => {
        whiteLayer = this.add
          .graphics()
          .fillStyle(0x505050, 0.8)
          .fillRect(0, 0, 1366, 768);

        this.t =
          "Oh no! The dishwasher is already full. Apparently you forgot it a couple of days in a row.\n" +
          "Well then, let's do it by hand.";
        this.dishInfo = new PopupPlugin(
          this,
          10,
          "0x907748",
          200,
          10,
          800,
          1,
          100,
          -550,
          0,
          "28px",
          true
        );
        this.dishInfo.setText(this.t, true);
        
        //create dishes 
        this.createDish(379, 395, "pan", 1, 0);
        this.createDish(379, 380, "pan", 1, 0);
        this.createDish(330, 358, "cutlery", 1.5, 130);
        this.createDish(323, 372, "cutlery", 1, 130);
        this.createDish(330, 368, "cutlery", 1, 130);
        this.createDish(545, 480, "plate", 1.1, 0);
        this.createDish(545, 470, "plate", 1.1, 0);
        this.createDish(545, 460, "plate", 1.1, 0);
        this.createDish(545, 450, "plate", 1.1, 0);
        this.createDish(545, 440, "plate", 1.1, 0);

        this.createDish(920, 363, "bigBowl", 1.5, 0);
        this.createDish(929, 334, "glass1", 1.2, 30);
        this.createDish(308, 543, "plate", 1.7, 0);
        this.createDish(876, 510, "pan", 2, 0);
        this.createDish(609, 586, "bigBowl", 2, 0);
        this.createDish(381, 510, "bluePot", 2, 0);
        this.createDish(543, 537, "cutlery", 3, 130);
        this.createDish(564, 535, "cutlery", 3, 130);
        this.createDish(804, 491, "glass1", 1.5, 0);
        this.createDish(735, 419, "glass2", 1.5, 0);
        this.createDish(449, 646, "mug1", 1.2, 0);
        this.createDish(954, 588, "mug2", 1.1, 0);
        this.createDish(655, 468, "mug3", 1, 0);
        this.createDish(1181, 619, "giantPot", 2.5, 0);
        
        //create dirt marks
        this.element1 = this.createDirt(1176, 615, "brownDirt", 1, 0);
        this.element1.on("pointerover", () => {
          this.element1.setVisible(false);
          counter = counter + 1;
        });
        this.element2 = this.createDirt(670, 580, "yellowDirt", 0.7, 120);
        this.element2.on("pointerover", () => {
          this.element2.setVisible(false);
          counter = counter + 1;
        });
        this.element3 = this.createDirt(869, 343, "brownDirt", 0.8, 0);
        this.element3.on("pointerover", () => {
          this.element3.setVisible(false);
          counter = counter + 1;
        });

        this.element4 = this.createDirt(1132, 625, "brownDirt", 1.4, 0);
        this.element4.on("pointerover", () => {
          this.element4.setVisible(false);
          counter = counter + 1;
        });

        this.element5 = this.createDirt(800, 482, "redDirt", 1.2, 0);
        this.element5.on("pointerover", () => {
          this.element5.setVisible(false);
          counter = counter + 1;
        });

        this.element6 = this.createDirt(733, 381, "redDirt", 1, 0);
        this.element6.on("pointerover", () => {
          this.element6.setVisible(false);
          counter = counter + 1;
        });

        this.element7 = this.createDirt(926, 320, "redDirt", 1, 0);
        this.element7.on("pointerover", () => {
          this.element7.setVisible(false);
          counter = counter + 1;
        });

        this.element8 = this.createDirt(876, 525, "brownDirt2", 0.9, 0);
        this.element8.on("pointerover", () => {
          this.element8.setVisible(false);
          counter = counter + 1;
        });

        this.element9 = this.createDirt(521, 428, "yellowDirt", 0.8, 0);
        this.element9.on("pointerover", () => {
          this.element9.setVisible(false);
          counter = counter + 1;
        });

        this.element10 = this.createDirt(521, 428, "yellowDirt", 0.6, 90);
        this.element10.on("pointerover", () => {
          this.element10.setVisible(false);
          counter = counter + 1;
        });

        this.element11 = this.createDirt(304, 586, "greyDirt", 1, 90);
        this.element11.on("pointerover", () => {
          this.element11.setVisible(false);
          counter = counter + 1;
        });

        this.element12 = this.createDirt(525, 579, "greyDirt", 1, 90);
        this.element12.on("pointerover", () => {
          this.element12.setVisible(false);
          counter = counter + 1;
        });

        this.element13 = this.createDirt(968, 350, "greyDirt", 1, 90);
        this.element13.on("pointerover", () => {
          this.element13.setVisible(false);
          counter = counter + 1;
        });

        this.element14 = this.createDirt(574, 434, "greyDirt", 1, 90);
        this.element14.on("pointerover", () => {
          this.element14.setVisible(false);
          counter = counter + 1;
        });

        this.element15 = this.createDirt(891, 368, "greyDirt", 1, 90);
        this.element15.on("pointerover", () => {
          this.element15.setVisible(false);
          counter = counter + 1;
        });

        this.element16 = this.createDirt(552, 458, "greyDirt", 1, 90);
        this.element16.on("pointerover", () => {
          this.element16.setVisible(false);
          counter = counter + 1;
        });

        this.element17 = this.createDirt(324, 592, "greyDirt", 1, 0);
        this.element17.on("pointerover", () => {
          this.element17.setVisible(false);
          counter = counter + 1;
        });

        this.element18 = this.createDirt(554, 460, "greyDirt", 1, 90);
        this.element18.on("pointerover", () => {
          this.element18.setVisible(false);
          counter = counter + 1;
        });

        this.element19 = this.createDirt(743, 519, "greyDirt", 1, 90);
        this.element19.on("pointerover", () => {
          this.element19.setVisible(false);
          counter = counter + 1;
        });

        this.element20 = this.createDirt(346, 576, "yellowDirt", 0.5, 180);
        this.element20.on("pointerover", () => {
          this.element20.setVisible(false);
        });

        this.element21 = this.createDirt(1242, 673, "brownDirt2", 0.9, 90);
        this.element21.on("pointerover", () => {
          this.element21.setVisible(false);
          counter = counter + 1;
        });
      });
    }
  }

  createDish(x, y, name, scale, angle) {
    //create dish function
    this.dish = this.add
      .image(x, y, name)
      .setInteractive()
      .setScale(scale)
      .setAngle(angle);

    this.dish.on("drag", function (pointer, dragX, dragY) {
      this.pointer = pointer;
      this.x = dragX;
      this.y = dragY;
    });
    arrayDish.push(this.dish);
  }

  createDirt(x, y, name, scale, angle) {
    //create dirt function
    this.dirt = this.add
      .image(x, y, name)
      .setInteractive({ draggable: true })
      .setScale(scale)
      .setAngle(angle);
    return this.dirt;
  }

  onEvent() {}

  btn1_create() {
    //create popup for pot task
    this.t =
      "Find the pot, it is somewhere in the cupboard but you misplaced it, as always.\n" +
      "Click on the cupboards to search, then drag it to the hob and come back after 1 minute!";
    this.pop = new PopupPlugin(
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
    this.pop.setText(this.t, true);
  }

  callSuper() {
    super.updateHob();
    super.updatescore(10);
  }

  callSuper2() {
    if (updated != 1) {
      super.updatescore(20);
      super.updateB2("-1");
      super.updateB3("-1");
      super.updateText(6);
      updated = 1;
    }
  }

  update() {
    super.update();
    if (finished == 1) {
      this.btn2.input.enabled = false;
    }

    if (counter == 20 && this.updated != 1) {
      finished = 1;
      for (var i = 0; i < arrayDish.length; i++) {
        arrayDish[i].setVisible(false);
        whiteLayer.setVisible(false);
        counter = 0;
      }
      this.callSuper2();
      this.updated = 1;
    }

    if (pointer.isDown && executed != true && this.pop) {
      if (
        pointer.x > 815 &&
        pointer.x < 990 &&
        pointer.y > 390 &&
        pointer.y < 815
      ) {
        this.pot = this.add
          .sprite(890, 483, "pot")
          .setInteractive({ useHandCursor: true, draggable: true })
          .setScale(1.5)
          .setDepth(-100);

        this.pot.on("drag", function (pointer, dragX, dragY) {
          this.pointer = pointer;
          this.x = dragX;
          this.y = dragY;
        });

        this.pot.on("dragend", function () {
          if (this.x > 460 && this.x < 530 && this.y > 290 && this.y < 330) {
            this.x = 500;
            this.y = 310;
            call = 1;
          } else {
            this.x = 890;
            this.y = 483;
          }
        });
        if (call == 1) {
          this.callSuper();
        }
        executed = true;
        this.pot2Created = 1;
      }
    }
    if ((call == 1) & (this.called != 1)) {
      this.called = 1;
      this.callSuper();
    }
    if (this.pop) {
      if (this.pop.closeBtn.closedFlag == 1) {
        this.btn1.input.enabled = true;
      }
    }
  }
}
