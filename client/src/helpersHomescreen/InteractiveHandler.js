export default class InteractiveHandler {
    constructor(scene) {
        scene.pointer = scene.input.activePointer
        scene.amountAI = 0
        scene.addAIButton.on('pointerdown', () => {
            if (scene.pointer.leftButtonDown()) {
                scene.addAIButton.setFrame(1)
            }
        })

        scene.addAIButton.on('pointerup', () => {
            if (scene.pointer.leftButtonReleased()) {
                scene.addAIButton.setFrame(0)
                scene.socket.emit("AIup")
            }
        })

        scene.addAIButton.on('pointerout', () => {
            scene.addAIButton.setFrame(0)
        })

        scene.removeAIButton.on('pointerdown', () => {
            if (scene.pointer.leftButtonDown()) {
                scene.removeAIButton.setFrame(1)
            }
        })

        scene.removeAIButton.on('pointerup', () => {
            if (scene.pointer.leftButtonReleased()) {
                scene.removeAIButton.setFrame(0)
                scene.socket.emit('AIdown')
            }
        })

        scene.removeAIButton.on('pointerout', () => {
            scene.removeAIButton.setFrame(0)
        })

        scene.buttonStart.on('pointerdown', () => {
            if (scene.pointer.leftButtonDown()) {
                scene.buttonStart.setFrame(1)
            }
        })

        scene.buttonStart.on('pointerout', () => {
            scene.buttonStart.setFrame(0)
        })

        scene.buttonStart.on('pointerup', () => {
            if (scene.pointer.leftButtonReleased()) {
                scene.buttonStart.setFrame(0)
                scene.socket.emit('startGame')
            }
        })

    }
}
