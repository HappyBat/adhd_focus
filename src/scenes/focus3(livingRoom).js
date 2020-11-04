import Focus_scene from "../focus_scene";
var sleep;
var layer;
export default class Focus2 extends Focus_scene {
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
    super.createTaskbarButton(1, 300, 715, 145, "Go to bed");
    this.btn1.on("pointerdown", () => {
      if(layer){
        layer.setVisible(true);
        sleep.setVisible(true);
        //this.sound.play("gnMusic");
        console.log("layer2");
        console.log(this.layer)
      }else{
      layer = this.add
        .graphics()
        .fillStyle(0x505050, 9)
        .fillRect(0, 0, 1366, 768);
      sleep = this.add
        .sprite(650, 380, "sleeping")
        .setScale(2)
        .setDepth(2000);
      //this.sound.play("gnMusic");
            console.log("layer1");
            console.log(this.layer);
      }

    });
    
  }
  onEvent() {}
  updateBatteries(){
    super.updateB1(-2);
    super.updateB2(-2);
    super.updateB3(-2);
  }
  update() {
    super.update();
    if(sleep){
    this.timedEvent = this.time.addEvent({
          delay: 28000,
          callback: onEvent,
          callbackScope: this,
        });
    function onEvent() {
      
        layer.setVisible(false);
        sleep.setVisible(false);
          this.updateBatteries();
    }
    } 
  }
}
