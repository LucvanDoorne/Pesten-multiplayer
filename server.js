const server = require('express')()
const http = require('http').createServer(server)
const cors = require('cors')
const path = require('path')
var connect = require('connect')
const serveStatic = require('serve-static')
const shuffle = require('shuffle-array')
var st = require('st')


var gameState = 'waiting'
let AIamount = 0
let amountPlayers = 0
let totalPlayers = 0
var pakstapel = [
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
var players = []
var beurt = 1
var spelrichting = 1
var decks = []
var gespeeldeKaart
var aantalSpelers = 0
var penalty = 0
var geselecteerdeKaart = ''
var opgelegd = false
var positieWinnaar = 0

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080', 
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

server.use(cors())
server.use(serveStatic(__dirname + '/client/dsit'))

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id)
    //disconnect de winnaar / verliezer
    socket.on('forceDisconnect', function() {
        socket.disconnect()
    })

    //homescreen
    // regelt dat de counter van AI / spelers omhoog / omlaag gaat als er op de knop wordt gedrukt
    socket.emit('AIamount', AIamount)
    amountPlayers++
    totalPlayers++
    socket.emit('amountPlayers', amountPlayers)
    io.emit('amountPlayers', amountPlayers)
    
    socket.on('startGame', function() {
        geselecteerdeKaart = ''
        aantalSpelers = amountPlayers
        amountPlayers = 0
        totalPlayers = AIamount
        gameState = 'started'
        io.emit('startGame')
        players = []
    })

    socket.on('AIup', function () {
        if (totalPlayers < 4) {
            AIamount++
            totalPlayers++
            players.push('AI' + AIamount)
            io.emit('AIamount', AIamount)
        }
        
    }, AIamount)

    socket.on('AIdown', function () {
        if (AIamount > 0) {
            for (var i = 0; i < players.length; i++) {
                if (players[i] == 'AI' + AIamount) {
                    players.splice(i, 1)
                }
            }
            AIamount--
            totalPlayers--
            io.emit('AIamount', AIamount)
        }
        
    })

    players.push(socket.id)
    if (totalPlayers > 4) {
        io.emit('lobbyFull', players)
    }

    //Game
    //zorgt dat er naar de client het aantal spelers wordt gestuurd
    if (aantalSpelers == amountPlayers) {
        // husselt de kaarten
        shuffle(pakstapel)
        
        //maakt de decks aan
        for (var i = 0; i <= aantalSpelers; i++){
            decks[i] = pakstapel.splice(0, 7)
        }

        // dit is de beginnende kaart (dit mag geen pestkaart zijn), dit maakt ook de pakstapel aan.
        var pestkaartIndex = 0
        while (pakstapel[0]['trueNumber'] == "1" || pakstapel[0]['trueNumber'] == "2" || pakstapel[0]['trueNumber'] == "7" || pakstapel[0]['trueNumber'] == "8" || pakstapel[0]['trueNumber'] == "0" || pakstapel[0]['trueNumber'] == "13"){
            pestkaartIndex++
        }
        gespeeldeKaart = pakstapel[pestkaartIndex]
        pakstapel.splice(pestkaartIndex, 1)
        console.log(gespeeldeKaart)
        socket.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
        
    }

    socket.on('pass', function() {
        if (pakstapel.lengt < 1) {
            socket.emit('gelijkspel')
        }
        if (geselecteerdeKaart != '') {
            decks[beurt - 1].push(geselecteerdeKaart[0])
        }
        geselecteerdeKaart = ''
        var pakstapelKaart = pakstapel.splice(0, 1)
        decks[beurt - 1].push(pakstapelKaart[0])
        beurtFunctie()
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })

    socket.on('geselecteerdeKaart', (arg) => {
        if (geselecteerdeKaart != '') {
            decks[beurt - 1].push(geselecteerdeKaart[0])
        }
        geselecteerdeKaart = decks[beurt - 1].splice(arg, 1)
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })
    socket.on('geselecteerdeKaartTerug', () => {
        decks[beurt - 1].push(geselecteerdeKaart[0])
        geselecteerdeKaart = ''
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })

    socket.on('cardPlayed', () => {
        checken()
        if (opgelegd == true) {
            opgelegd = false
        }
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })

    socket.on('grabCards', () => {
        if (geselecteerdeKaart != '') {
            decks[beurt - 1].push(geselecteerdeKaart[0])
            geselecteerdeKaart = ''
        }
        for (var i = 0; i < penalty; i++) {
            if (pakstapel.length < 1) {
                socket.emit('gelijkspel')
            }
            pakstapelKaart = pakstapel.splice(0, 1)
            decks[beurt - 1].push(pakstapelKaart[0])
        }
        penalty = 0
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })

    socket.on('keuzeSoort', (arg) => {
        gespeeldeKaart['soort'] = arg
        console.log(gespeeldeKaart)
        if (gespeeldeKaart['trueNumber'] == 13) {
            winnaar()
            beurtFunctie()
        }
        io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
    })

    socket.on('disconnect', () => {
        for (var i = 0; i < players.length; i++) {
            if (players[i] == socket.id) {
                players.splice(i, 1)
            }
        }
        if (beurt == totalPlayers) {
            beurt = 1
        }
        amountPlayers--
        totalPlayers--
        io.emit('amountPlayers', amountPlayers)
        if (gameState == 'started') {
            for (var i = 0; i < players.length; i++) {
                if (players[i] == socket.id) {
                    decks.splice(i, 1)
                    for (var j = 0; i < decks[i].length; j++) {
                        pakstapelKaart = decks[i][j].splice(0, 1)
                        pakstapel.push(pakstapelKaart[0])
                    }
                }
                io.emit('kaarten', decks, gespeeldeKaart, beurt, players, penalty, totalPlayers, spelrichting, geselecteerdeKaart)
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
    beurt = beurt + 1 * spelrichting
    if (beurt > totalPlayers) {
        beurt = 1
    }else if (beurt < 1) {
        beurt = totalPlayers
    }
}

function checken(){
    if ((gespeeldeKaart['trueNumber'] == geselecteerdeKaart[0]['trueNumber'] || gespeeldeKaart['soort'] == geselecteerdeKaart[0]['soort'] || geselecteerdeKaart[0]['soort'] == 'special') && penalty < 1){
        if (geselecteerdeKaart[0]['trueNumber'] == 0) {
            penalty = penalty + 5
        }
        if (geselecteerdeKaart[0]['trueNumber'] == 2) {
            penalty = penalty + 2
        }
        if (geselecteerdeKaart[0]['trueNumber'] == 1) {
            spelrichting = spelrichting * -1
        }
        if (geselecteerdeKaart[0]['trueNumber'] == 8) {
            beurtFunctie()
        }
        if (geselecteerdeKaart[0]['trueNumber'] == 7){
            winnaar()
        }
        if (geselecteerdeKaart[0]['trueNumber'] != 7 && geselecteerdeKaart[0]['trueNumber'] != 13) {
            winnaar()
            beurtFunctie()
        }
        pakstapel.push(gespeeldeKaart)
        gespeeldeKaart = geselecteerdeKaart[0]
        geselecteerdeKaart = ''
        shuffle(pakstapel)
        opgelegd = true
    }else if (penalty > 0 && geselecteerdeKaart[0]['trueNumber'] == 2){
        penalty = penalty + 2
        opgelegd = true
        pakstapel.push(gespeeldeKaart)
        gespeeldeKaart = geselecteerdeKaart[0]
        geselecteerdeKaart = ''
        shuffle(pakstapel)
        winnaar()
        beurtFunctie()
    }else if (penalty > 0 && geselecteerdeKaart[0]['trueNumber'] == 0){
        penalty = penalty + 5
        opgelegd = true
        pakstapel.push(gespeeldeKaart)
        gespeeldeKaart = geselecteerdeKaart[0]
        geselecteerdeKaart = ''
        shuffle(pakstapel)
        winnaar()
        beurtFunctie()
    }else {
        opgelegd = false
    }
}

function winnaar(){
    if (totalPlayers == 2){
        if (decks[0].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[0])
            positieWinnaar++
            io.emit('verliezer', players[1])
        }else if (decks[1].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[1])
            positieWinnaar++
            io.emit('verliezer', players[0])
        }
    }
    if (totalPlayers == 3) {
        if (decks[0].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[0])
        }else if (decks[1].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[1])
        }else if (decks[2].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[2])
        }
    }
    if (totalPlayers == 4) {
        if (decks[0].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[0])
        }else if (decks[1].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[1])
        }else if (decks[2].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[2])
        }else if (decks[3].length == 0) {
            positieWinnaar++
            io.emit('winnaar', positieWinnaar, players[3])
        }
    }
}
