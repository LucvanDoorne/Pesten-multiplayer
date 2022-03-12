const server = require('express')()
const http = require('http').createServer(server)
const cors = require('cors')
const path = require('path')
var connect = require('connect')
const serveStatic = require('serve-static')
const shuffle = require('shuffle-array')
var st = require('st')

var roomNumber
var index
var gameState = []
var AIamount = []
var amountPlayers = []
var totalPlayers = []
var kaarten = [
    { kaart: 'aas harten', soort: 'harten', trueNumber: 1, number: 0 },
    { kaart: '2 harten', soort: 'harten', trueNumber: 2, number: 1 },
    { kaart: '3 harten', soort: 'harten', trueNumber: 3, number: 2 },
    { kaart: '4 harten', soort: 'harten', trueNumber: 4, number: 3 },
    { kaart: '5 harten', soort: 'harten', trueNumber: 5, number: 4 },
    { kaart: '6 harten', soort: 'harten', trueNumber: 6, number: 5 },
    { kaart: '7 harten', soort: 'harten', trueNumber: 7, number: 6 },
    { kaart: '8 harten', soort: 'harten', trueNumber: 8, number: 7 },
    { kaart: '9 harten', soort: 'harten', trueNumber: 9, number: 8 },
    { kaart: '10 harten', soort: 'harten', trueNumber: 10, number: 9 },
    { kaart: 'koning harten', soort: 'harten', trueNumber: 11, number: 10 },
    { kaart: 'koningin harten', soort: 'harten', trueNumber: 12, number: 11 },
    { kaart: 'aas ruiten', soort: 'ruiten', trueNumber: 1, number: 12 },
    { kaart: '2 ruiten', soort: 'ruiten', trueNumber: 2, number: 13 },
    { kaart: '3 ruiten', soort: 'ruiten', trueNumber: 3, number: 14 },
    { kaart: '4 ruiten', soort: 'ruiten', trueNumber: 4, number: 15 },
    { kaart: '5 ruiten', soort: 'ruiten', trueNumber: 5, number: 16 },
    { kaart: '6 ruiten', soort: 'ruiten', trueNumber: 6, number: 17 },
    { kaart: '7 ruiten', soort: 'ruiten', trueNumber: 7, number: 18 },
    { kaart: '8 ruiten', soort: 'ruiten', trueNumber: 8, number: 19 },
    { kaart: '9 ruiten', soort: 'ruiten', trueNumber: 9, number: 20 },
    { kaart: '10 ruiten', soort: 'ruiten', trueNumber: 10, number: 21 },
    { kaart: 'koning ruiten', soort: 'ruiten', trueNumber: 11, number: 22 },
    { kaart: 'koningin ruiten', soort: 'ruiten', trueNumber: 12, number: 23 },
    { kaart: 'aas schoppen', soort: 'schoppen', trueNumber: 1,  number: 24 },
    { kaart: '2 schoppen', soort: 'schoppen', trueNumber: 2, number: 25 },
    { kaart: '3 schoppen', soort: 'schoppen', trueNumber: 3, number: 26 },
    { kaart: '4 schoppen', soort: 'schoppen', trueNumber: 4, number: 27 },
    { kaart: '5 schoppen', soort: 'schoppen', trueNumber: 5, number: 28 },
    { kaart: '6 schoppen', soort: 'schoppen', trueNumber: 6, number: 29 },
    { kaart: '7 schoppen', soort: 'schoppen', trueNumber: 7, number: 30 },
    { kaart: '8 schoppen', soort: 'schoppen', trueNumber: 8, number: 31 },
    { kaart: '9 schoppen', soort: 'schoppen', trueNumber: 9, number: 32 },
    { kaart: '10 schoppen', soort: 'schoppen', trueNumber: 10, number: 33 },
    { kaart: 'koning schoppen', soort: 'schoppen', trueNumber: 11,  number: 34 },
    { kaart: 'koningin schoppen', soort: 'schoppen', trueNumber: 12,  number: 35 },
    { kaart: 'aas klaveren', soort: 'klaveren', trueNumber: 1, number: 36 },
    { kaart: '2 klaveren', soort: 'klaveren', trueNumber: 2, number: 37 },
    { kaart: '3 klaveren', soort: 'klaveren', trueNumber: 3, number: 38 },
    { kaart: '4 klaveren', soort: 'klaveren', trueNumber: 4, number: 39 },
    { kaart: '5 klaveren', soort: 'klaveren', trueNumber: 5, number: 40 },
    { kaart: '6 klaveren', soort: 'klaveren', trueNumber: 6, number: 41 },
    { kaart: '7 klaveren', soort: 'klaveren', trueNumber: 7, number: 42 },
    { kaart: '8 klaveren', soort: 'klaveren', trueNumber: 8, number: 43 },
    { kaart: '9 klaveren', soort: 'klaveren', trueNumber: 9, number: 44 },
    { kaart: '10 klaveren', soort: 'klaveren', trueNumber: 10, number: 45 },
    { kaart: 'koning klaveren', soort: 'klaveren', trueNumber: 11, number: 46 },
    { kaart: 'koningin klaveren', soort: 'klaveren', trueNumber: 12, number: 47 },
    { kaart: 'boer harten', soort: 'special',  trueNumber: 13, number: 48 },
    { kaart: 'boer ruiten', soort: 'special',  trueNumber: 13, number: 49 },
    { kaart: 'boer schoppen', soort: 'special',  trueNumber: 13, number: 50 },
    { kaart: 'boer klaveren', soort: 'special',  trueNumber: 13, number: 51 },
    { kaart: 'joker 1',  soort: 'special',  trueNumber: 0, number: 52 },
    { kaart: 'joker 2',  soort: 'special',  trueNumber: 0, number: 53 }
  ]
