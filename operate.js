import { getCenterPoint ,vectorAdd, updateVectorArray } from './utils.js'
import { drawRectCell, clearRectCell, canChange, lockCompo } from './gamePanel.js';

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
    const newCenterPoint = getCenterPoint(newVectorArray)
    const x1 = newCenterPoint.x0
    const y1 = newCenterPoint.y0
    const xOffset = x1 - x0
    const yOffset = y1 - y0
    if (xOffset !== 0 || yOffset !== 0) {
        justifyOffset(newVectorArray, xOffset, yOffset)
    }
    if (!canChange(newVectorArray)) return
    computeCompo(newVectorArray, vectorArray)
    updateVectorArray(vectorArray, newVectorArray)
}

function justifyOffset(vectorArray, xOffset = 0, yOffset = 0) {
    vectorArray.forEach(item => {
        item.x -= xOffset
        item.y -= yOffset
    })
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
        clearRectCell(item)
    })

    addPoints.forEach(item => {
        drawRectCell(item)
    })
    //  console.log(delPoints,"del")
    //  console.log(addPoints,"add")
}

export {
    move,
    rotate
}