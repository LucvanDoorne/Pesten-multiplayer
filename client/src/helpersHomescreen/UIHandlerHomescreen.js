export default class UIHandler {
    constructor(scene) {
        this.amountAI = 0
        this.buildBackground = () => {
            scene.background = scene.add.image(640,360, 'background')
            scene.background.scale = 0.34
            //full screen button
            scene.fullscreen = scene.add.image(1264, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive()
            scene.fullscreen.on('pointerup', function(event) {
                if (scene.scale.isFullscreen) {
                    scene.fullscreen.setFrame(0)
                    scene.scale.stopFullscreen()
                }else {
                    scene.fullscreen.setFrame(1)
                    scene.scale.startFullscreen()
                }
            })
        }

        this.buildButtons = () => {
            scene.buttonStart = scene.add.sprite(320, 500, 'button').setInteractive()
            scene.buttonStart.scale = 0.5
            scene.addAIButton = scene.add.sprite(960, 400, 'button').setInteractive()
            scene.addAIButton.scale = 0.5
            scene.buttonStartText = scene.add.text(173, 480, 'START GAME', {font: '45px Arial'})
            scene.addAIButtonText = scene.add.text(885, 380, 'ADD AI', {font: '45px Arial'})
            scene.removeAIButton = scene.add.sprite(960, 600, 'button').setInteractive()
            scene.removeAIButton.scale = 0.5
            scene.removeAIButtonText = scene.add.text(835, 580, 'REMOVE AI', {font: '45px Arial'})
        }


        this.AIText = () => {
            scene.amountAIText = scene.add.text(820, 220, 'Amount of AI: ' + this.amountAI, {font: '35px Arial'})
        }

        this.amountPlayerText = () => {
            scene.amountPlayersText = scene.add.text(70, 350, 'Amount of humans connected: ', {font: '35px Arial'})
            scene.totalPlayersText = scene.add.text(185, 220, 'Total players: ', {font: '35px Arial'})

        }
        
        this.buildUI = () => {
            this.buildBackground()
            this.buildButtons()
            this.AIText()
            this.amountPlayerText()
        }
    }
}
