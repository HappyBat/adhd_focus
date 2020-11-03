import Focus_scene from "../focus_scene"
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
  init(data){
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
  }
  onEvent() {

  }

  update() {
    super.update();
  }
}
    
    
    
    

    
