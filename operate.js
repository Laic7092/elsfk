import './gameManager.js'
window.addEventListener('load', initMountedElement)
const cellSize = 40
let ctx = null
//20x10的网格,每个网格
//假设每个网格40px的方形...

const unitVectorEnum = {
    down: {x: 0, y: 1},
    left: {x:-1, y: 0},
    right: {x:1, y: 0}
}

class Vector2 {
    // x = 0;
    // y = 0;
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
}

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
        // canvas-unsupported code here
      }


}

function drawPanel(ctx) {
    const cellSize = 40
    const row = 20
    const col = 10
    ctx.strokeStyle = '#d8453d'
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ctx.strokeRect(j*cellSize, i*cellSize, cellSize, cellSize)
        }

    }
}

function drawRectCell(ctx, position) {
    const { x, y } = position
    ctx.fillStyle = "#04be02";
    ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function clearRectCell(ctx, position) {
    const { x, y } = position
    ctx.clearRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function drawCompo(vectorArray) {
    vectorArray.forEach(item => {
        drawRectCell(ctx, item)
    })
}

function move(vectorArray, vector) {
    const newVectorArray = vectorArray.map(item => {
        const newPoint = { ...item }
        const { x, y } = unitVectorEnum[vector]
        newPoint.x += x
        newPoint.y += y
        return newPoint
    })
    computeCompo(newVectorArray, vectorArray)
    vectorArray.length = 0
    vectorArray.push(...newVectorArray)
}

function rotate(vectorArray) {
    const centerPoint = getCenterPoint(vectorArray)
    const { x0, y0 } = centerPoint
    const newVectorArray =  vectorArray.map(item => {
        const { x, y } = item
        const x1 = -y + x0 + y0
        const y1 = x -x0 + y0
        const newPoint = {
            x: x1,
            y: y1
        }
        return newPoint
    })
    const newCenterPoint = getCenterPoint(newVectorArray)
    const x1 = newCenterPoint.x0
    const y1 = newCenterPoint.y0
    const xOffset = x1 - x0
    const yOffset = y1 - y0
    if (xOffset !== 0 || yOffset !== 0) {
        justifyOffset(newVectorArray, xOffset, yOffset)
    }
    computeCompo(newVectorArray, vectorArray)
    vectorArray.length = 0
    vectorArray.push(...newVectorArray)
}

function justifyOffset(vectorArray, xOffset = 0, yOffset = 0) {
    vectorArray.forEach(item => {
        item.x -= xOffset
        item.y -= yOffset
    })
}

function getCenterPoint(vectorArray) {
    let xSum = 0
    let ySum = 0
    let count = 0
    vectorArray.forEach(item => {
        const { x, y } = item
        xSum += x
        ySum += y
        count += 1
    })
    const x0 = Math.round(xSum/count)
    const y0 = Math.round(ySum/count)
    const centerPoint = {
        x0,
        y0
    }
    console.log("centerpoint",centerPoint)
    return centerPoint
}

function vectorIsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y
}

function computeCompo(newVectorArray, vectorArray) {
    const newSet = new Set(newVectorArray.map((item) => `${item.x}-${item.y}`));
    const oldSet = new Set(vectorArray.map((item) => `${item.x}-${item.y}`));

    const delPoints = vectorArray.filter(
        (item) => !newSet.has(`${item.x}-${item.y}`)
    );
    const addPoints = newVectorArray.filter(
        (item) => !oldSet.has(`${item.x}-${item.y}`)
    );

    delPoints.forEach(item => {
        clearRectCell(ctx, item)
    })

    addPoints.forEach(item => {
        drawRectCell(ctx, item)
    })
    //  console.log(delPoints,"del")
    //  console.log(addPoints,"add")
}


export {
    move,
    rotate
}