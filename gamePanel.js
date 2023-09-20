import { enQueue, deQueue, compoFactory } from "./compoQueue.js"
import { isCellFilled, fillCell, checkLineClearable } from "./panelData.js"
import { row, col ,cellSize } from "./constant.js"
window.addEventListener('load', initMountedElement)

let ctx = null
//20x10的网格,每个网格
//假设每个网格40px的方形...

function initMountedElement() {
    const gamePanel = document.getElementById('gamePanel')
    gamePanel.setAttribute('width','400px')
    gamePanel.setAttribute('height','800px')
    gamePanel.classList.add('gamePanel')
    //Canvas 的默认大小为 300 像素 ×150 像素（宽 × 高，像素的单位是 px）
    if (gamePanel.getContext) {
        ctx = gamePanel.getContext("2d");
        drawPanel(ctx)
    } else {
        alert("不支持canvas")
    }
}

function drawPanel(ctx) {
    ctx.strokeStyle = '#d8453d'
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ctx.strokeRect(j*cellSize, i*cellSize, cellSize, cellSize)
        }
    }
}

function drawRectCell(position) {
    const { x, y } = position
    ctx.fillStyle = "#04be02";
    ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function clearRectCell(position) {
    const { x, y } = position
    ctx.clearRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function clearRow(y) {
    for (let x = 0; x < col; x++) {
        clearRectCell({
            x,
            y
        })
    }
}

function drawCompo(vectorArray) {
    vectorArray.forEach(item => {
        drawRectCell(item)
    })
}

function canChange(vectorArray) {
    const allInPanel = vectorArray.every(item => isInPanel(item))
    if (!allInPanel) return false
    const allCellEmpty = vectorArray.findIndex(item => isCellFilled(item)) === -1
    // if (!(allInPanel && allCellEmpty)) {
    //     debugger
    // }
    return allInPanel && allCellEmpty
}

function isInPanel({ x, y }) {
    return (x >= 0 && x < col) && (y >= -4 && y < row)
}

function lockCompo(vectorArray) {
    // debugger
    const delLineArray = []
    vectorArray.forEach(item => {
        const { x ,y } = item
        fillCell(x, y)
        if (checkLineClearable(y)) {
            delLineArray.push(y)
        }
    })
    delLineArray.forEach(y => {
        clearRow(y)
    })
    deQueue()
    enQueue(compoFactory())
}

export {
    drawRectCell,
    clearRectCell,
    canChange,
    lockCompo
}