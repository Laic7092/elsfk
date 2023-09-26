import { getCenterPoint ,vectorAdd, updateVectorArray } from '../utils.js'
import { drawRectCell, clearRectCell, canChange, lockCompo } from './gamePanel.js';
import { addOffset, subOffset, getOffset, backStep } from './offset.js';
import { col } from '../constant.js';

const unitVectorEnum = {
    down: {x: 0, y: 1},
    left: {x:-1, y: 0},
    right: {x:1, y: 0}
}

function move(vectorArray, direction) {
    const newVectorArray = vectorArray.map(item => {
        const unitVector = unitVectorEnum[direction]
        return vectorAdd(item, unitVector)
    })
    if (canChange(newVectorArray)) {
        computeCompo(newVectorArray, vectorArray)
        updateVectorArray(vectorArray, newVectorArray)
    } else if (direction === 'down') {
        lockCompo(vectorArray)
    }

}

function rotate(vectorArray) {
    const centerPoint = getCenterPoint(vectorArray)
    const { x0, y0 } = centerPoint
    const newVectorArray =  vectorArray.map(item => {
        const { x, y } = item
        const x1 = -y + x0 + y0
        const y1 = x -x0 + y0
        return {
            x: x1,
            y: y1
        }
    })
    computeOffset(newVectorArray)
    if (!canChange(newVectorArray)) {
        backStep()
        return
    }
    computeCompo(newVectorArray, vectorArray)
    updateVectorArray(vectorArray, newVectorArray)
}

function computeOffset(vectorArray) {
    const len = vectorArray.length
    let xOffsetSum = 0
    let yOffsetSum = 0
    vectorArray.forEach(item => {
        const { x , y } = item
        const x1 = Math.floor(x)
        const y1 = Math.floor(y)
        xOffsetSum += x - x1
        yOffsetSum += y - y1
        item.x = x1
        item.y = y1
    })
    const averageXOffset = xOffsetSum/len
    const averageYOffset = yOffsetSum/len
    addOffset(averageXOffset, averageYOffset)
    // debugger
    // console.log(averageXOffset, averageYOffset,"平均偏移")
    const pastOffset = getOffset()
    const { x, y } = pastOffset
    if ( x >= 1 || y >= 1) {
        let xOffset = x - 1 >= 0 ? 1 : 0
        let yOffset = y - 1 >= 0 ? 1 : 0
        subOffset(xOffset, yOffset)
        justifyOffset(vectorArray, xOffset ,yOffset)
    }
    const lastLine = col - 1
    let min = 0
    let max = lastLine
    vectorArray.forEach(item => {
        const { x } = item
        if (x < min) {
            min = x
        } else if (x > max) {
            max = x
        }
    })
    if (min !== 0 || max !== lastLine) {
        justifyOffset(vectorArray, min === 0 ? lastLine - max : 0 - min)
    }
}

function justifyOffset(vectorArray, xOffset = 0, yOffset = 0) {
    vectorArray.forEach(item => {
        item.x += xOffset
        item.y += yOffset
    })
}

function computeCompo(newVectorArray, vectorArray) {
    const newSet = new Set(newVectorArray.map((item) => `${item.x}*${item.y}`))
    vectorArray.forEach(item => {
        const { x , y } = item
        const key = `${x}*${y}`
        if (!newSet.has(key)) {
            clearRectCell(item)
        } else {
            newSet.delete(key)
        }
    })
    newSet.forEach(item => {
        const [x, y] = item.split('*');
        drawRectCell({
            x,
            y
        })
    })
    //  console.log(delPoints,"del")
    //  console.log(addPoints,"add")
}

export {
    move,
    rotate
}