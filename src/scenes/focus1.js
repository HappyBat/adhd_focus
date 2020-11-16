import Focus_scene from "../focus_scene"
import PopupPlugin from '../../dist/pop';
var timer;
export default class Focus1 extends Focus_scene {

    constructor() {
        super("focus1","background",{x : 900,y : 550,scale : 1}, {x:40,y:260,width:1240,height:520},[{x:240,y:610,img:"arrow_up"},{x:475,y:610,img:"arrow_up"}, {x:1085,y:610,img:"arrow_up"},{x:70,y:650,img:"arrow_left"},{x:1290,y:650,img:"arrow_right"}]);
        //this.timer = this.scene.time.addEvent({ delay: 1000, callback: this.onEvent(), callbackScope: this , repeat: 10 }); 
        //this.t;

    }

   /*onEvent()    {  
        console.log("one Sec");
        super.updateTime(-1); // One second
        super.updateCountdown();
    }*/
    /*create(){
        super.create();

    }*/
    init(data){
    super.Init(data);
    console.log("super init")
    console.log(data.oH)
    /*super.scoreValue = data.sv;
    super.cup = data.cup;
    super.pill = data.pill;
    super.b1Frame = data.b1Frame;
    super.b2Frame = data.b2Frame;
    super.b3Frame = data.b3Frame;
    super.b1 = data.b1;
    super.b2 = data.b2;
    super.b3 = data.b3;*/
    }

    update() {       
        super.update();
    }

}
    
    
    
    

    
