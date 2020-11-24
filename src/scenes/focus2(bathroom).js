import PopupPlugin from "../../dist/pop";
import Focus_scene from "../focus_scene";
var array;
var pointer;
var counter = 0;
var dragged;
var counter2 = 0;
var pointerDown = false;
var popped = 0;

export default class Focus2 extends Focus_scene {
  constructor() {
    super(
      "focus2",
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
    super.scoreValue = data.sv;
    super.cup = data.cup;
    super.pill = data.pill;
    super.b1Frame = data.b1Frame;
    super.b2Frame = data.b2Frame;
    super.b3Frame = data.b3Frame;
    super.b1 = data.b1;
    super.b2 = data.b2;
    super.b3 = data.b3;
  }
  create() {
    super.create();

    this.executed = 0;

    super.createTaskbarButton(1, 295, 715, 145, "Do the laundry", 45);

    this.btn1.on("pointerdown", () => {
      pointerDown = true;
      this.t1 = "Put all the clothes into the washing machine!";
      this.doLaundry = new PopupPlugin(
        this,
        10,
        "0x907748",
        100,
        10,
        800,
        1,
        280,
        -50,
        0,
        "28px",
        true
      );
      this.doLaundry.setText(this.t1, true);
    });

    pointer = this.input.activePointer;
    this.input.on("pointerdown", () => {
      console.log(pointer.x);
      console.log(pointer.y);
    });

    array = [];
    
    
    this.createClothes(897, 571, "shirt");
    this.createClothes(635, 600, "sock1");
    this.createClothes(1125, 729, "sock2");
    this.createClothes(291, 651, "pantsBlue");
    this.createClothes(175, 722, "pantsBlue2");
    this.createClothes(985, 664, "pantsBlue3");
    this.createClothes(683, 655, "light_shirt");
    this.createClothes(279, 412, "pantsGreen");
    this.createClothes(1127, 388, "pantsOrange");
    this.createClothes(737, 570, "scarf");
    this.createClothes(1080, 612, "stuff1");
    this.createClothes(556, 589, "stuff2");
    this.createClothes(895, 363, "stuff3");
    this.createClothes(620, 430, "greenTowel");
    this.createClothes(1193, 489, "toiletTowel");
  }
  createClothes(x, y, name) {
    this.cloth = this.add.image(x, y, name).setDepth(-100);
    if (name == "pantsGreen") {
      this.cloth.setScale(1.5);
    }

    array.push(this.cloth)
  }

  onEvent() {}

  callSuper() {
    super.updatescore(5);
  }
  batteryUpdate(){
    console.log("update2")
    super.updateB1("-1")
    super.updateB2("-1");
    super.updateB3("-1");
  }

  createPopup() {
    this.t =
      "Uhhh... What is that? It is getting so hard to do this! Almost like physical pain.\n\n" +
      "Everything crosses my mind but that damn dirty clothes. I grab them and then forget them elsewhere in the flat!\n\n" +
      "Maybe I just come back later?";
    this.tooHard = new PopupPlugin(
      this,
      10,
      "0x907748",
      320,
      10,
      800,
      1,
      280,
      -50,
      0,
      "28px",
      true
    );
    this.tooHard.setText(this.t, true);
  }

  update() {
    super.update();
    if(pointerDown && this.executed == 0){
      console.log(array);
    for(var i=0; i < array.length; i++){
      
    array[i].setInteractive({ useHandCursor: true, draggable: true });//update if(pointerDown){}
    array[i].on("drag", function (pointer, dragX, dragY) {
      this.pointer = pointer;
      dragged = 0;

      counter2 = counter2 + 1;
      this.x = dragX + (counter * counter2) / 3;
      this.y = dragY + (counter * counter2) / 6;
    });
    array[i].on("dragend", function () {
      if (this.x > 324 && this.x < 404 && this.y > 408 && this.y < 530) {
        this.setVisible(false);
        counter = counter + 1;
        dragged = 1;
      }
      if (dragged == 1) {
        this.scene.callSuper();
        dragged = 0;
      }
      counter2 = 0;
      if (counter == 5 && popped ==0) {
        this.scene.createPopup();
        this.scene.batteryUpdate();
        popped = 1;
      }else if (counter == 6){
        this.scene.batteryUpdate();
      }
    });//update
    this.executed = 1;
  }}
  }
}
