window.addEventListener('load', initMountedElement)
const cellSize = 40
const row = 20
const col = 10
let ctx = null
//20x10的网格,每个网格
//假设每个网格40px的方形...
const panel = initPanelData()

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

function initPanelData() {
    const panel = new Array(col).fill(new Array(row).fill(0))
    return panel
}

export {
    ctx,
    panel,
    cellSize
}