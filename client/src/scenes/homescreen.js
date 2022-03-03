import InteractiveHandler from '../helpersHomescreen/InteractiveHandler'
import SocketHandler from '../helpersHomescreen/SocketHandler'
import UIHandler from "../helpersHomescreen/UIHandler"


export default class Homescreen extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Homescreen'
        })
    }
    preload() {
        this.load.image('background', 'src/assets/Background.jpg')
        this.load.spritesheet('fullscreen', 'src/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('button', 'src/assets/button.png', {frameWidth: 860, frameHeight: 378})
    }

    create() {
        this.SocketHandler = new SocketHandler(this)
        this.UIHandler = new UIHandler(this)
        this.UIHandler.buildUI()
        this.InteractiveHandler = new InteractiveHandler(this)
        this.socket.on('startGame', () => {
            this.scene.start("Game")
        }, this)
        
    }


}