const offset = {
    x: 0,
    y: 0
}

function addOffset(x, y) {
    offset.x += x
    offset.y += y
}

function subOffset(x, y) {
    offset.x -= x
    offset.y -= y
}

function getOffset() {
    return offset
}

function resetOffset() {
    offset.x = 0
    offset.y = 0
}

export {
    addOffset,
    subOffset,
    getOffset,
    resetOffset
}