class Vector2 {
    // x = 0;
    // y = 0;
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
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
    // const x0 = Math.round(xSum/count)
    // const y0 = Math.round(ySum/count)
    const x0 = xSum/count
    const y0 = ySum/count
    const centerPoint = {
        x0,
        y0
    }
    //console.log("centerpoint",centerPoint)
    return centerPoint
}

function vectorIsEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y
}

function vectorAdd(vector1, vector2) {
    const { x, y  } = vector1
    const x1 = vector2.x
    const y1 = vector2.y
    return {
        x: x + x1,
        y: y + y1
    }
}

function vectorSub(vector1, vector2) {
    const { x, y  } = vector1
    const x1 = vector2.x
    const y1 = vector2.y
    return {
        x: x - x1,
        y: y - y1
    }
}

//替换原数组中的内容
function updateVectorArray(vectorArray, newVectorArray) {
    vectorArray.splice(0, vectorArray.length, ...newVectorArray);
}

function log(str,data) {
    console.log(str, JSON.parse(JSON.stringify(data)))
}

export {
    getCenterPoint,
    vectorAdd,
    vectorSub,
    updateVectorArray,
    log
}