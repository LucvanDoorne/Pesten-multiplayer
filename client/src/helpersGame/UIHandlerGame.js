export default class UIHandler {
    constructor(scene) {

        /*this.buildBackground = () => {
            scene.background = scene.add.image(640,360,'background')
            scene.background.scale = 0.34
        }*/

        this.buildRest = () => {
            //maakt de tafel
            scene.table = scene.add.image(170, 170, 'Table')
            scene.table.scale = 0.5
            scene.table.depth = 3

            //laadt de pakstapel afbeelding alvast in
            scene.backcard = scene.add.image(730, 290, 'backcard')
            scene.backcard.scale = 0.2

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

            // laad de stoelen alvast in
            scene.stoel1 = scene.add.sprite(-1000, -1000, 'chair')
            scene.stoel3 = scene.add.sprite(-1000, -1000, 'chair')
            scene.stoel4 = scene.add.sprite(-1000, -1000, 'chair')
            scene.stoel2 = scene.add.sprite(-1000, -1000, 'chair')
            scene.aantalKaarten1 = scene.add.text(-1000, -1000, '1', {font: '25px'})
            scene.aantalKaarten2 = scene.add.text(-1000, -1000, '1', {font: '25px'})
            scene.aantalKaarten3 = scene.add.text(-1000, -1000, '1', {font: '25px'})
            scene.aantalKaarten4 = scene.add.text(-1000, -1000, '1', {font: '25px'})
            scene.speelrichtingImage = scene.add.image(-1000, -1000, 'Beurt-ricthing')
            scene.soortImage = scene.add.image(-1000, -1000, 'klaver')
            scene.soortText = scene.add.text(-1000, -1000, 'rico', { font: '25px Arial'})

            //laad de gespeelde/geselecteerde kaart en het deck alvast in
            scene.gespeeldeKaartImage = scene.add.image(-1000, -1000 , 'joker')
            scene.geselecteerdeKaartImage = scene.add.image(-1000, -1000, 'joker')
            scene.deck = ''

            //laad alle knoppen alvast in
            scene.buttonPass = scene.add.sprite(-1000, -1000, 'button')
            scene.passText = scene.add.text(-1000, -1000, 'PASS', { font: '40px Arial'})
            scene.buttonPlay = scene.add.sprite(-1000, -1000, 'button')
            scene.playText = scene.add.text(-1000, -1000, 'PASS', { font: '40px Arial'})
            scene.buttonPenalty = scene.add.sprite(-1000, -1000, 'button')
            scene.penaltyText = scene.add.text(-1000, -1000, 'CARDS TO GRAB: ', { font: '40px Arial'})
            scene.takePenaltyText = scene.add.text(-1000, -1000, 'TAKE CARDS', { font: '40px Arial'})
        }
 
        this.buildUI = () => {
            //this.buildBackground()
            this.buildRest()
        }
    }
}