var pakstapel = []
var players = []
var beurt = []
var spelrichting = []
var decks = []
var gespeeldeKaart = []
var penalty = []
var geselecteerdeKaart = []
var opgelegd = []
var positieWinnaar = []
var pass = []
var room = []
var users = []
var soortenGegooid = []
var soortGeselecteerdeKaart = []
var nummerGeselecteerdeKaart = []
var soortGespeeldeKaart = []
var nummerGespeeldeKaart = []

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080', 
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

server.use(cors())
server.use(serveStatic(__dirname + '/client/dist'))

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id)

    // maakt de room aan (als deze er nog niet was)
    socket.on('joinRoom', (arg) => {
        io.emit('roomNumber', arg, socket.id)
        var roomID
        for (var i = 0; i <= room.length; i++) {
            if (room[i] == arg) {
                roomID = i
            }else if (i == room.length && roomID == undefined) {
                room.push(arg)
                roomID = i
            }
        }

        users.push({'id': socket.id, 'roomid': arg})
        if (players.length <= roomID) {
            players.push([])
            gameState.push('waiting')
            AIamount.push(0)
            amountPlayers.push(0)
            totalPlayers.push(0)
            pakstapel.push(kaarten)
            beurt.push(1)
            spelrichting.push(1)
            decks.push([])
            gespeeldeKaart.push('')
            penalty.push(0)
            geselecteerdeKaart.push('')
            opgelegd.push(false)
            positieWinnaar.push(0)
            pass.push(false)
            soortGeselecteerdeKaart.push('')
            nummerGeselecteerdeKaart.push('')
            soortGespeeldeKaart.push('')
            nummerGespeeldeKaart.push('')
            soortenGegooid.push({'harten': 0, 'klaveren': 0, 'schoppen': 0, 'ruiten': 0, 'special': 0})
        }
        if (gameState[roomID] == 'started') {
            io.emit('lobbyFull', socket.id, 'already started...')
        }
        if (totalPlayers[roomID] > 3) {
            io.emit('lobbyFull', socket.id, 'full...')
            players[roomID].splice(4, 1)
        }

        if (totalPlayers[roomID] < 4 && gameState[roomID] != 'started') {
            players[roomID].push(socket.id)
            amountPlayers[roomID]++
            totalPlayers[roomID]++
        }

        if (gameState[roomID] == 'waiting'){
            io.emit('amountPlayers', amountPlayers[roomID], room[roomID])
            io.emit('AIamount', AIamount[roomID], room[roomID])
        }
    })


    //disconnect de winnaar / verliezer
    socket.on('forceDisconnect', function() {
        socket.disconnect()
    })

    //zorgt dat de speler opnieuw start
    socket.on('restart', () => {
        io.emit('restartGame', socket.id)
    })


    
    socket.on('startGame', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                geselecteerdeKaart[i] = ''
                // dit husselt de kaarten
                shuffle(pakstapel[i])
                // dit is de beginnende kaart (dit mag geen pestkaart zijn), dit maakt ook de pakstapel aan.
                var pestkaartIndex = 0
                while (pakstapel[i][0]['trueNumber'] == "1" || pakstapel[i][0]['trueNumber'] == "2" || pakstapel[i][0]['trueNumber'] == "7" || pakstapel[i][0]['trueNumber'] == "8" || pakstapel[i][0]['trueNumber'] == "0" || pakstapel[i][0]['trueNumber'] == "13"){
                    pestkaartIndex++
                }
                gespeeldeKaart[i] = pakstapel[i][pestkaartIndex]
                soortGespeeldeKaart[i] = gespeeldeKaart[i]['soort']
                nummerGespeeldeKaart[i] = gespeeldeKaart[i]['trueNumber']
                soortenGegooid[i][soortGespeeldeKaart[i]]++
                pakstapel[i].splice(pestkaartIndex, 1)
                for (var j = 0; j < totalPlayers[i]; j++){
                    decks[i].push(pakstapel[i].splice(0, 1))
                }
                gameState[i] = 'started'
                io.emit('beginGame', arg)
                socket.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])

            }
        }

        
    })
    

    // regelt dat de counter van AI / spelers omhoog / omlaag gaat als er op de knop wordt gedrukt
    socket.on('AIup', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                if (totalPlayers[i] < 4) {
                    AIamount[i]++
                    totalPlayers[i]++
                    players[i].push('AI' + AIamount[i], arg)
                    io.emit('AIamount', AIamount[i], arg)
                }
            }
        }
    })

    socket.on('AIdown', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                if (AIamount[i] > 0) {
                    for (var j = 0; j < players.length; j++) {
                        if (players[i][j] == 'AI' + AIamount) {
                            players[i].splice(j, 1)
                        }
                    }
                    AIamount[i]--
                    totalPlayers[i]--
                    io.emit('AIamount', AIamount[i], arg)
                }
            }
        }
        
    })



    //Game
    //zorgt dat er naar de client het aantal spelers wordt gestuurd


    

    socket.on('pass', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                pass[i] = true
                if (pakstapel[i].length < 1) {
                    socket.emit('gelijkspel', arg)
                }
                if (geselecteerdeKaart[i] != '') {
                    decks[i][beurt[i] - 1].push(geselecteerdeKaart[i][0])
                }
                geselecteerdeKaart[i] = ''
                geselecteerdeKaart[i] = pakstapel[i].splice(0, 1)
                soortGeselecteerdeKaart[i] = geselecteerdeKaart[i][0]['soort']
                nummerGeselecteerdeKaart[i] = geselecteerdeKaart[i][0]['trueNumber']
                console.log(geselecteerdeKaart[i])
                penalty[i] = 1
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }

    })

    socket.on('geselecteerdeKaart', (arg1, arg2) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg2) {
                if (geselecteerdeKaart[i] != '') {
                    decks[i][beurt[i] - 1].push(geselecteerdeKaart[i][0])
                }
                geselecteerdeKaart[i] = decks[i][beurt[i] - 1].splice(arg1, 1)
                soortGeselecteerdeKaart[i] = geselecteerdeKaart[i][0]['soort']
                nummerGeselecteerdeKaart[i] = geselecteerdeKaart[i][0]['trueNumber']
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg2, soortGespeeldeKaart[i])
            }
        }    
    })

    socket.on('geselecteerdeKaartTerug', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                decks[i][beurt - 1].push(geselecteerdeKaart[i][0])
                geselecteerdeKaart[i] = ''
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }
    })

    socket.on('cardPlayed', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                index = i
                roomNumber = arg
                checken()
                console.log(soortenGegooid[i])
                if (opgelegd[i] == true) {
                    opgelegd[i] = false
                    if (pass[i] == true) {
                        penalty[i]--
                        pass[i] = false
                    }
                }
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }

    })

    socket.on('grabCards', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                index = i
                if (geselecteerdeKaart[i] != '') {
                    decks[i][beurt[i] - 1].push(geselecteerdeKaart[i][0])
                    geselecteerdeKaart[i] = ''
                }
                if (pass[i] == false) {
                    for (var j = 0; j < penalty; j++) {
                        if (pakstapel[i].length < 1) {
                            socket.emit('gelijkspel', arg)
                        }
                        pakstapelKaart = pakstapel[i].splice(0, 1)
                        decks[i][beurt[i] - 1].push(pakstapelKaart[0])
                    }
                }
                pass[i] = false
                penalty[i] = 0
                if (gespeeldeKaart[i]['soort'] != 'special') {
                    beurtFunctie()
                }
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }
        
    })

    socket.on('keuzeSoort', (arg, arg2) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                index = i
                soortGespeeldeKaart[i] = arg2
                winnaar()
                beurtFunctie()
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }

    })

    socket.on('disconnect', () => {
        // zorgt ervoor dat de speler wordt verwijdert in het spel als hij disconnect
        for (var i = 0; i < users.length; i++){
            if (users[i]['id'] == socket.id) {
                for (var j = 0; j < room.length; j++) {
                    if (room[j] == users[i]['roomid']){
                        // zorgt dat het spel verder verloopt als de speler disconnect
                        if (beurt[j] == totalPlayers[j] && spelrichting[j] == 1) {
                            beurt[j] = 1
                        }else if (beurt[j] == totalPlayers[j] && spelrichting[j] == -1){
                            beurt[j] = totalPlayers[j] - 1
                        }
                        amountPlayers[j]--
                        totalPlayers[j]--
                        if (gameState[j] != 'started') {
                            io.emit('amountPlayers', amountPlayers[j], room[j])
                        }
                        for (var k = 0; k < players[j].length; k++) {
                            if (players[j][k] == socket.id) {
                                players[j].splice(k, 1)
                                if (gameState[j] == 'started') {
                                    for (var l = 0; l < decks[j][k].length; l++) {
                                        pakstapelKaart = decks[j][k].splice(0, 1)
                                        pakstapel[j].push(pakstapelKaart[0])
                                    }
                                    decks[j].splice(k, 1)
                                    io.emit('kaarten', decks[j], gespeeldeKaart[j], beurt[j], players[j], penalty[j], totalPlayers[j], spelrichting[j], geselecteerdeKaart[j], pass[j], room[j], soortGespeeldeKaart[i])
                                }
                            }
                        }
                        // zorgt dat de speler wint als er nog maar één speler in zit
                        if (totalPlayers[j] == 1 && gameState[j] == 'started') {
                            positieWinnaar[j]++
                            io.emit('winnaar', positieWinnaar[j], players[j][0], room[j])
                            players.splice(j, 1)
                            room.splice(j, 1) 
                            gameState.splice(j, 1)
                            AIamount.splice(j, 1)
                            amountPlayers.splice(j, 1)
                            totalPlayers.splice(j, 1)
                            pakstapel.splice(j, 1)
                            beurt.splice(j, 1)
                            spelrichting.splice(j, 1)
                            decks.splice(j, 1)
                            gespeeldeKaart.splice(j, 1)
                            penalty.splice(j, 1)
                            geselecteerdeKaart.splice(j, 1)
                            opgelegd.splice(j, 1)
                            positieWinnaar.splice(j, 1)
                            pass.splice(j, 1)
                            soortGeselecteerdeKaart.splice(j, 1)
                            nummerGeselecteerdeKaart.splice(j, 1)
                            soortGespeeldeKaart.splice(j, 1)
                            nummerGespeeldeKaart.splice(j, 1)
                            soortenGegooid.splice(j, 1)
                        }
                        // zorgt dat de room wordt verwijdert als er geen mensen meer inzitten
                        if (amountPlayers[j] == 0) {
                            players.splice(j, 1)
                            room.splice(j, 1) 
                            gameState.splice(j, 1)
                            AIamount.splice(j, 1)
                            amountPlayers.splice(j, 1)
                            totalPlayers.splice(j, 1)
                            pakstapel.splice(j, 1)
                            beurt.splice(j, 1)
                            spelrichting.splice(j, 1)
                            decks.splice(j, 1)
                            gespeeldeKaart.splice(j, 1)
                            penalty.splice(j, 1)
                            geselecteerdeKaart.splice(j, 1)
                            opgelegd.splice(j, 1)
                            positieWinnaar.splice(j, 1)
                            pass.splice(j, 1)
                            soortGeselecteerdeKaart.splice(j, 1)
                            nummerGeselecteerdeKaart.splice(j, 1)
                            soortGespeeldeKaart.splice(j, 1)
                            nummerGespeeldeKaart.splice(j, 1)
                            soortenGegooid.splice(j, 1)
                        }
                    }
                }
                users.splice(i, 1)
            }
        }
        console.log('A user disconnected: ' + socket.id)
    })


})


