// nodige variablen voor de server
const server = require('express')()
const http = require('http').createServer(server)
const cors = require('cors')
const path = require('path')
var connect = require('connect')
const serveStatic = require('serve-static')
const shuffle = require('shuffle-array')
var st = require('st')
const onnx = require('onnxruntime')
const { data, input } = require('@tensorflow/tfjs')

// nodige variablen voor de game, dit zijn allemaal arrays vanwege de rooms
var array = []

for (n = 2; n <= 10; n + 1){
    array.push(n)
}
print(array)
var roomNumber
var output
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
    { kaart: 'boer ruiten', soort: 'special',  trueNumber: 13, number: 48 },
    { kaart: 'boer schoppen', soort: 'special',  trueNumber: 13, number: 48 },
    { kaart: 'boer klaveren', soort: 'special',  trueNumber: 13, number: 48 },
    { kaart: 'joker 1',  soort: 'special',  trueNumber: 0, number: 49 },
    { kaart: 'joker 2',  soort: 'special',  trueNumber: 0, number: 49 }
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

//server
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
    //room
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
            kaarten = [
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
                { kaart: 'boer ruiten', soort: 'special',  trueNumber: 13, number: 48 },
                { kaart: 'boer schoppen', soort: 'special',  trueNumber: 13, number: 48 },
                { kaart: 'boer klaveren', soort: 'special',  trueNumber: 13, number: 48 },
                { kaart: 'joker 1',  soort: 'special',  trueNumber: 0, number: 49 },
                { kaart: 'joker 2',  soort: 'special',  trueNumber: 0, number: 49 }
              ]
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
            soortenGegooid.push({'harten': 0, 'ruiten': 0, 'schoppen': 0, 'klaveren': 0, 'special': 0})
            
        }

        if (gameState[roomID] == 'started') {
            io.emit('lobbyFull', socket.id, 'already started...')
        }
        
        if (totalPlayers[roomID] > 3 && gameState[roomID] == 'waiting') {
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
        // dit komt door een rare bug
        for (var i = 0; i < beurt.length; i++) {
            if (isNaN(beurt[i])) {
                beurt.splice(i, 1)
            }
        }


    })


    // disconnect de winnaar / verliezer
    socket.on('forceDisconnect', function() {
        socket.disconnect()
    })

    // zorgt dat de speler opnieuw start
    socket.on('restart', () => {
        io.emit('restartGame', socket.id)
    })

    // homescreen
    // regelt dat de counter van AI / spelers omhoog / omlaag gaat als er op de knop wordt gedrukt
    socket.on('AIup', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                if (totalPlayers[i] < 4) {
                    AIamount[i]++
                    totalPlayers[i]++
                    players[i].push('AI')
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
                        if (players[i][j] == 'AI') {
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
    // als de game wordt gestart, worden de kaarten uitgedeeld en mag er een speler beginnen
    socket.on('startGame', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                if (totalPlayers[i] > 1) {
                    shuffle(players[i])
                    while (players[i][0] == 'AI') {
                        var speler = players[i].splice(0, 1)
                        players[i].push(speler[0])
                    }
                    for (var k = 0; k < beurt.length; k++) {
                        if (isNaN(beurt[i])) {
                            beurt.splice(k, 1)
                        }
                    }
                    geselecteerdeKaart[i] = ''
                    // dit husselt de kaarten
                    shuffle(pakstapel[i])
                    // dit is de beginnende kaart (dit mag geen pestkaart zijn), dit maakt ook de pakstapel aan.
                    var pestkaartIndex = 0
                    while (pakstapel[i][pestkaartIndex]['trueNumber'] == 1 || pakstapel[i][pestkaartIndex]['trueNumber'] == 2 || pakstapel[i][pestkaartIndex]['trueNumber'] == 7 || pakstapel[i][pestkaartIndex]['trueNumber'] == 8 || pakstapel[i][pestkaartIndex]['trueNumber'] == 0 || pakstapel[i][pestkaartIndex]['trueNumber'] == 13){
                        pestkaartIndex++
                    }
                    gespeeldeKaart[i] = pakstapel[i][pestkaartIndex]
                    soortGespeeldeKaart[i] = gespeeldeKaart[i]['soort']
                    nummerGespeeldeKaart[i] = gespeeldeKaart[i]['trueNumber']
                    soortenGegooid[i][soortGespeeldeKaart[i]]++
                    pakstapel[i].splice(pestkaartIndex, 1)
                    // de kaarten worden uitgedeeld
                    for (var j = 0; j < totalPlayers[i]; j++){
                        decks[i].push(pakstapel[i].splice(0, 7))
                    }
                    gameState[i] = 'started'
                    io.emit('beginGame', arg)
                    socket.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
                    io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
                }
            }
        }
        
    })
    // je krijgt er een kaart bij (die meteen geselecteerd wordt) als je passt
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
                penalty[i] = 1
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }

    })

    // zorgt dat de geselecteerde kaart naast de pakstapel te liggen komt
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

    // zorgt ervoor dat de geselecteerdekaart terug gehaald kan worden
    socket.on('geselecteerdeKaartTerug', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                decks[i][beurt[i] - 1].push(geselecteerdeKaart[i][0])
                geselecteerdeKaart[i] = ''
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }
    })

    // checkt de kaart (zie checken) en stuurt vervolgens alles door naar de andere spelers
    socket.on('cardPlayed', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                roomNumber = arg
                checken(i)
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

    // geeft de kaarten aan de speler die hij moest pakken
    socket.on('grabCards', (arg) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                if (geselecteerdeKaart[i] != '') {
                    decks[i][beurt[i] - 1].push(geselecteerdeKaart[i][0])
                    geselecteerdeKaart[i] = ''
                }
                if (pass[i] == false) {
                    for (var j = 0; j < penalty[i]; j++) {
                        if (pakstapel[i].length < 1) {
                            socket.emit('gelijkspel', arg)
                        }
                        pakstapelKaart = pakstapel[i].splice(0, 1)
                        decks[i][beurt[i] - 1].push(pakstapelKaart[0])
                    }
                }
                pass[i] = false
                penalty[i] = 0
                if (soortGespeeldeKaart[i] != 'special') {
                    beurtFunctie(i)
                    AI(i)
                }
                io.emit('kaarten', decks[i], gespeeldeKaart[i], beurt[i], players[i], penalty[i], totalPlayers[i], spelrichting[i], geselecteerdeKaart[i], pass[i], arg, soortGespeeldeKaart[i])
            }
        }
        
    })

    // stuurt de keuze van de speler door naar de rest van de spelers
    socket.on('keuzeSoort', (arg, arg2) => {
        for (var i = 0; i < room.length; i++) {
            if (room[i] == arg) {
                soortGespeeldeKaart[i] = arg2
                winnaar(i)
                beurtFunctie(i)
                AI(i)
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
                            if (totalPlayers[j] > 1) {
                                beurt[j] = totalPlayers[j] - 1
                            }
                        }
                        amountPlayers[j]--
                        totalPlayers[j]--
                        if (gameState[j] != 'started') {
                            io.emit('amountPlayers', amountPlayers[j], room[j])
                        }
                        for (var k = 0; k < players[j].length; k++) {
                            if (players[j][k] == socket.id) {
                                if (beurt[j] == k && penalty[j] > 0) {
                                    penalty[j] = 0
                                }
                                players[j].splice(k, 1)
                                if (gameState[j] == 'started') {
                                    for (var l = 0; l < decks[j][k].length; l++) {
                                        pakstapelKaart = decks[j][k].splice(0, 1)
                                        pakstapel[j].push(pakstapelKaart[0])
                                    }
                                    decks[j].splice(k, 1)
                                    io.emit('kaarten', decks[j], gespeeldeKaart[j], beurt[j], players[j], penalty[j], totalPlayers[j], spelrichting[j], geselecteerdeKaart[j], pass[j], room[j], soortGespeeldeKaart[j])
                                    AI(j)
                                }
                            }
                        }
                        // zorgt dat de speler wint als er nog maar één speler in zit
                        if ((totalPlayers[j] == 1 && gameState[j] == 'started') || totalPlayers[j] == AIamount[j]) {
                            gameState[j] = 'finished'
                            positieWinnaar[j]++
                            io.emit('winnaar', positieWinnaar[j], players[j][0], room[j])
                            deleteRoom(j)
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

// dit regelt de beurt
function beurtFunctie(x){
    if (decks[x][beurt[x] - 1].length != 0 || totalPlayers[x] > 2){
        beurt[x] = beurt[x] + 1 * spelrichting[x]
        if (beurt[x] > totalPlayers[x]) {
            beurt[x] = 1
        }else if (beurt[x] < 1) {
            beurt[x] = totalPlayers[x]
        }
    }
}

// hier checkt hij of de kaart die geselecteerd is opgelegd kan worden en legt deze vervolgens op, ook zorgt dit ervoor dat de pestkaarten werken zoals ze moeten werken
function checken(x){
    if (decks[x][beurt[x] - 1].length == 0) {
        if (soortGeselecteerdeKaart[x] != 'special' && nummerGeselecteerdeKaart[x] != 1  && nummerGeselecteerdeKaart[x] != 2  && nummerGeselecteerdeKaart[x] != 7  && nummerGeselecteerdeKaart[x] != 8 && (penalty[x] < 1 || pass[x] == true)) {
            if (nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x]){ 
                pakstapel[x].push(gespeeldeKaart[x])
                gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                soortenGegooid[x][soortGespeeldeKaart[x]]++
                geselecteerdeKaart[x] = ''
                shuffle(pakstapel[x])
                opgelegd[x] = true
                beurtFunctie(x)
                winnaar(x)   
                AI(x)
         }    
        }else if (soortGeselecteerdeKaart[x] == 'special' || nummerGeselecteerdeKaart[x] == 1  || nummerGeselecteerdeKaart[x] == 2  || nummerGeselecteerdeKaart[x] == 7  || nummerGeselecteerdeKaart[x] == 8 || penalty[x] < 1) {
            if ((nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x] || soortGeselecteerdeKaart[x] == 'special') && (penalty[x] < 1 || pass[x] == true)){
                for (var i = 0; i < 2; i++) {
                    var pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }
                if (nummerGeselecteerdeKaart[x] == 0) {
                    penalty[x] = penalty[x] + 5
                }
                if (nummerGeselecteerdeKaart[x] == 2) {
                    penalty[x] = penalty[x] + 2
                }
                if (nummerGeselecteerdeKaart[x] == 1) {
                    spelrichting[x] = spelrichting[x] * -1
                }
                if (nummerGeselecteerdeKaart[x] == 8) {
                    beurtFunctie(x)
                }
                if (nummerGeselecteerdeKaart[x] != 7 && nummerGeselecteerdeKaart[x] != 13) {
                    beurtFunctie(x)
                    winnaar(x)
                    AI(x)
  
                }
                pakstapel[x].push(gespeeldeKaart[x])
                gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                soortenGegooid[x][soortGespeeldeKaart[x]]++
                geselecteerdeKaart[x] = ''
                shuffle(pakstapel[x])
                opgelegd[x] = true
                
            }
        }else if (penalty[x] > 0 && nummerGespeeldeKaart[x] == 2 && nummerGeselecteerdeKaart[x] == 2 && pass[x] == false) {
                for (var i = 0; i < 2; i++) {
                    var pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }
                penalty[x] = penalty[x] + 2
                opgelegd[x] = true
                pakstapel[x].push(gespeeldeKaart[x])
                gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                soortenGegooid[x][soortGespeeldeKaart[x]]++
                geselecteerdeKaart[x] = ''
                shuffle(pakstapel[x])
                beurtFunctie(x)
                winnaar(x)
                AI(x)

        }else if (penalty[x] > 0 && nummerGespeeldeKaart[x] == 0 && nummerGeselecteerdeKaart[x] == 0 && pass[x] == false) {
            for (var i = 0; i < 2; i++) {
                var pakstapelKaart = pakstapel[x].splice(0, 1)
                decks[x][beurt[x] - 1].push(pakstapelKaart[0])
            }
            penalty[x] = penalty[x] + 5
            opgelegd[x] = true
            pakstapel[x].push(gespeeldeKaart[x])
            gespeeldeKaart[x] = geselecteerdeKaart[x][0]
            soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
            nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
            soortenGegooid[x][soortGespeeldeKaart[x]]++
            geselecteerdeKaart[x] = ''
            shuffle(pakstapel[x])
            beurtFunctie(x)
            winnaar(x)
            AI(x)

        
        }else if (penalty[x] > 0 && pass[x] == true){
            if (soortGeselecteerdeKaart[x] != 'special' && nummerGeselecteerdeKaart[x] != 1  && nummerGeselecteerdeKaart[x] != 2  && nummerGeselecteerdeKaart[x] != 7  && nummerGeselecteerdeKaart[x] != 8) {
                if (nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x]){
                    pakstapel[x].push(gespeeldeKaart[x])
                    gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                    soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                    nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                    soortenGegooid[x][soortGespeeldeKaart[x]]++
                    geselecteerdeKaart[x] = ''
                    shuffle(pakstapel[x])
                    opgelegd[x] = true
                    beurtFunctie(x)
                    winnaar(x)
                    AI(x)

                } 
            }
        }
    }else if (decks[x][beurt[x] - 1].length > 0){
        if ((nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x] || soortGeselecteerdeKaart[x] == 'special') && penalty[x] < 1){
            if (nummerGeselecteerdeKaart[x] == 0) {
                penalty[x] = penalty[x] + 5
            }
            if (nummerGeselecteerdeKaart[x] == 2) {
                penalty[x] = penalty[x] + 2
            }
            if (nummerGeselecteerdeKaart[x] == 1) {
                spelrichting[x] = spelrichting[x] * -1
            }
            if (nummerGeselecteerdeKaart[x] == 8) {
                beurtFunctie(x)
            }
            if (nummerGeselecteerdeKaart[x] == 7){
                winnaar(x)
            }
            if (nummerGeselecteerdeKaart[x] != 7 && nummerGeselecteerdeKaart[x] != 13) {
                beurtFunctie(x)
                winnaar(x)
                AI(x)

            }
            pakstapel[x].push(gespeeldeKaart[x])
            gespeeldeKaart[x] = geselecteerdeKaart[x][0]
            soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
            nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
            soortenGegooid[x][soortGespeeldeKaart[x]]++
            geselecteerdeKaart[x] = ''
            shuffle(pakstapel[x])
            opgelegd[x] = true
        }else if (penalty[x] > 0 && pass[x] == true){
            if ((nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x] || soortGeselecteerdeKaart[x] == 'special')){
                if (nummerGeselecteerdeKaart[x] == 0) {
                    penalty[x] = penalty[x] + 5
                }
                if (nummerGeselecteerdeKaart[x] == 2) {
                    penalty[x] = penalty[x] + 2
                }
                if (nummerGeselecteerdeKaart[x] == 1) {
                    spelrichting[x] = spelrichting[x] * -1
                }
                if (nummerGeselecteerdeKaart[x] == 8) {
                    beurtFunctie(x)
                }
                if (nummerGeselecteerdeKaart[x] == 7){
                    winnaar(x)
                }
                if (nummerGeselecteerdeKaart[x] != 7 && nummerGeselecteerdeKaart[x] != 13) {
                    beurtFunctie(x)
                    winnaar(x)
                    AI(x)

                }
                //boer()
                pakstapel[x].push(gespeeldeKaart[x])
                gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                soortenGegooid[x][soortGespeeldeKaart[x]]++
                geselecteerdeKaart[x] = ''
                shuffle(pakstapel[x])
                opgelegd[x] = true
            }
        }else if (nummerGeselecteerdeKaart[x] == 2 && nummerGespeeldeKaart[x] == 2 && pass[x] == false){
            penalty[x] = penalty[x] + 2
            opgelegd[x] = true
            pakstapel[x].push(gespeeldeKaart[x])
            gespeeldeKaart[x] = geselecteerdeKaart[x][0]
            soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
            nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
            soortenGegooid[x][soortGespeeldeKaart[x]]++
            geselecteerdeKaart[x] = ''
            shuffle(pakstapel[x])       
            beurtFunctie(x)
            winnaar(x)
            AI(x)

        }else if (nummerGeselecteerdeKaart[x] == 0 && nummerGespeeldeKaart[x] == 0 && pass[x] == false){
            penalty[indxex] = penalty[x] + 5
            opgelegd[x] = true
            pakstapel[x].push(gespeeldeKaart[x])
            gespeeldeKaart[x] = geselecteerdeKaart[x][0]
            soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
            nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
            soortenGegooid[x][soortGespeeldeKaart[x]]++
            geselecteerdeKaart[x] = ''
            shuffle(pakstapel[x])
            beurtFunctie(x)
            winnaar(x)
            AI(x)

        }else if (penalty[x] == 1) {
            if (nummerGespeeldeKaart[x] == nummerGeselecteerdeKaart[x] || soortGespeeldeKaart[x] == soortGeselecteerdeKaart[x] || soortGeselecteerdeKaart[x] == 'special'){
                if (nummerGeselecteerdeKaart[x] == 0) {
                    penalty[x] = penalty[x] + 5
                }
                if (nummerGeselecteerdeKaart[x] == 2) {
                    penalty[x] = penalty[x] + 2
                }
                if (nummerGeselecteerdeKaart[x] == 1) {
                    spelrichting[x] = spelrichting[x] * -1
                }
                if (nummerGeselecteerdeKaart[x] == 8) {
                    beurtFunctie(x)
                    AI(x)
                }
                if (nummerGeselecteerdeKaart[x] == 7){
                    winnaar(x)
                }
                if (nummerGeselecteerdeKaart[x] != 7 && nummerGeselecteerdeKaart[x] != 13) {
                    beurtFunctie(x)
                    winnaar(x)
                    AI(x)

                }
                //boer()
                pakstapel[x].push(gespeeldeKaart[x])
                gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                soortenGegooid[x][soortGespeeldeKaart[x]]++
                geselecteerdeKaart[x] = ''
                shuffle(pakstapel[x])
                opgelegd[x] = true
            }
        }else {
            opgelegd[x] = false
        }
    }
}

