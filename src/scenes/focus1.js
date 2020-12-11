import Focus_scene from "../focus_scene"

export default class Focus1 extends Focus_scene {

    constructor() {
        //initialize focus1 scene
        super("focus1","background",{x : 900,y : 550,scale : 1}, {x:40,y:260,width:1240,height:520},[{x:240,y:610,img:"arrow_up"},{x:475,y:610,img:"arrow_up"}, {x:1085,y:610,img:"arrow_up"},{x:70,y:650,img:"arrow_left"},{x:1290,y:650,img:"arrow_right"}]);
    }

    init(data){
    super.Init(data);
    }

    update() {       
        super.update();
    }

}
    
    
    
    

    
