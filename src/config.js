import preload_scene from './scenes/preload';
import disclaimer from "./scenes/disclaimer";
import intermediate from './scenes/intermediate';
import focus1 from './scenes/focus1';
import focus2 from './scenes/focus2(bathroom)';
import focus3 from './scenes/focus3(livingRoom)';
import focus4 from './scenes/focus4(studyRoom)';
import focus5 from './scenes/focus5(kitchen)';
import focus6 from "./scenes/focus6";
import results from "./scenes/results";


export default {
    type: Phaser.AUTO,
    parent: "test",
    width: 1366,
    height: 768,
    physics : {
        default : 'arcade',
        arcade : {
            debug : false
        }
    },
    scene : [preload_scene,disclaimer, intermediate, focus1,focus2, focus3, focus4, focus5, focus6, results]
};