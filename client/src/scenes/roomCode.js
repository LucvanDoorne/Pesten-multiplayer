import io from 'socket.io-client'

export default class Room extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Room'
        })
    }
    preload() {
        this.load.image('background', 'src/assets/Background.jpg')
        this.load.spritesheet('fullscreen', 'src/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('button', 'src/assets/button.png', {frameWidth: 860, frameHeight: 378})
    }

    create() {
        this.io = require("socket.io-client")
        this.socket = io('http://localhost:3000', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })
        
        this.socket.on('connect', () => {
            console.log('Connected!')
            
        })
        this.pointer = this.input.activePointer
        this.background = this.add.image(640,360, 'background')
        this.background.scale = 0.34
        this.pestenText = this.add.text(450, 30, 'PESTEN', { font: '100px Arial'})
        //full screen button
        this.fullscreenButton = this.add.image(1264, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive()
        this.fullscreenButton.on('pointerup', function(event) {
            if (this.scale.isFullscreen) {
                this.fullscreenButton.setFrame(0)
                this.scale.stopFullscreen()
            }else {
                this.fullscreenButton.setFrame(1)
                this.scale.startFullscreen()
            }
        }, this)
        this.joinButton = this.add.sprite(640, 600, 'button').setInteractive()
        this.joinButton.scale = 0.5
        this.joinText = this.add.text(495, 576, 'JOIN ROOM', { font: '50px Arial'})
        this.joinButton.on('pointerup', () => {
            if (this.pointer.leftButtonReleased()) {
                this.joinButton.setFrame(0)
                if (roomID.text.length == 4) {
                    this.socket.emit('joinRoom', roomID.text)
                    this.scene.start("Homescreen")
                }
            }
        }, this)

        this.input.keyboard.on('keydown-' + 'ENTER', function(event) {
            if (roomID.text.length == 4) {
                this.socket.emit('joinRoom', roomID.text)
                this.scene.start("Homescreen")
            }
        }, this)

        this.joinButton.on('pointerout', () => {
            this.joinButton.setFrame(0)
        }, this)

        this.joinButton.on('pointerdown', () => {
            if (this.pointer.leftButtonDown()) {
                this.joinButton.setFrame(1)
            }
        }, this)


        this.typeroomText = this.add.text(350, 200, 'Type your room ID:', { font: '70px Arial'})
        
        var roomID = this.add.text(640, 350, '', { font: '60px Arial'})

        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === 8 && roomID.text.length > 0){
                roomID.text = roomID.text.substr(0, roomID.text.length - 1)
                roomID.x = roomID.x + 17
            }
            else if (event.keyCode >= 96 && event.keyCode < 106 && roomID.text.length < 4){
                roomID.text += event.key
                roomID.x = roomID.x - 17
            }
            
    
        }, this)
    }
}