const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log(`Server started! Listening on ${http.address().port}`)
})

function beurtFunctie(){
    beurt[index] = beurt[index] + 1 * spelrichting[index]
    if (beurt[index] > totalPlayers[index]) {
        beurt[index] = 1
    }else if (beurt[index] < 1) {
        beurt[index] = totalPlayers[index]
    }
}

/*function boer() {
    console.log(index)
    console.log(gespeeldeKaart)
    if (gespeeldeKaart[index]['trueNumber'] == 13 || gespeeldeKaart[index]['trueNumber'] == 0) {
        gespeeldeKaart[index]['soort'] = 'special'
    }
}*/

function checken(){
    if (decks[index][beurt[index] - 1].length == 0) {
        if (soortGeselecteerdeKaart[index] != 'special' && nummerGeselecteerdeKaart[index] != 1  && nummerGeselecteerdeKaart[index] != 2  && nummerGeselecteerdeKaart[index] != 7  && nummerGeselecteerdeKaart[index] != 8 && penalty[index] < 1) {
            if (nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart || soortGespeeldeKaart[index] == soortGeselecteerdeKaart){ 
                //boer()
                pakstapel[index].push(gespeeldeKaart[index])
                gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                soortenGegooid[index][soortGespeeldeKaart[index]]++
                geselecteerdeKaart[index] = ''
                shuffle(pakstapel[index])
                opgelegd[index] = true
                winnaar()
                beurtFunctie()
            }    
        }else if (soortGeselecteerdeKaart[index] == 'special' || nummerGeselecteerdeKaart[index] == 1  || nummerGeselecteerdeKaart[index] == 2  || nummerGeselecteerdeKaart[index] == 7  || nummerGeselecteerdeKaart[index] == 8 || penalty[index] < 1) {
            if ((nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart[index] || soortGespeeldeKaart[index] == soortGeselecteerdeKaart[index] || soortGeselecteerdeKaart[index] == 'special') && penalty[index] < 1 ){
                for (var i = 0; i < 2; i++) {
                    var pakstapelKaart = pakstapel[index].splice(0, 1)
                    decks[index][beurt[index] - 1].push(pakstapelKaart[0])
                }
                if (nummerGeselecteerdeKaart[index] == 0) {
                    penalty[index] = penalty[index] + 5
                }
                if (nummerGeselecteerdeKaart[index] == 2) {
                    penalty[index] = penalty[index] + 2
                }
                if (nummerGeselecteerdeKaart[index] == 1) {
                    spelrichting[index] = spelrichting[index] * -1
                }
                if (nummerGeselecteerdeKaart[index] == 8) {
                    beurtFunctie()
                }
                if (nummerGeselecteerdeKaart[index] != 7 && nummerGeselecteerdeKaart[index] != 13) {
                    winnaar()
                    beurtFunctie()
                }

                //boer()
                pakstapel[index].push(gespeeldeKaart[index])
                gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                soortenGegooid[index][soortGespeeldeKaart[index]]++
                geselecteerdeKaart[index] = ''
                shuffle(pakstapel[index])
                opgelegd[index] = true
                
            }
        }else if (penalty[index] > 0 && nummerGespeeldeKaart[index] == 2 && nummerGeselecteerdeKaart[index] == 2 && pass[index] == false) {
                for (var i = 0; i < 2; i++) {
                    var pakstapelKaart = pakstapel[index].splice(0, 1)
                    decks[index][beurt[index] - 1].push(pakstapelKaart[0])
                }
                penalty[index] = penalty[index] + 2
                opgelegd[index] = true
                pakstapel[index].push(gespeeldeKaart[index])
                gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                soortenGegooid[index][soortGespeeldeKaart[index]]++
                geselecteerdeKaart[index] = ''
                shuffle(pakstapel[index])
                winnaar()
                beurtFunctie()
        }else if (penalty[index] > 0 && nummerGespeeldeKaart[index] == 0 && nummerGeselecteerdeKaart[index] == 0 && pass[index] == false) {
            for (var i = 0; i < 2; i++) {
                var pakstapelKaart = pakstapel[index].splice(0, 1)
                decks[index][beurt[index] - 1].push(pakstapelKaart[0])
            }
            penalty[index] = penalty[index] + 5
            opgelegd[index] = true
            pakstapel[index].push(gespeeldeKaart[index])
            gespeeldeKaart[index] = geselecteerdeKaart[index][0]
            soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
            nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
            soortenGegooid[index][soortGespeeldeKaart[index]]++
            geselecteerdeKaart[index] = ''
            shuffle(pakstapel[index])
            winnaar()
            beurtFunctie()
        
        }else if (penalty[index] > 1 && pass[index] == true){
            if (soortGeselecteerdeKaart[index] != 'special' && nummerGeselecteerdeKaart[index] != 1  && nummerGeselecteerdeKaart[index] != 2  && nummerGeselecteerdeKaart[index] != 7  && nummerGeselecteerdeKaart[index] != 8) {
                if (nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart[index] || soortGespeeldeKaart[index] == soortGeselecteerdeKaart[index]){
                    //boer()
                    pakstapel[index].push(gespeeldeKaart[index])
                    gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                    soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                    nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                    soortenGegooid[index][soortGespeeldeKaart[index]]++
                    geselecteerdeKaart[index] = ''
                    shuffle(pakstapel[index])
                    opgelegd[index] = true
                    winnaar()
                    beurtFunctie()
                } 
            }
        }
    }else if (decks[index][beurt[index] - 1].length > 0){
        if ((nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart[index] || soortGespeeldeKaart[index] == soortGeselecteerdeKaart[index] || soortGeselecteerdeKaart == 'special') && penalty[index] < 1 ){
            if (nummerGeselecteerdeKaart[index] == 0) {
                penalty[index] = penalty[index] + 5
            }
            if (nummerGeselecteerdeKaart[index] == 2) {
                penalty[index] = penalty[index] + 2
            }
            if (nummerGeselecteerdeKaart[index] == 1) {
                spelrichting[index] = spelrichting[index] * -1
            }
            if (nummerGeselecteerdeKaart[index] == 8) {
                beurtFunctie()
            }
            if (nummerGeselecteerdeKaart[index] == 7){
                winnaar()
            }
            if (nummerGeselecteerdeKaart[index] != 7 && nummerGeselecteerdeKaart[index] != 13) {
                winnaar()
                beurtFunctie()
            }
            //boer()
            pakstapel[index].push(gespeeldeKaart[index])
            gespeeldeKaart[index] = geselecteerdeKaart[index][0]
            soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
            nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
            soortenGegooid[index][soortGespeeldeKaart[index]]++
            geselecteerdeKaart[index] = ''
            shuffle(pakstapel[index])
            opgelegd[index] = true
        }else if (penalty[index] > 0 && pass[index] == true){
            if ((nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart[index] || soortGespeeldeKaart[index] == soortGeselecteerdeKaart[index] || soortGeselecteerdeKaart == 'special')){
                if (nummerGeselecteerdeKaart[index] == 0) {
                    penalty[index] = penalty[index] + 5
                }
                if (nummerGeselecteerdeKaart[index] == 2) {
                    penalty[index] = penalty[index] + 2
                }
                if (nummerGeselecteerdeKaart[index] == 1) {
                    spelrichting[index] = spelrichting[index] * -1
                }
                if (nummerGeselecteerdeKaart[index] == 8) {
                    beurtFunctie()
                }
                if (nummerGeselecteerdeKaart[index] == 7){
                    winnaar()
                }
                if (nummerGeselecteerdeKaart[index] != 7 && nummerGeselecteerdeKaart[index] != 13) {
                    winnaar()
                    beurtFunctie()
                }
                //boer()
                pakstapel[index].push(gespeeldeKaart[index])
                gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                soortenGegooid[index][soortGespeeldeKaart[index]]++
                geselecteerdeKaart[index] = ''
                shuffle(pakstapel[index])
                opgelegd[index] = true
            }
        }else if (nummerGeselecteerdeKaart[index] == 2 && nummerGespeeldeKaart[index] == 2 && pass[index] == false){
            penalty[index] = penalty[index] + 2
            opgelegd[index] = true
            pakstapel[index].push(gespeeldeKaart[index])
            gespeeldeKaart[index] = geselecteerdeKaart[index][0]
            soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
            nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
            soortenGegooid[index][soortGespeeldeKaart[index]]++
            geselecteerdeKaart[index] = ''
            shuffle(pakstapel[index])
            winnaar()
            beurtFunctie()
        }else if (nummerGeselecteerdeKaart[index] == 0 && nummerGespeeldeKaart[index] == 0 && pass[index] == false){
            penalty[index] = penalty[index] + 5
            opgelegd[index] = true
            pakstapel[index].push(gespeeldeKaart[index])
            gespeeldeKaart[index] = geselecteerdeKaart[index][0]
            soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
            nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
            soortenGegooid[index][soortGespeeldeKaart[index]]++
            geselecteerdeKaart[index] = ''
            shuffle(pakstapel[index])
            winnaar()
            beurtFunctie()
        }else if (penalty[index] == 1) {
            if ((nummerGespeeldeKaart[index] == nummerGeselecteerdeKaart[index] || soortGespeeldeKaart[index] == soortGeselecteerdeKaart[index] || soortGeselecteerdeKaart == 'special') && penalty[index] < 1){
                if (nummerGeselecteerdeKaart[index] == 0) {
                    penalty[index] = penalty[index] + 5
                }
                if (nummerGeselecteerdeKaart[index] == 2) {
                    penalty[index] = penalty[index] + 2
                }
                if (nummerGeselecteerdeKaart[index] == 1) {
                    spelrichting[index] = spelrichting[index] * -1
                }
                if (nummerGeselecteerdeKaart[index] == 8) {
                    beurtFunctie()
                }
                if (nummerGeselecteerdeKaart[index] == 7){
                    winnaar()
                }
                if (nummerGeselecteerdeKaart[index] != 7 && nummerGeselecteerdeKaart[index] != 13) {
                    winnaar()
                    beurtFunctie()
                }
                //boer()
                pakstapel[index].push(gespeeldeKaart[index])
                gespeeldeKaart[index] = geselecteerdeKaart[index][0]
                soortGespeeldeKaart[index] = gespeeldeKaart[index]['soort']
                nummerGespeeldeKaart[index] = gespeeldeKaart[index]['trueNumber']
                soortenGegooid[index][soortGespeeldeKaart[index]]++
                geselecteerdeKaart[index] = ''
                shuffle(pakstapel[index])
                opgelegd[index] = true
            }
        }else {
            opgelegd[index] = false
        }
    }
}

