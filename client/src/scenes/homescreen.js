import InteractiveHandler from '../helpersHomescreen/InteractiveHandler'
import SocketHandlerHomescreen from '../helpersHomescreen/SocketHandlerHomescreen'
import UIHandlerHomescreen from "../helpersHomescreen/UIHandlerHomescreen"
import UIHandlerGame from '../helpersGame/UIHandlerGame'
import SocketHandlerGame from '../helpersGame/SocketHandlerGame'
import io from 'socket.io-client'



export default class Homescreen extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Homescreen'
        })
    }
    preload() {
        this.load.image('background', 'src/assets/Background.jpg')
        this.load.image('aas harten', 'src/assets/cards/wit/withartenA.png')
        this.load.image('2 harten', 'src/assets/cards/wit/witharten2.png')
        this.load.image('3 harten', 'src/assets/cards/wit/witharten3.png')
        this.load.image('4 harten', 'src/assets/cards/wit/witharten4.png')
        this.load.image('5 harten', 'src/assets/cards/wit/witharten5.png')
        this.load.image('6 harten', 'src/assets/cards/wit/witharten6.png')
        this.load.image('7 harten', 'src/assets/cards/wit/witharten7.png')
        this.load.image('8 harten', 'src/assets/cards/wit/witharten8.png')
        this.load.image('9 harten', 'src/assets/cards/wit/witharten9.png')
        this.load.image('10 harten', 'src/assets/cards/wit/witharten10.png')
        this.load.image('koning harten', 'src/assets/cards/wit/withartenK.png')
        this.load.image('koningin harten', 'src/assets/cards/wit/withartenQ.png')
        this.load.image('aas ruiten', 'src/assets/cards/wit/witruitenA.png')
        this.load.image('2 ruiten', 'src/assets/cards/wit/witruiten2.png')
        this.load.image('3 ruiten', 'src/assets/cards/wit/witruiten3.png')
        this.load.image('4 ruiten', 'src/assets/cards/wit/witruiten4.png')
        this.load.image('5 ruiten', 'src/assets/cards/wit/witruiten5.png')
        this.load.image('6 ruiten', 'src/assets/cards/wit/witruiten6.png')
        this.load.image('7 ruiten', 'src/assets/cards/wit/witruiten7.png')
        this.load.image('8 ruiten', 'src/assets/cards/wit/witruiten8.png')
        this.load.image('9 ruiten', 'src/assets/cards/wit/witruiten9.png')
        this.load.image('10 ruiten', 'src/assets/cards/wit/witruiten10.png')
        this.load.image('koning ruiten', 'src/assets/cards/wit/witruitenK.png')
        this.load.image('koningin ruiten', 'src/assets/cards/wit/witruitenQ.png')
        this.load.image('aas schoppen', 'src/assets/cards/wit/witschoppenA.png')
        this.load.image('2 schoppen', 'src/assets/cards/wit/witschoppen2.png')
        this.load.image('3 schoppen', 'src/assets/cards/wit/witschoppen3.png')
        this.load.image('4 schoppen', 'src/assets/cards/wit/witschoppen4.png')
        this.load.image('5 schoppen', 'src/assets/cards/wit/witschoppen5.png')
        this.load.image('6 schoppen', 'src/assets/cards/wit/witschoppen6.png')
        this.load.image('7 schoppen', 'src/assets/cards/wit/witschoppen7.png')
        this.load.image('8 schoppen', 'src/assets/cards/wit/witschoppen8.png')
        this.load.image('9 schoppen', 'src/assets/cards/wit/witschoppen9.png')
        this.load.image('10 schoppen', 'src/assets/cards/wit/witschoppen10.png')
        this.load.image('koning schoppen', 'src/assets/cards/wit/witschoppenK.png')
        this.load.image('koningin schoppen', 'src/assets/cards/wit/witschoppenQ.png')
        this.load.image('aas klaveren', 'src/assets/cards/wit/witklaverA.png')
        this.load.image('2 klaveren', 'src/assets/cards/wit/witklaver2.png')
        this.load.image('3 klaveren', 'src/assets/cards/wit/witklaver3.png')
        this.load.image('4 klaveren', 'src/assets/cards/wit/witklaver4.png')
        this.load.image('5 klaveren', 'src/assets/cards/wit/witklaver5.png')
        this.load.image('6 klaveren', 'src/assets/cards/wit/witklaver6.png')
        this.load.image('7 klaveren', 'src/assets/cards/wit/witklaver7.png')
        this.load.image('8 klaveren', 'src/assets/cards/wit/witklaver8.png')
        this.load.image('9 klaveren', 'src/assets/cards/wit/witklaver9.png')
        this.load.image('10 klaveren', 'src/assets/cards/wit/witklaver10.png')
        this.load.image('koning klaveren', 'src/assets/cards/wit/witklaverK.png')
        this.load.image('koningin klaveren', 'src/assets/cards/wit/witklaverQ.png')
        this.load.image('boer harten', 'src/assets/cards/wit/withartenJ.png')
        this.load.image('boer ruiten', 'src/assets/cards/wit/witruitenJ.png')
        this.load.image('boer schoppen', 'src/assets/cards/wit/witschoppenJ.png')
        this.load.image('boer klaveren', 'src/assets/cards/wit/witklaverJ.png')
        this.load.image('joker 1', 'src/assets/cards/wit/witjoker.png')
        this.load.image('joker 2', 'src/assets/cards/wit/witjoker2.png')
        this.load.image('Arrow', 'src/assets/arrow.png')
        this.load.image('Table', 'src/assets/table.png')
        this.load.image('gray-chair', 'src/assets/gray-chair.png')
        this.load.image('brown-chair', 'src/assets/brown-chair.png')
        this.load.image('backcard', 'src/assets/backcard.jpg')
        this.load.spritesheet('button', 'src/assets/button.png', {frameWidth: 860, frameHeight: 378})
        this.load.image('Beurt-richting', 'src/assets/Arrow2.png')
        this.load.spritesheet('chair', 'src/assets/chair.png', {frameWidth: 384, frameHeight: 393})
        this.load.image('Klaver', 'src/assets/klaver.png')
        this.load.image('Schop', 'src/assets/schop2.png')
        this.load.image('Hart', 'src/assets/hart.png')
        this.load.image('Ruit', 'src/assets/ruit.png')
        this.load.spritesheet('fullscreen', 'src/assets/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
        this.load.image('blackbackground', 'src/assets/blackbackground.png')
    }

    create() {
        this.joinedRoom = false
        this.roomNumber = ''
        // zorgt ervoor dat multiplayer werkt
        this.io = require("socket.io-client")
        this.socket = io('http://localhost:3000', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })

        this.socket.on('restartGame', (arg) => {
            if (arg == this.socket.id) {
                this.scene.restart()
            }
        })

        

        // dit is het beginscherm waar je de code kan invoeren
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
                if (roomID.text.length == 4 && this.joinedRoom == false) {
                    this.joinedRoom = true
                    // maakt de lobby aan
                    this.SocketHandlerHomescreen = new SocketHandlerHomescreen(this)
                    this.UIHandlerHomescreen = new UIHandlerHomescreen(this)
                    this.UIHandlerHomescreen.buildUI()
                    this.roomText = this.add.text(320, 30, 'Room number: '+ roomID.text, { font: '70px Arial'})
                    this.roomText.depth = 3
                    this.InteractiveHandler = new InteractiveHandler(this)
                    this.SocketHandlerGame = new SocketHandlerGame(this)
                    this.UIHandlerGame = new UIHandlerGame(this)
                    this.roomNumber = roomID.text
                    this.socket.emit('joinRoom', roomID.text)
                    // verwijdert de rest van het homescreen
                    this.joinButton.destroy(true)
                    this.joinText.destroy(true)
                    this.typeroomText.destroy(true)
                    roomID.destroy(true)
                }
            }
        }, this)

        this.input.keyboard.on('keydown-' + 'ENTER', function(event) {
            if (roomID.text.length == 4 && this.joinedRoom == false) {
                this.joinedRoom = true
                // maakt de lobby aan
                this.SocketHandlerHomescreen = new SocketHandlerHomescreen(this)
                this.UIHandlerHomescreen = new UIHandlerHomescreen(this)
                this.UIHandlerHomescreen.buildUI()
                this.roomText = this.add.text(320, 30, 'Room number: '+ roomID.text, { font: '70px Arial'})
                this.roomText.depth = 3
                this.InteractiveHandler = new InteractiveHandler(this)
                this.SocketHandlerGame = new SocketHandlerGame(this)
                this.UIHandlerGame = new UIHandlerGame(this)
                this.roomNumber = roomID.text
                this.socket.emit('joinRoom', roomID.text)
                // verwijdert de rest van het homescreen
                this.joinButton.destroy(true)
                this.joinText.destroy(true)
                this.typeroomText.destroy(true)
                roomID.destroy(true)
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


        this.typeroomText = this.add.text(75, 170, 'Type your room ID (4-digit number):', { font: '70px Arial'})
        
        var roomID = this.add.text(640, 285, '', { font: '60px Arial'})

        this.backgroundN1 = this.add.sprite(100, 450, 'blackbackground').setInteractive()
        this.backgroundN1.scale = 0.35
        this.backgroundN1.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '1'
                roomID.x = roomID.x - 17
            }
        })

        this.backgroundN2 = this.add.sprite(200, 450, 'blackbackground').setInteractive()
        this.backgroundN2.scale = 0.35
        this.backgroundN2.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '2'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN3 = this.add.sprite(300, 450, 'blackbackground').setInteractive()
        this.backgroundN3.scale = 0.35
        this.backgroundN3.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '3'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN4 = this.add.sprite(400, 450, 'blackbackground').setInteractive()
        this.backgroundN4.scale = 0.35
        this.backgroundN4.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '4'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN5 = this.add.sprite(500, 450, 'blackbackground').setInteractive()
        this.backgroundN5.scale = 0.35
        this.backgroundN5.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '5'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN6 = this.add.sprite(600, 450, 'blackbackground').setInteractive()
        this.backgroundN6.scale = 0.35
        this.backgroundN6.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '6'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN7 = this.add.sprite(700, 450, 'blackbackground').setInteractive()
        this.backgroundN7.scale = 0.35
        this.backgroundN7.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '7'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN8 = this.add.sprite(800, 450, 'blackbackground').setInteractive()
        this.backgroundN8.scale = 0.35
        this.backgroundN8.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '8'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN9 = this.add.sprite(900, 450, 'blackbackground').setInteractive()
        this.backgroundN9.scale = 0.35
        this.backgroundN9.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '9'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN10 = this.add.sprite(1000, 450, 'blackbackground').setInteractive()
        this.backgroundN10.scale = 0.35
        this.backgroundN10.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length < 4) {
                roomID.text += '0'
                roomID.x = roomID.x - 17
            }
        })
        this.backgroundN11 = this.add.sprite(1150, 450, 'blackbackground').setInteractive()
        this.backgroundN11.scaleY = 0.35
        this.backgroundN11.scaleX= 0.7
        this.backgroundN11.on('pointerup', () => {
            if (this.pointer.leftButtonReleased() && roomID.text.length > 0) {
                roomID.text = roomID.text.substr(0, roomID.text.length - 1)
                roomID.x = roomID.x + 17
            }
        })
        this.backgroundN1.depth = -1
        this.backgroundN2.depth = -1
        this.backgroundN3.depth = -1
        this.backgroundN4.depth = -1
        this.backgroundN5.depth = -1
        this.backgroundN6.depth = -1
        this.backgroundN7.depth = -1
        this.backgroundN8.depth = -1
        this.backgroundN9.depth = -1
        this.backgroundN10.depth = -1
        this.backgroundN11.depth = -1

        this.numbersText = this.add.text(85, 427.5, '1      2      3      4      5      6      7      8      9      0      BACK', { font: '45px Arial'})
        

        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === 8 && roomID.text.length > 0){
                roomID.text = roomID.text.substr(0, roomID.text.length - 1)
                roomID.x = roomID.x + 17
            }
            else if (event.keyCode >= 96 && event.keyCode < 106 && roomID.text.length < 4){
                roomID.text += event.key
                roomID.x = roomID.x - 17
            }else if (event.keyCode >= 48 && event.keyCode < 58 && roomID.text.length < 4){
                roomID.text += event.key
                roomID.x = roomID.x - 17
            }
            
    
        }, this)

        // dit maakt de game
        this.socket.on('beginGame', (arg) => {
            if (arg == this.roomNumber) {
                this.roomText.destroy(true)
                this.amountAIText.destroy(true)
                this.amountPlayersText.destroy(true)
                this.totalPlayersText.destroy(true)
                this.buttonStartText.destroy(true)
                this.pestenText.destroy(true)
                this.buttonStart.destroy(true)
                this.addAIButtonText.destroy(true)
                this.removeAIButtonText.destroy(true)
                this.addAIButton.destroy(true)
                this.removeAIButton.destroy(true)
                this.UIHandlerGame.buildUI()
            }
        }, this)
        
    }


}