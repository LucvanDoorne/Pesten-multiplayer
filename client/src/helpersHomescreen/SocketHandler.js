import io from 'socket.io-client'

export default class SocketHandler {
    constructor(scene) {
        scene.AIamount = 0
        scene.playerAmount = 0
        scene.io = require("socket.io-client")
        scene.socket = io('http://localhost:3000', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        })
        
        scene.socket.on('connect', () => {
            console.log('Connected!')
            
        })

        scene.socket.on('AIamount', (arg) => {
            scene.AIamount = arg
            scene.amountAIText.destroy(true)
            scene.totalPlayersText.destroy(true)
            scene.amountAIText = scene.add.text(820, 220, 'Amount of AI: ' + arg, {font: '35px Arial'})
            scene.totalPlayersText = scene.add.text(185, 220, 'Total players: ' + (arg + scene.playerAmount), {font: '35px Arial'})
        })

        scene.socket.on('amountPlayers', (arg) => {
            scene.playerAmount = arg
            scene.amountPlayersText.destroy(true)
            scene.totalPlayersText.destroy(true)
            scene.amountPlayersText = scene.add.text(70, 350, 'Amount of humans connected: ' + arg, {font: '35px Arial'})
            scene.totalPlayersText = scene.add.text(185, 220, 'Total players: ' + (arg + scene.AIamount), {font: '35px Arial'})
        })

        scene.socket.on('lobbyFull', (arg) => {
            scene.players = arg
            console.log(scene.players)
            if (scene.players[4] == scene.socket.id){
                scene.background.depth = 1000
                scene.fullscreen.depth = 1001
                scene.lobbyFullText = scene.add.text(370, 290, 'Lobby full...', {font: '100px Arial'})
                scene.lobbyFullText.depth = 1001
                scene.socket.emit('forceDisconnect')
            } 
            
            
        }) 

        

    }
}