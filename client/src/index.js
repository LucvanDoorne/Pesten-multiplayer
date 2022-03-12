import Phaser from 'phaser';
import Homescreen from './scenes/homescreen.js';
//import Game from "./scenes/game.js"


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'pesten',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    scene: [ Homescreen ]
};

const game = new Phaser.Game(config);
