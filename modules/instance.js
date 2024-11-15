import { GamePanel } from "./Class/gamePanel.js";
import { BlockQueue } from "./Class/blockQueue.js";
import { row, col, cellSize } from "../constant.js";
import eventCenter from "../pub-sub/eventCenter.js"

function entityGamePanel() {
    const panelELe = document.querySelector('.gamePanel')
    const { offsetWidth } = panelELe

    const _cellSize = Math.floor(offsetWidth / row)

    const gamePanel = document.createElement('canvas')
    gamePanel.width = _cellSize * col
    gamePanel.height = _cellSize * row
    if (gamePanel.getContext) {
        const ctx = gamePanel.getContext("2d")
        panelELe.appendChild(gamePanel)
        return new GamePanel(ctx, row, col, _cellSize, gamePanel.width, gamePanel.height)
    } else {
        alert("不支持canvas")
    }
}

function entityMiniPanel() {
    const miniCanvas = document.createElement('canvas')
    miniCanvas.width = 100
    miniCanvas.height = 100
    const infoELe = document.querySelector('.info')
    infoELe.appendChild(miniCanvas)
    const ctx = miniCanvas.getContext('2d')
    return new GamePanel(ctx, 4, 4, 25, 100, 100)
}

const miniPanel = entityMiniPanel()
const gamePanel = entityGamePanel()
const blockQueue = new BlockQueue()

eventCenter.on("gg", () => {
    gamePanel.reRraw()
})

eventCenter.on('shift', () => {
    miniPanel.reRraw()
    const newBlock = blockQueue.getSecondBlock()
    newBlock.map(element => {
        element.x -= 4
        element.y += 3
    });
    miniPanel.drawCompo(newBlock)
})

// 最开始的miniPanel
eventCenter.emit('shift')

export {
    gamePanel,
    miniPanel,
    blockQueue
}

