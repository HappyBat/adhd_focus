  
import Config from '../config';
import PopupPlugin from '../../dist/pop';
var btn ;
export default class intermediate extends Phaser.Scene {
    constructor() {
        super({ key : 'intermediate' });
    }

    create() {
           
        this.t = 'Focus! is a game developed to allow you to experience the world as someone with Attention Deficit (Hyperactivity) Disorder (AD(H)D.)[i] The game is based on interviews & surveys within the AD(H)D community & experts.\n\n' 
        this.t += 'You will play FOCUS! twice, once under the conditions of a normally functioning adult ("neurotypical" person) & once as someone with AD(H)D. Can you beat AD(H)D & do as well in the second round as in the first?\n\n'
        this.t += 'In the community of people with AD(H)D the phrase "just focus!" is a neurotypical nuisance: As if it was that easy! See how well you can regulate attention with attention regulation problems & FOCUS!'
        this.pop = new PopupPlugin(this, 10, "0x005e58", 700, 32, 1366, 0, 0, 0, 0, "28px", true);
        this.pop.setText(this.t,true),
        btn = this.add.sprite(Config.width / 2, Config.height - 170, "prePlay")
        .setInteractive({useHandCursor: true })
        .setScale(1)
        .setDepth(2000);        
        btn.on('pointerdown', () => {
            this.scene.start('focus1');
        });

        //this.btn.on('pointerup', () => this.btn.setScale(0.9));*/
        /*console.log("here");
        generateButton(this,0);
        function generateButton(scene,tog) {
            console.log(scene);
            var img;
            if (tog == 0){
                img = "prePlay";
            }else{
                img = "borderPlay";
            }
            btn = new Sprite(scene, Config.width / 2, Config.height-170, img).setScale(0.05);

            btn.on('pointerdown', () => {
                btn.setScale(0.5);
                btn.destroy();
                scene.start('focus1');
            });
            //btn.on('pointerup', () => btn.setScale(0.5));

            if (tog == 0){
                btn.on("pointerover", () =>{
                    btn.destroy();
                    generateButton(scene,1);
                }); 
            }else {
                btn.on("pointerout", () =>{
                    btn.destroy();
                    generateButton(scene,0);
                });
            }
            console.log(btn)
        } */ 
       
    }

    update() {
        if(this.pop){
            if(this.pop.timedEvent){
        
                if (this.pop.timedEvent.hasDispatched){
                    btn.destroy();
                    this.btn2 = this.add.sprite(Config.width / 2, Config.height-170, "borderPlay").setInteractive({ useHandCursor: true });            
                    this.btn2.on('pointerdown', () => {
                        this.scene.start('focus1');
                    });
                }
        }}
        if (!this.pop.timedEvent) {
          btn.destroy();
          this.btn2 = this.add.sprite(
            
            Config.width / 2,
            Config.height - 170,
            "borderPlay"
          )
            .setInteractive({ useHandCursor: true });
          this.btn2.on("pointerdown", () => {
            this.scene.start("focus1");
          });
        }     
    }
}