function winnaar(){
    if (totalPlayers[index] == 2){
        if (decks[index][0].length == 0) {
            positieWinnaar[index]++
            io.emit('winnaar', positieWinnaar[index], players[index][0], roomNumber)
            positieWinnaar[index]++
            io.emit('verliezer', players[index][1])
            players.splice(index, 1)
            room.splice(index, 1) 
            gameState.splice(index, 1)
            AIamount.splice(index, 1)
            amountPlayers.splice(index, 1)
            totalPlayers.splice(index, 1)
            pakstapel.splice(index, 1)
            beurt.splice(index, 1)
            spelrichting.splice(index, 1)
            decks.splice(index, 1)
            gespeeldeKaart.splice(index, 1)
            penalty.splice(index, 1)
            geselecteerdeKaart.splice(index, 1)
            opgelegd.splice(index, 1)
            positieWinnaar.splice(index, 1)
            pass.splice(index, 1)
        }else if (decks[index][1].length == 0) {
            positieWinnaar[index]++
            io.emit('winnaar', positieWinnaar[index], players[index][1], roomNumber)
            positieWinnaar[index]++
            io.emit('verliezer', players[index][0], roomNumber)
            players.splice(index, 1)
            room.splice(index, 1) 
            gameState.splice(index, 1)
            AIamount.splice(index, 1)
            amountPlayers.splice(index, 1)
            totalPlayers.splice(index, 1)
            pakstapel.splice(index, 1)
            beurt.splice(index, 1)
            spelrichting.splice(index, 1)
            decks.splice(index, 1)
            gespeeldeKaart.splice(index, 1)
            penalty.splice(index, 1)
            geselecteerdeKaart.splice(index, 1)
            opgelegd.splice(index, 1)
            positieWinnaar.splice(index, 1)
            pass.splice(index, 1)
        }
    }
    if (totalPlayers[index] == 3) {
        if (decks[index][0].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(0, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][0], roomNumber)
            players[index].splice(0, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }else if (decks[index][1].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(1, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][1], roomNumber)
            players[index].splice(1, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }else if (decks[index][2].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(2, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][2], roomNumber)
            players[index].splice(2, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }
        if (beurt[index] > totalPlayers[index] && spelrichting[index] == 1) {
            beurt[index] = 1
        }else if (beurt[index] > totalPlayers[index] && spelrichting[index] == -1){
            beurt[index] = totalPlayers[index] - 1
        }
    }
    if (totalPlayers[index] == 4) {
        if (decks[index][0].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(0, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][0], roomNumber)
            players[index].splice(0, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }else if (decks[index][1].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(1, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][1], roomNumber)
            players[index].splice(1, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }else if (decks[index][2].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(2, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][2], roomNumber)
            players[index].splice(2, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }else if (decks[index][3].length == 0) {
            positieWinnaar[index]++
            for (var i = 0; i < decks[index][beurt[index] - 1].length; i++){
                var pakstapelKaart = decks[index][beurt[index] - 1].splice(0, 1)
                pakstapel[index].push(pakstapelKaart[0])
            }
            decks[index].splice(3, 1)
            totalPlayers[index]--
            amountPlayers[index]--
            io.emit('winnaar', positieWinnaar[index], players[index][3], roomNumber)
            players[index].splice(3, 1)
            io.emit('kaarten', decks[index], gespeeldeKaart[index], beurt[index], players[index], penalty[index], totalPlayers[index], spelrichting[index], geselecteerdeKaart[index], pass[index], room[index], soortGespeeldeKaart[index])
        }
        if (beurt[index] > totalPlayers[index] && spelrichting[index] == 1) {
            beurt[index] = 1
        }else if (beurt[index] > totalPlayers[index] && spelrichting[index] == -1){
            beurt[index] = totalPlayers[index] - 1
        }
    }
    
}
