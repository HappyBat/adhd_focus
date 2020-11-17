import Focus_scene from "../focus_scene";
var pokal;
var pointer;
var sv;
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
    super.create()
    this.add.image(683, 384, "graduation").setDepth(3000);
    //this.add.image(300, 384, "pokal").setScale(0.8).setDepth(3200);
  }
  showAchievements(image){
    pokal = this.add.image(683, 384, image).setScale(1.2).setDepth(3200);
  }
  update() {
    //super.update()
    if(this.Pokal != 1 && sv >= 0){
    this.showAchievements("pokal");
    this.timedEvent = this.time.addEvent({
        delay: 4000,
        callback: moveMe,
        callbackScope: this,
      })
  
    function moveMe(){
      pokal.x = 110;
      pokal.y = 150;
      pokal.setScale(0.5);
    }
    this.Pokal = 1;
    console.log(this)
    }
  }
}    