// hier checkt hij of er een winnaar is en verwijderd de kaarten van die speler of van iedereen als er nog maar 2 spelers waren
function winnaar(x){
    if (gameState == 'started' && decks[x].length != undefined){
        for (var i = 0; i < decks[x].length; i++) {
            if (decks[x][i].length == 0) {
                positieWinnaar[x]++
                io.emit('winnaar', positieWinnaar[x], players[x][i], roomNumber)
                if (players[x][i] == 'AI') {
                    AIamount[x]--
                }else {
                    amountPlayers[x]--
                }
                totalPlayers[x]--
                players[x].splice(i, 1)
                decks[x].splice(i, 1)
                if (totalPlayers[x] == 1 || totalPlayers[x] == AIamount[x]) {
                    io.emit('verliezer', players[x][0])
                    gameState[x] = 'finished'
                    deleteRoom(x)
                }else {
                    io.emit('kaarten', decks[x], gespeeldeKaart[x], beurt[x], players[x], penalty[x], totalPlayers[x], spelrichting[x], geselecteerdeKaart[x], pass[x], room[x], soortGespeeldeKaart[x])
                
                }
            }
        }
    }
}


// dit is de ai
async function AI(x) {
    if (players[x][beurt[x] - 1] == 'AI' && amountPlayers[x] > 0 && gameState[x] == 'started' && decks[x][beurt[x] - 1].length > 0){
        // maakt de data aan die de ai nodig heeft
        var obs = await Array.apply('0', Array(121)).map(function () { return 0})
        obs = new Float32Array(obs)
        for (var i = 0; i < decks[x][beurt[x] - 1].length; i++) {            
            obs[decks[x][beurt[x] - 1][i]['number']]++
            var compatible = false
            if ((nummerGespeeldeKaart[x] == decks[x][beurt[x] - 1][i]['trueNumber'] || soortGespeeldeKaart[x] == decks[x][beurt[x] - 1][i]['soort'] || decks[x][beurt[x] - 1][i]['soort'] == 'special') && penalty[x] < 1 ){
                compatible = true
            }else if (decks[x][beurt[x] - 1][i]['trueNumber'] == 2 && nummerGespeeldeKaart[x] == 2 && penalty[x] > 0){
                compatible = true
            }else if (decks[x][beurt[x] - 1][i]['trueNumber'] == 0 && nummerGespeeldeKaart[x] == 0 && penalty[x] > 0){
                compatible = true
            }
            if (compatible == true) {
                obs[decks[x][beurt[x] - 1][i]['number'] + 50]++
            }
        } 
        obs[100] = soortenGegooid[x]['harten']
        obs[101] = soortenGegooid[x]['klaveren']
        obs[102] = soortenGegooid[x]['schoppen']
        obs[103] = soortenGegooid[x]['ruiten']
        obs[104] = soortenGegooid[x]['special']
        if (soortGespeeldeKaart == 'special') {
            obs[105] = 1
        }
        for (var i = 0; i < totalPlayers[x]; i++) {
            obs[106 + i] = decks[x][i].length
        }
        obs[119] = [beurt[x] - 1]
        obs[120] = spelrichting[x]

        // hier maakt de ai zijn prediction
        async function main() {
            try {
                const sess = await onnx.InferenceSession.create('./model.onnx');
                const tensor = new onnx.Tensor('float32', obs, [121])
                const feeds = { 'input.1': tensor} 
                const outputMap = await sess.run(feeds);
                
                output = outputMap.out.data
        
                return output
            } catch (e) {
                console.error(`failed to inference ONNX model: ${e}.`)
            }
        }
        main()

        // zorgt ervoor dat alle kaarten die niet gespeeld kunnen worden 0 worden
        var mask = await resolveAfter5Seconds(Array.apply('0', Array(55)).map(function () { return 1}))
        
        if (obs[105] == 0) {
            for (var i = 50; i < 100; i++) {
                if (obs[i] == 0) {
                    mask[i - 50] = 0
                }
            }
            for (var i = 50; i < 54; i++) {
                mask[i] = 0
            }
            mask[54] = 0
        }else {
            for (var i = 0; i < 50; i++) {
                mask[i] = 0
            }
            mask[54] = 0
        }

    

        var outputMasked = []
        for (var i = 0; i < output.length; i++) {
            var sum = mask[i] * output[i]
            outputMasked.push(sum)
        }

        
        var data = indexOfMax(outputMasked)
        //console.log(data)
        
        var sumData = 0
        for (var i = 0; i < outputMasked.length; i++) {
            sumData += outputMasked[i]
        }

        // zorgt ervoor dat er een harten aas wordt opgelegd als de ai die heeft, in plaats van dat hij passt
        if (data == 0 && penalty[x] == 0 && (nummerGespeeldeKaart[x] == 1 || soortGespeeldeKaart == 'harten')) {
            for (var i = 0; i < decks[x][beurt[x] - 1].length; i++) {
                if (data == decks[x][beurt[x] - 1][i]['number']) {
                    pakstapel[x].push(gespeeldeKaart[x])
                    geselecteerdeKaart[x] = decks[x][beurt[x] - 1].splice(i, 1)
                    spelrichting[x] = spelrichting[x] * -1
                    gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                    soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                    nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                    soortenGegooid[x][soortGespeeldeKaart[x]]++
                    geselecteerdeKaart[x] = ''
                    shuffle(pakstapel[x])
                    opgelegd[x] = true
                }
            }
        }

        // legt de kaart die de ai wilt spelen op
        if (1 <= data < 50) {
            for (var i = 0; i < decks[x][beurt[x] - 1].length; i++) {
                if (data == decks[x][beurt[x] - 1][i]['number']) {
                    pakstapel[x].push(gespeeldeKaart[x])
                    geselecteerdeKaart[x] = decks[x][beurt[x] - 1].splice(i, 1)
                    nummerGeselecteerdeKaart[x] = geselecteerdeKaart[x][0]['trueNumber']
                    soortGeselecteerdeKaart[x] = geselecteerdeKaart[x][0]['soort']
                    if (nummerGeselecteerdeKaart[x] == 0) {
                        penalty[x] = penalty[x] + 5
                    }
                    if (nummerGeselecteerdeKaart[x] == 2) {
                        penalty[x] = penalty[x] + 2
                    }
                    if (nummerGeselecteerdeKaart[x] == 1) {
                        spelrichting[x] = spelrichting[x] * -1
                    }
                    if (nummerGeselecteerdeKaart[x] == 8) {
                        beurtFunctie(x)
                    }
                    if ((nummerGeselecteerdeKaart[x] == 7 || nummerGeselecteerdeKaart[x] == 13) && decks[x][beurt[x] - 1].length > 1){
                        AI(x)
                        winnaar(x)
                    }

                    gespeeldeKaart[x] = geselecteerdeKaart[x][0]
                    soortGespeeldeKaart[x] = gespeeldeKaart[x]['soort']
                    nummerGespeeldeKaart[x] = gespeeldeKaart[x]['trueNumber']
                    soortenGegooid[x][soortGespeeldeKaart[x]]++
                    geselecteerdeKaart[x] = ''
                    shuffle(pakstapel[x])
                    opgelegd[x] = true
                }
            }
        }
        // geeft de kaarten aan de ai als er een penalty is
        var ai2kaarten = false
        if (penalty[x] > 0 && data != 1 && data != 13 && data != 25 && data != 37 && data != 49) {
            for (var i = 0; i < penalty[x]; i++) {
                if (pakstapel[x].length < 1) {
                    socket.emit('gelijkspel', room[x])
                }
                pakstapelKaart = pakstapel[x].splice(0, 1)
                decks[x][beurt[x] - 1].push(pakstapelKaart[0])
            }
            penalty[x] = 0
            ai2kaarten = true
        }

        if (sumData == 0 && penalty[x] == 0 && gespeeldeKaart[x]['number'] != 0 && gespeeldeKaart[x]['trueNumber'] != 0 && ai2kaarten == false) {
            var pakstapelKaart = pakstapel[x].splice(0, 1)
            decks[x][beurt[x] - 1].push(pakstapelKaart[0])
        }

        // zorgt voor de keuzes bij boeren en jokers
        if (data == 50) {
            soortGespeeldeKaart[x] = 'harten'
            if (gespeeldeKaart[x]['trueNumber'] == 0) {
                for (var i = 0; i < penalty[x]; i++) {
                    if (pakstapel[x].length < 1) {
                        socket.emit('gelijkspel', room[x])
                    }
                    pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }
                penalty[x] = 0
            }
        }
        if (data == 51) {
            soortGespeeldeKaart[x] = 'klaveren'
            if (gespeeldeKaart[x]['trueNumber'] == 0) {
                for (var i = 0; i < penalty[x]; i++) {
                    if (pakstapel[x].length < 1) {
                        socket.emit('gelijkspel', room[x])
                    }
                    pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }   
                penalty[x] = 0
            }
        }
        if (data == 52) {
            soortGespeeldeKaart[x] = 'schoppen'
            if (gespeeldeKaart[x]['trueNumber'] == 0) {
                for (var i = 0; i < penalty[x]; i++) {
                    if (pakstapel[x].length < 1) {
                        socket.emit('gelijkspel', room[x])
                    }
                    pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }   
                penalty[x] = 0
            }
        }
        if (data == 53) {
            soortGespeeldeKaart[x] = 'ruiten'
            if (gespeeldeKaart[x]['trueNumber'] == 0) {
                for (var i = 0; i < penalty[x]; i++) {
                    if (pakstapel[x].length < 1) {
                        socket.emit('gelijkspel', room[x])
                    }
                    pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }
                penalty[x] = 0
            }
        }

        if (penalty[x] > 0 && opgelegd[x] == false && gespeeldeKaart[x]['trueNumber'] != 0 && gespeeldeKaart[x]['trueNumber'] != 2) {
            for (var i = 0; i < penalty[x]; i++) {
                if (pakstapel[x].length < 1) {
                    socket.emit('gelijkspel', room[x])
                }
                pakstapelKaart = pakstapel[x].splice(0, 1)
                decks[x][beurt[x] - 1].push(pakstapelKaart[0])
            }
            penalty[x] = 0
        }
        if (decks[x][beurt[x] - 1].length == 0) {
            if (soortGespeeldeKaart[x] == 'special' || nummerGespeeldeKaart[x] == 1  || nummerGespeeldeKaart[x] == 2  || nummerGespeeldeKaart[x] == 7  || nummerGespeeldeKaart[x] == 8){
                for (var i = 0; i < 2; i++) {
                    if (pakstapel[x].length < 1) {
                        socket.emit('gelijkspel', room[x])
                    }
                    pakstapelKaart = pakstapel[x].splice(0, 1)
                    decks[x][beurt[x] - 1].push(pakstapelKaart[0])
                }
            }
            if (nummerGespeeldeKaart[x] == 13 || nummerGespeeldeKaart[x] == 7) {
                AI(x)
            }
        }
        if (data != 6 && data != 18 && data != 30 && data != 42 && data != 48) {
            beurtFunctie(x)
            winnaar(x)
            AI(x)
        }

        if (opgelegd[x] == true) {
            opgelegd[x] = false
            if (pass[x] == true) {
                penalty[x] = 0
                pass[x] = false
            }
        }
        io.emit('kaarten', decks[x], gespeeldeKaart[x], beurt[x], players[x], penalty[x], totalPlayers[x], spelrichting[x], geselecteerdeKaart[x], pass[x], room[x], soortGespeeldeKaart[x])   
    } 

        // output is een keuze voor de soort, passing of een geselecteerde kaart, hij legt deze dan ook direct op
    
}

// de volgende functie wordt (niet pas na 5 seconden, maar) pas na 2,5 seconde uitgevoerd
function resolveAfter5Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2500);
    });
}

function resolveAfter10Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 10000);
    });
}



// haalt de maximale waarde uit een array
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

// dit verwijderd alle variablen van een room
function deleteRoom(j) {
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
