import Focus_scene from "../focus_scene"
import PopupPlugin from "../../dist/pop";
var pointer;
var executed;
export default class Focus2 extends Focus_scene {
  constructor() {
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
    pointer = this.input.activePointer;
    super.createTaskbarButton(1,300, 715,145,"Cook something");
    super.createTaskbarButton(2,500, 715, 145,"Do the dishes");

    this.btn1.on("pointerdown", () => {
      this.btn1_create();
      this.pop;
      this.btn1.input.enabled = false;
    });
  }
  onEvent() {}
  btn1_create(){
      this.t =
      "Find the pot, it is somewhere in the cupboard but you misplaced it, as always.\n"+
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

  update() {
    super.update();

   if (pointer.isDown && executed != true) {
     if(pointer.x > 815 && pointer.x < 990 && pointer.y > 160 && pointer.y < 390){
        this.pot = this.add
        .sprite(890, 250, "pot")
        .setInteractive({ useHandCursor: true, draggable: true })
        .setScale(1.5)
        .setDepth(-100);

        this.pot.on("drag", function (pointer, dragX, dragY) {
          this.pointer = pointer;
          this.x = dragX;
          this.y = dragY;
        });

        this.pot.on("dragend", function () {
          if (this.x > 460 && this.x < 530 && this.y > 290 && this.y < 330){
            this.x = 500;
            this.y = 310;
          }else {
            this.x = 890;
            this.y = 250;
          }
        })
        executed = true;
     }
     console.log(pointer.x); 
     console.log(pointer.y);
     // ...
   }

   if (this.pop) {
     if (this.pop.closeBtn.closedFlag == 1) {
       this.btn1.input.enabled = true;
     }
   }

  }
}
