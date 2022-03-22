export default class SocketHandler {
    constructor(scene) {
        scene.pointer = scene.input.activePointer
        scene.aantalSpelers
        scene.myTurn = false
        scene.stoel1 = ''
        scene.stoel3 = ''
        scene.stoel4 = ''
        scene.playerNumber 
        scene.buttonKiezenHarten = ''

        scene.roomNumber = ''
        scene.socket.on('roomNumber', (arg1, arg2) => {
            if (scene.socket.id == arg2) {
                scene.roomNumber = arg1
            }
        }) 

        scene.socket.on('disconnect', () => {
            console.log('disconnected...')
        })


        scene.socket.on('winnaar', (arg1, arg2) => {
            if (arg2 == scene.socket.id) {
                scene.roomNumber = ''
                scene.stoel1.destroy(true)
                scene.stoel2.destroy(true)
                scene.stoel3.destroy(true)
                scene.stoel4.destroy(true)
                scene.table.destroy(true)
                scene.backcard.destroy(true)
                scene.aantalKaarten1.destroy(true)
                scene.aantalKaarten2.destroy(true)
                scene.aantalKaarten3.destroy(true)
                scene.aantalKaarten4.destroy(true)
                scene.speelrichtingImage.destroy(true)
                scene.soortImage.destroy(true)
                scene.soortText.destroy(true)
                scene.geselecteerdeKaartImage.destroy(true)
                scene.gespeeldeKaartImage.destroy(true)
                scene.buttonPass.destroy(true)
                scene.passText.destroy(true)
                scene.backcard.destroy(true)
                scene.soortImage.destroy(true)
                scene.deck.destroy(true)
                if (arg1 == 1) {
                    scene.winnaarText = scene.add.text(58, 330, 'Congratulations, you have won the game!', {font: '60px Arial'})
                }else if (arg1 == 2){
                    scene.winnaarText = scene.add.text(100, 330, 'Congratulations, you came in second!', {font: '60px Arial'})
                }
                else if (arg1 == 3){
                    scene.winnaarText = scene.add.text(105, 330, 'Congratulations, you came in third!', {font: '60px Arial'})
                }
                scene.background.depth = 1000
                scene.fullscreen.depth = 1001
                scene.winnaarText.depth = 1004
                //scene.socket.emit('forceDisconnect')
                scene.buttonJoinNewGame = scene.add.sprite(640, 500, 'button').setInteractive()
                scene.buttonJoinNewGame.scale = 0.5
                scene.buttonJoinNewGame.depth = 1003

                scene.joinButtonText = scene.add.text(520, 485, 'JOIN NEW LOBBY', {font: '30px Arial'})
                scene.joinButtonText.depth = 1004
                scene.buttonJoinNewGame.on('pointerout', function(event){
                    scene.buttonJoinNewGame.setFrame(0)
                })
                scene.buttonJoinNewGame.on('pointerdown', function(event) {
                    if (scene.pointer.leftButtonDown()){
                        scene.buttonJoinNewGame.setFrame(1)
                    }
                })
                scene.buttonJoinNewGame.on('pointerup', function(event){
                    if (scene.pointer.leftButtonReleased()) {
                        scene.socket.emit('restart')
                    }
                })
            }
        })

        scene.socket.on('verliezer', (arg) => {
            if (arg == scene.socket.id) {
                scene.roomNumber = ''
                scene.stoel1.destroy(true)
                scene.stoel2.destroy(true)
                scene.stoel3.destroy(true)
                scene.stoel4.destroy(true)
                scene.table.destroy(true)
                scene.backcard.destroy(true)
                scene.aantalKaarten1.destroy(true)
                scene.aantalKaarten2.destroy(true)
                scene.aantalKaarten3.destroy(true)
                scene.aantalKaarten4.destroy(true)
                scene.speelrichtingImage.destroy(true)
                scene.soortImage.destroy(true)
                scene.soortText.destroy(true)
                scene.geselecteerdeKaartImage.destroy(true)
                scene.gespeeldeKaartImage.destroy(true)
                scene.buttonPass.destroy(true)
                scene.passText.destroy(true)
                scene.backcard.destroy(true)
                scene.soortImage.destroy(true)
                scene.deck.destroy(true)
                scene.winnaarText = scene.add.text(30, 330, 'You lost. LLLLL, NOOOOOOB, LOSER, BAD.', {font: '60px Arial'})
                scene.winnaarText.depth = 2
                scene.winnaarText.depth = 1004
                //scene.socket.emit('forceDisconnect')
                scene.buttonJoinNewGame = scene.add.sprite(640, 500, 'button').setInteractive()
                scene.buttonJoinNewGame.scale = 0.5
                scene.joinButtonText = scene.add.text(520, 485, 'JOIN NEW LOBBY', {font: '30px Arial'})
                scene.joinButtonText.depth = 1004
                scene.buttonJoinNewGame.depth = 1003
                scene.background.depth = 1000
                scene.fullscreen.depth = 1001
                scene.buttonJoinNewGame.on('pointerout', function(event){
                    scene.buttonJoinNewGame.setFrame(0)
                })
                scene.buttonJoinNewGame.on('pointerdown', function(event) {
                    if (scene.pointer.leftButtonDown()){
                        scene.buttonJoinNewGame.setFrame(1)
                    }
                })
                scene.buttonJoinNewGame.on('pointerup', function(event){
                    if (scene.pointer.leftButtonReleased()) {
                        scene.socket.emit('restart')
                    }
                })
            }
        })

        // zorgt dat alles wordt geüpdate als de server dit wilt
        scene.socket.on('kaarten', (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) => {
            if (arg10 == scene.roomNumber) {
                scene.passText.destroy(true)
                scene.buttonPass.destroy(true)
                scene.gespeeldeKaartImage.destroy(true)
                scene.soortImage.destroy(true)
                scene.soortText.destroy(true)

                if (scene.buttonKiezenHarten != '') {
                    scene.buttonKiezenHarten.destroy(true)
                    scene.buttonKiezenKlaver.destroy(true)
                    scene.buttonKiezenRuiten.destroy(true)
                    scene.buttonKiezenSchoppen.destroy(true)
                    scene.keuzeText.destroy(true)
                }

                if (scene.deck != '') {
                    scene.deck.destroy(true)
                }
                scene.pass = arg9
                scene.spelrichting = arg7
                scene.aantalSpelers = arg6
                scene.deck = scene.add.group()
                scene.gespeeldeKaart = arg2
                scene.gespeeldeKaartImage = scene.add.image(540, 290, scene.gespeeldeKaart['kaart'])
                scene.gespeeldeKaartImage.scale = 0.2
                scene.decks = arg1
                scene.players = arg4
                scene.beurt = arg3
                scene.penalty = arg5
                scene.geselecteerdeKaart = arg8[0]
                scene.soort = arg11

                
                // laat zien welke soort het is als er een boer of joker is opgelegd
                if (scene.gespeeldeKaart['soort'] != scene.soort){
                    if (scene.soort != 'special') {
                        scene.soortText = scene.add.text(510, 95, 'SORT: ', { font: '40px Arial'})
                        if (scene.soort == 'harten') {
                            scene.soortImage = scene.add.image(710, 115, 'Hart')
                        }else if (scene.soort == 'klaveren') {
                            scene.soortImage = scene.add.image(710, 115, 'Klaver')
                        }else if (scene.soort == 'ruiten') {
                            scene.soortImage = scene.add.image(710, 115, 'Ruit')
                        }else if (scene.soort == 'schoppen') {
                            scene.soortImage = scene.add.image(710, 115, 'Schop')
                        }
                        scene.soortImage.scale = 0.15
                    }
                }

                //maakt de backcard afbeelding aan
                scene.backcard.destroy(true)
                scene.backcard = scene.add.image(730, 290, 'backcard').setInteractive()
                scene.backcard.scale = 0.2
                scene.backcard.on('pointerup', function(event) {
                    if (scene.pointer.leftButtonReleased() && scene.myTurn == true && scene.penalty == 0) {
                        scene.buttonPass.destroy(true)
                        scene.passText.destroy(true)
                        if (scene.geselecteerdeKaart != undefined) {
                            scene.buttonPlay.destroy(true)
                            scene.playText.destroy(true)
                            scene.geselecteerdeKaartImage.destroy(true)
                        }
                        if (scene.penalty > 0) {
                            scene.takePenaltyText.destroy(true)
                            scene.buttonPenalty.destroy(true)
                            scene.penaltyText.destroy(true)
                        }
                        scene.socket.emit('pass', scene.roomNumber)
                    }
                })

                // maakt de geselecteerde kaart aan, met de play button
                if (scene.geselecteerdeKaart != undefined && scene.myTurn == true) {
                    scene.geselecteerdeKaartImage.destroy(true)
                    scene.playText.destroy(true)
                    scene.buttonPlay.destroy(true)
                    scene.geselecteerdeKaartImage = scene.add.sprite(920, 290, scene.geselecteerdeKaart['kaart']).setInteractive()
                    scene.geselecteerdeKaartImage.scale = 0.2
                    for (var i = 0; i < scene.decks[scene.beurt - 1].length; i++) {
                        if (scene.decks[scene.beurt - 1][i] == scene.geselecteerdeKaart) {
                            scene.decks[scene.beurt - 1].splice(i, 1)
                        }
                    }
                    scene.buttonPlay = scene.add.sprite(1100, 600, 'button').setInteractive()
                    scene.buttonPlay.scale = 0.3
                    scene.buttonPlay.depth = 1
                    scene.playText = scene.add.text(1015, 585, 'PLAY CARD', { font: '30px Arial'})
                    scene.playText.depth = 2
                }

                //zorgt dat de geselecteerde kaart weer terug gaat als er op geklikt wordt
                scene.geselecteerdeKaartImage.on('pointerup', function(event) {
                    if (scene.pointer.leftButtonReleased() && scene.pass == false){
                        scene.geselecteerdeKaartImage.destroy(true)
                        scene.playText.destroy(true)
                        scene.buttonPlay.destroy(true)
                        scene.socket.emit('geselecteerdeKaartTerug', scene.roomNumber)
                    }
                })

                // zorgt ervoor dat de kaart gespeeld wordt (als dat kan)
                scene.buttonPlay.on('pointerdown', function(event) {
                    if (scene.pointer.leftButtonDown()){
                        scene.buttonPlay.setFrame(1) 
                    } 
                    
                })
        
                scene.buttonPlay.on('pointerup', function(event) {
                    if (scene.pointer.leftButtonReleased()){
                        scene.buttonPlay.destroy(true)
                        scene.playText.destroy(true)
                        scene.geselecteerdeKaartImage.destroy(true)
                        scene.passText.destroy(true)
                        scene.buttonPass.destroy(true)
                        scene.socket.emit('cardPlayed', scene.roomNumber)
                        if (scene.penalty > 0) {
                            scene.takePenaltyText.destroy(true)
                            scene.penaltyText.destroy(true)
                            scene.buttonPenalty.destroy(true)
                        }
                    }
                })
        
                scene.buttonPlay.on('pointerout', function(event) {
                    scene.buttonPlay.setFrame(0)
                })

                // zorgt dat elke speler zijn spelersnummer krijgt
                for (var i = 0; i < scene.aantalSpelers; i++) {
                    if (scene.players[i] == scene.socket.id) {
                        scene.playerNumber = i + 1
                    }
                }

                // maakt de decks aan
                for (var i = 0; i < scene.decks[scene.playerNumber - 1].length; i++) {
                    scene.deck.create(640 - scene.decks[scene.playerNumber - 1].length*20 + 20 + i*40, 600, scene.decks[scene.playerNumber - 1][i]['kaart'])
                }

                // zorgt dat de kaart omhoog gaat wanneer er overheen wordt gegaan door de muis
                scene.deck.children.iterate((child) => {
                    child.setScale(0.2, 0.2)
                    child.setInteractive()
                    child.on('pointerover', function(pointer, x, y) {
                        child.y = 550
                    })
                        
                    child.on('pointerout', function(pointer, x, y) {
                        child.y = 600
                    })

                    //maakt de geselecteerde kaart aan
                    child.on('pointerup', function(pointer) {
                        if ((scene.pointer.leftButtonReleased() && scene.soort != 'special' && scene.myTurn == true && scene.pass == false) || (scene.pointer.leftButtonReleased() && scene.gespeeldeKaart['trueNumber'] == 0 && scene.myTurn == true && scene.pass == false && scene.penalty > 0) || (scene.pointer.leftButtonReleased() && scene.gespeeldeKaart['trueNumber'] == 2 && scene.myTurn == true && scene.pass == false && scene.penalty > 0)){
                            scene.index
                            for (var i = 0; i < scene.decks[scene.playerNumber - 1].length; i++) {
                                if (scene.decks[scene.playerNumber - 1][i]['kaart'] == child.texture.key) {
                                    scene.index = i
                                }
                            }  
                            scene.socket.emit('geselecteerdeKaart', scene.index, scene.roomNumber)                    
                        }
                    })
                    
                })

                // regelt dat de beurt werkt
                if (scene.beurt == scene.playerNumber) {
                    scene.myTurn = true
                }
                if (scene.beurt != scene.playerNumber) {
                    scene.myTurn = false
                }

                //maakt een knop aan om de soort te kiezen bij boer / joker
                if (scene.soort == 'special' && scene.penalty < 1 && scene.myTurn == true) {
                    scene.keuzeText = scene.add.text(890, 100, 'CHOOSE CARD TYPE:', {font: '25px Arial'})
                    //klaver
                    scene.keuze
                    scene.buttonKiezenKlaver = scene.add.sprite(1100, 220, 'Klaver').setInteractive()
                    scene.buttonKiezenKlaver.scale = 0.3
                    scene.buttonKiezenKlaver.depth = 10
                    scene.buttonKiezenKlaver.on('pointerup', function(event) {
                        if (scene.pointer.leftButtonReleased()){
                            scene.buttonKiezenHarten.destroy(true)
                            scene.buttonKiezenKlaver.destroy(true)
                            scene.buttonKiezenRuiten.destroy(true)
                            scene.buttonKiezenSchoppen.destroy(true)
                            scene.buttonKiezenHarten = ''
                            scene.keuzeText.destroy(true)
                            scene.keuze = 'klaveren'
                            scene.socket.emit('keuzeSoort', scene.roomNumber, scene.keuze)
                        }
                    })

                    //ruiten
                    scene.buttonKiezenRuiten = scene.add.sprite(1100, 370, 'Ruit').setInteractive()
                    scene.buttonKiezenRuiten.scale = 0.3
                    scene.buttonKiezenRuiten.depth = 1
                    scene.buttonKiezenRuiten.on('pointerup', function(event) {
                        if (scene.pointer.leftButtonReleased()){
                            scene.buttonKiezenHarten.destroy(true)
                            scene.buttonKiezenKlaver.destroy(true)
                            scene.buttonKiezenRuiten.destroy(true)
                            scene.buttonKiezenSchoppen.destroy(true)
                            scene.buttonKiezenHarten = ''
                            scene.keuzeText.destroy(true)
                            scene.keuze = 'ruiten'
                            scene.socket.emit('keuzeSoort', scene.roomNumber, scene.keuze)
                        }
                    })

                    //schoppen
                    scene.buttonKiezenSchoppen = scene.add.sprite(950, 370, 'Schop').setInteractive()
                    scene.buttonKiezenSchoppen.scale = 0.3
                    scene.buttonKiezenSchoppen.depth = 1
                    scene.buttonKiezenSchoppen.on('pointerup', function(event) {
                        if (scene.pointer.leftButtonReleased()){
                            scene.buttonKiezenHarten.destroy(true)
                            scene.buttonKiezenKlaver.destroy(true)
                            scene.buttonKiezenRuiten.destroy(true)
                            scene.buttonKiezenSchoppen.destroy(true)
                            scene.buttonKiezenHarten = ''
                            scene.keuzeText.destroy(true)
                            scene.keuze = 'schoppen'
                            scene.socket.emit('keuzeSoort', scene.roomNumber, scene.keuze)
                        }
                    })

                    //harten
                    scene.buttonKiezenHarten = scene.add.sprite(950, 220, 'Hart').setInteractive()
                    scene.buttonKiezenHarten.scale = 0.3
                    scene.buttonKiezenHarten.depth = 1
                    scene.buttonKiezenHarten.on('pointerup', function(event) {
                        if (scene.pointer.leftButtonReleased()){
                            scene.buttonKiezenHarten.destroy(true)
                            scene.buttonKiezenKlaver.destroy(true)
                            scene.buttonKiezenRuiten.destroy(true)
                            scene.buttonKiezenSchoppen.destroy(true)
                            scene.buttonKiezenHarten = ''
                            scene.keuzeText.destroy(true)
                            scene.keuze = 'harten'
                            scene.socket.emit('keuzeSoort', scene.roomNumber, scene.keuze)
                        }
                    })

                }            

                // zorgt ervoor dat de 'pass' knop zichtbaar is wanneer het jouw beurt is
                console.log(scene.penalty)
                if (scene.myTurn == true && scene.penalty < 1 && scene.soort != 'special') {
                    scene.buttonPass.destroy(true)
                    scene.passText.destroy(true)
                    scene.buttonPass = scene.add.sprite(170, 600, 'button').setInteractive()
                    scene.buttonPass.scale = 0.3
                    scene.buttonPass.depth = 1
                    scene.passText = scene.add.text(117, 580, 'PASS', { font: '40px Arial'})
                    scene.passText.depth = 2
                }

                // zorgt ervoor dat je een kaart krijgt als je op de pass knop drukt
                scene.buttonPass.on('pointerdown', function(event) {
                    if (scene.pointer.leftButtonDown()) {
                        scene.buttonPass.setFrame(1)
                    }
                })
                scene.buttonPass.on('pointerup', function(event) {
                    if (scene.pointer.leftButtonReleased()) {
                        scene.buttonPass.destroy(true)
                        scene.passText.destroy(true)
                        if (scene.geselecteerdeKaart != undefined) {
                            scene.buttonPlay.destroy(true)
                            scene.playText.destroy(true)
                            scene.geselecteerdeKaartImage.destroy(true)
                        }
                        if (scene.penalty > 0) {
                            scene.takePenaltyText.destroy(true)
                            scene.buttonPenalty.destroy(true)
                            scene.penaltyText.destroy(true)
                        }
                        scene.socket.emit('pass', scene.roomNumber)
                    }
                })
                scene.buttonPass.on('pointerout', function(event) {
                    scene.buttonPass.setFrame(0)
                })

                // maakt de penalty knop aan
                if (scene.myTurn == true && scene.penalty > 0) {
                    scene.buttonPenalty.destroy(true)
                    scene.penaltyText.destroy(true)
                    scene.takePenaltyText.destroy(true)
                    scene.buttonPenalty = scene.add.sprite(170, 600, 'button').setInteractive()
                    scene.buttonPenalty.scale = 0.3
                    scene.buttonPenalty.depth = 1
                    scene.penaltyText = scene.add.text(455, 35, 'CARDS TO GRAB: ' + scene.penalty, { font: '40px Arial'})
                    scene.penaltyText.depth = 2
                    if (scene.penalty == 1) {
                        scene.takePenaltyText = scene.add.text(88, 586, 'GRAB CARD', { font: '26px Arial'})
                    }else {
                        scene.takePenaltyText = scene.add.text(86, 586, 'GRAB CARDS', { font: '26px Arial'})
                    }
                    scene.takePenaltyText.depth = 2

                    // zorgt ervoor dat de persoon de kaarten krijgt als er op de knop wordt gedrukt
                    scene.buttonPenalty.on('pointerdown', function(event) {
                        if (scene.pointer.leftButtonDown()) {
                            scene.buttonPenalty.setFrame(1)
                        }
                    })
                    scene.buttonPenalty.on('pointerup', function(event) {
                        if (scene.pointer.leftButtonReleased()) {
                            scene.buttonPenalty.destroy(true)
                            scene.penaltyText.destroy(true)
                            scene.takePenaltyText.destroy(true)
                            scene.socket.emit('grabCards', scene.roomNumber)
                            if (scene.geselecteerdeKaart != undefined) {
                                scene.playText.destroy(true)
                                scene.buttonPlay.destroy(true)
                                scene.geselecteerdeKaartImage.destroy(true)
                            }
                        }
                    })
                    scene.buttonPass.on('pointerout', function(event) {
                        scene.buttonPenalty.setFrame(0)
                    })

                }

                // regelt dat de stoelen en aantal kaarten tevoorschijn komen
                scene.amountCards = []
                for (var i = 0; i < scene.aantalSpelers; i++) {
                    scene.amountCards[i] = scene.decks[i].length
                }
                if (scene.geselecteerdeKaart != undefined) {
                    scene.amountCards[scene.beurt - 1]++
                }
                scene.stoel1.destroy(true)
                scene.stoel2.destroy(true)
                scene.aantalKaarten1.destroy(true)
                scene.aantalKaarten2.destroy(true)
                scene.speelrichtingImage.destroy(true)
                scene.stoel3.destroy(true)
                scene.aantalKaarten3.destroy(true)
                scene.stoel4.destroy(true)
                scene.aantalKaarten4.destroy(true)
                if (scene.aantalSpelers == 2){
                    scene.stoel1 = scene.add.sprite(170, 38, 'chair')
                    scene.stoel1.scale = 0.17
                    scene.stoel2 = scene.add.sprite(170, 302, 'chair')
                    scene.stoel2.scale = 0.17
                    scene.stoel2.angle = 180
                    if (scene.playerNumber == 1) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(157.5, 220, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(164, 220, scene.amountCards[1], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 2) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(157.5, 220, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(164, 220, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }
                    }
                    scene.aantalKaarten1.depth = 4
                    scene.aantalKaarten2.depth = 4
                }else if (scene.aantalSpelers == 3) {
                    scene.stoel1 = scene.add.sprite(170, 38, 'chair')
                    scene.stoel1.scale = 0.17
                    scene.stoel3 = scene.add.sprite(60, 250, 'chair')
                    scene.stoel3.scale = 0.17
                    scene.stoel3.rotation = 4.19
                    scene.stoel2 = scene.add.sprite(277, 250, 'chair')
                    scene.stoel2.scale = 0.17
                    scene.stoel2.rotation = 2.09
                    scene.stoel2.depth = 10
                    if (scene.playerNumber == 1) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(212.5, 197.5, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(215, 200, scene.amountCards[1], {font: '25px Arial'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(107.5, 197.5, scene.amountCards[2], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(110, 200, scene.amountCards[2], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 2) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(212.5, 197.5, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(215, 200, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(107.5, 197.5, scene.amountCards[2], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(110, 200, scene.amountCards[2], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 3) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(212.5, 197.5, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(215, 200, scene.amountCards[1], {font: '25px Arial'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(107.5, 197.5, scene.amountCards[2], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(110, 200, scene.amountCards[2], {font: '25px Arial', color: '#00FF00'})
                        }
                    }
                    scene.aantalKaarten1.depth = 4
                    scene.aantalKaarten2.depth = 4
                    scene.aantalKaarten3.depth = 4
                }else if (scene.aantalSpelers == 4) {
                    scene.stoel1 = scene.add.sprite(170, 38, 'chair')
                    scene.stoel1.scale = 0.17
                    scene.stoel3 = scene.add.sprite(170, 302, 'chair')
                    scene.stoel3.scale = 0.17
                    scene.stoel3.angle = 180
                    scene.stoel4 = scene.add.sprite(38, 170, 'chair')
                    scene.stoel4.scale = 0.17
                    scene.stoel4.angle = 270
                    scene.stoel2 = scene.add.sprite(302, 170, 'chair')
                    scene.stoel2.scale = 0.17
                    scene.stoel2.angle = 90
                    scene.stoel3.depth = 100
                    if (scene.playerNumber == 1) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(227, 154, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(230, 154, scene.amountCards[1], {font: '25px Arial'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(157.5, 220, scene.amountCards[2], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(164, 220, scene.amountCards[2], {font: '25px Arial'})
                        }
                        if (scene.amountCards[3] > 9){
                            scene.aantalKaarten4 = scene.add.text(93, 154, scene.amountCards[3], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten4 = scene.add.text(90, 154, scene.amountCards[3], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 2) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(227, 154, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(230, 154, scene.amountCards[1], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(157.5, 220, scene.amountCards[2], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(164, 220, scene.amountCards[2], {font: '25px Arial'})
                        }
                        if (scene.amountCards[3] > 9){
                            scene.aantalKaarten4 = scene.add.text(93, 154, scene.amountCards[3], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten4 = scene.add.text(90, 154, scene.amountCards[3], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 3) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(227, 154, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(230, 154, scene.amountCards[1], {font: '25px Arial'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(157.5, 220, scene.amountCards[2], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(164, 220, scene.amountCards[2], {font: '25px Arial', color: '#00FF00'})
                        }
                        if (scene.amountCards[3] > 9){
                            scene.aantalKaarten4 = scene.add.text(93, 154, scene.amountCards[3], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten4 = scene.add.text(90, 154, scene.amountCards[3], {font: '25px Arial'})
                        }
                    }
                    if (scene.playerNumber == 4) {
                        if (scene.amountCards[0] > 9) {
                            scene.aantalKaarten1 = scene.add.text(157.5, 90, scene.amountCards[0], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten1 = scene.add.text(164, 90, scene.amountCards[0], {font: '25px Arial'})
                        }
                        if (scene.amountCards[1] > 9){
                            scene.aantalKaarten2 = scene.add.text(227, 154, scene.amountCards[1], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten2 = scene.add.text(230, 154, scene.amountCards[1], {font: '25px Arial'})
                        }
                        if (scene.amountCards[2] > 9){
                            scene.aantalKaarten3 = scene.add.text(157.5, 220, scene.amountCards[2], {font: '25px Arial'})
                        }else {
                            scene.aantalKaarten3 = scene.add.text(164, 220, scene.amountCards[2], {font: '25px Arial'})
                        }
                        if (scene.amountCards[3] > 9){
                            scene.aantalKaarten4 = scene.add.text(93, 154, scene.amountCards[3], {font: '25px Arial', color: '#00FF00'})
                        }else {
                            scene.aantalKaarten4 = scene.add.text(90, 154, scene.amountCards[3], {font: '25px Arial', color: '#00FF00'})
                        }
                    }
                    scene.aantalKaarten1.depth = 4
                    scene.aantalKaarten2.depth = 4
                    scene.aantalKaarten3.depth = 4
                    scene.aantalKaarten4.depth = 4  
                }
                // zorgt ervoor dat de stoel een andere kleur wordt als de beurt wordt veranderd
                if (scene.beurt == 1){
                    scene.stoel1.setFrame(1)
                }else if (scene.beurt == 2) {
                    scene.stoel2.setFrame(1)
                }
                else if (scene.beurt == 3) {
                    scene.stoel3.setFrame(1)
                }
                else if (scene.beurt == 4) {
                    scene.stoel4.setFrame(1)
                }
                
                //zorgt voor de pijl die de beurtrichting aangeeft
                if (scene.aantalSpelers > 2) {
                    scene.speelrichtingImage = scene.add.image(160, 370, 'Beurt-richting')
                    scene.speelrichtingImage.scale = 0.5
                    scene.speelrichtingImage.depth = 5
                    if (scene.spelrichting == 1){
                        scene.speelrichtingImage.flipX = false
                        scene.speelrichtingImage.rotation = 4.7
                        scene.speelrichtingImage.x = 160
                    }else if (scene.spelrichting == -1) {
                        scene.speelrichtingImage.rotation = 1.57
                        scene.speelrichtingImage.x = 177
                        scene.speelrichtingImage.flipX = true
                    }
                }
            }
            
        })
            
        }
}



