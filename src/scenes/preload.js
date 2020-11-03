import background from "../../assets/background.jpg";
import cup from "../../assets/cup.png";
import medication from "../../assets/medication.png";
import guy from "../../assets/guy_sprite.png";
//import battery1 from "../../assets/battery_sprite_resized.png";
import battery1 from "../../assets/battery_focus.png";
import battery2 from "../../assets/battery_energy.png";
import battery3 from "../../assets/battery_efficiency.png";
import prePlay from "../../assets/play17.png";
import borderPlay from "../../assets/play18.png";
import arrow_up from "../../assets/arrow_up.png";
import arrow_left from "../../assets/arrow_left.png";
import arrow_left_white from "../../assets/arrow_left_white.png";
import arrow_right from "../../assets/arrow_right.png";
import arrow_right_white from "../../assets/arrow_right_white.png";
import arrow_down from "../../assets/arrow_down.png";
import studyRoom from "../../assets/studyRoom.jpg";
import living_room from "../../assets/living_room.png";
import bathroom from "../../assets/bathroom.png";
import kitchen from "../../assets/kitchen.png";
import city from "../../assets/city.png"
import todo from "../../assets/todo.png";
import virus from "../../assets/virus.png";
import play from "../../assets/play.png";
import studyText from "../../assets/studyText.png";
import depGuy from "../../assets/depGuy.png";
import hands from "../../assets/hands.png";
import dolphin_questions from "../../assets/dolphin_questions.jpg";
import empty from "../../assets/empty.png";
import wrong from "../../assets/wrong.png";
import right from "../../assets/right.png"; 
import done from "../../assets/done.png"; 
import sheet from "../../assets/sheet.png"; 
import name1 from "../../assets/name1.png"; 
import name2 from "../../assets/name2.png"; 
import name3 from "../../assets/name3.png"; 
import name4 from "../../assets/name4.png"; 
import name5 from "../../assets/name5.png"; 
import name6 from "../../assets/name6.png"; 
import name7 from "../../assets/name7.png"; 
import name8 from "../../assets/name8.png"; 
import name9 from "../../assets/name9.png"; 
import name10 from "../../assets/name10.png"; 
import name11 from "../../assets/name11.png"; 
import name12 from "../../assets/name12.png"; 
import name13 from "../../assets/name13.png"; 
import name14 from "../../assets/name14.png"; 
import name15 from "../../assets/name15.png"; 
import name16 from "../../assets/name16.png"; 
import angryBoss from "../../assets/angryBoss.png"; 
import pot from "../../assets/pot.png"; 
import sleeping from "../../assets/sleeping.jpg"; 

export default class preload_scene extends Phaser.Scene {
    constructor() {
        super({ key : 'preload_scene' });    }

    
    preload() {
       //console.log(require("../../audio/gnMusic2mod.mp3"));
        this.load.audio("gnMusic", [
          require("../../audio/gnMusic2mod.mp3")
          ]),
        //this.load.scenePlugin('PopupPlugin', './popup.js');
        this.load.image("background", background),
          this.load.image("studyRoom", studyRoom),
          //this.load.image("play", play),
          this.load.image("prePlay", prePlay),
          this.load.image("borderPlay", borderPlay),
          this.load.image("cup", cup),
          this.load.image("medication", medication),
          this.load.image("arrow_up", arrow_up),
          this.load.image("arrow_left", arrow_left),
          this.load.image("arrow_left_white", arrow_left_white),
          this.load.image("arrow_right", arrow_right),
          this.load.image("arrow_right_white", arrow_right_white),
          this.load.image("arrow_down", arrow_down),
          this.load.image("living_room", living_room),
          this.load.image("bathroom", bathroom),
          this.load.image("kitchen", kitchen),
          this.load.image("city", city),
          this.load.image("todo", todo),
          this.load.image("virus", virus),
          this.load.image("virus", virus),
          this.load.image("play", play),
          this.load.image("studyText", studyText),
          this.load.image("depGuy", depGuy),
          this.load.image("dolphin_questions", dolphin_questions),
          this.load.image("empty", empty),
          this.load.image("wrong", wrong),
          this.load.image("right", right),
          this.load.image("done", done),
          this.load.image("sheet", sheet),
          this.load.image("name1", name1),
          this.load.image("name2", name2),
          this.load.image("name3", name3),
          this.load.image("name4", name4),
          this.load.image("name5", name5),
          this.load.image("name6", name6),
          this.load.image("name7", name7),
          this.load.image("name8", name8),
          this.load.image("name9", name9),
          this.load.image("name10", name10),
          this.load.image("name11", name11),
          this.load.image("name12", name12),
          this.load.image("name13", name13),
          this.load.image("name14", name14),
          this.load.image("name15", name15),
          this.load.image("name16", name16),
          this.load.image("angryBoss", angryBoss),
          this.load.image("pot", pot),
          this.load.image("sleeping", sleeping),

          this.load.spritesheet("guy", guy, {
            frameWidth: 123,
            frameHeight: 377,
          });
        this.load.spritesheet("battery_focus",battery1,
        {frameWidth:155.5, frameHeight:57 }
        );
        this.load.spritesheet("battery_energy", battery2, {
          frameWidth: 155.5,
          frameHeight: 57,
        });
        this.load.spritesheet("battery_efficiency", battery3, {
          frameWidth: 155,
          frameHeight: 58,
        });
        this.load.spritesheet("hands", hands, {
          frameWidth:281.5,
          frameHeight:387 ,
        });

    }
    onComplete() {
        this.progressBar.destroy();
        this.progressBox.destroy();
    }
    create() {        
        this.scene.start('intermediate');
    }
}
