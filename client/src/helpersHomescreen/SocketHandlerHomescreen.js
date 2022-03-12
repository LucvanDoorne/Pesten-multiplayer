export default class SocketHandler {
    constructor(scene) {
        scene.AIamount = 0
        scene.playerAmount = 0
        scene.roomNumber = ''
        scene.socket.on('roomNumber', (arg1, arg2) => {
            if (scene.socket.id == arg2) {
                scene.roomNumber = arg1
            }
        }) 

        scene.socket.on('connect', () => {
            console.log('Connected!')
            
        })

        scene.socket.on('AIamount', (arg1, arg2) => {
            if (arg2 == scene.roomNumber) {
                scene.AIamount = arg1
                scene.amountAIText.destroy(true)
                scene.totalPlayersText.destroy(true)
                scene.amountAIText = scene.add.text(820, 220, 'Amount of AI: ' + arg1, {font: '35px Arial'})
                scene.totalPlayersText = scene.add.text(185, 220, 'Total players: ' + (arg1 + scene.playerAmount), {font: '35px Arial'})
            }
        })

        scene.socket.on('amountPlayers', (arg1, arg2) => {
            if (arg2 == scene.roomNumber) {
                scene.playerAmount = arg1
                scene.amountPlayersText.destroy(true)
                scene.totalPlayersText.destroy(true)
                scene.amountPlayersText = scene.add.text(70, 350, 'Amount of humans connected: ' + arg1, {font: '35px Arial'})
                scene.totalPlayersText = scene.add.text(185, 220, 'Total players: ' + (arg1 + scene.AIamount), {font: '35px Arial'})
            }
        })

        scene.socket.on('lobbyFull', (arg, arg2) => {
            if (arg == scene.socket.id){
                scene.background.depth = 1000
                scene.fullscreen.depth = 1001
                if (arg2 == 'full...') {
                    scene.lobbyFullText = scene.add.text(370, 290, 'Lobby ' + arg2, {font: '100px Arial'})
                }else {
                    scene.lobbyFullText = scene.add.text(120, 290, 'Lobby ' + arg2, {font: '100px Arial'})
                }

                scene.lobbyFullText.depth = 1001
                scene.buttonJoinNewGame = scene.add.sprite(640, 500, 'button').setInteractive()
                scene.buttonJoinNewGame.scale = 0.5
                scene.buttonJoinNewGame.depth = 1001
                scene.joinButtonText = scene.add.text(530, 490, 'JOIN AN OTHER LOBBY', {font: '20px Arial'})
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



        

    }
}