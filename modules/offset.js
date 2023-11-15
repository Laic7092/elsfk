const offset = {
    x: 0,
    y: 0
}

const _offset = {
    x: 0,
    y: 0
}

function backStep() {
    const { x, y } = _offset
    offset.x = x
    offset.y = y
}

function backup() {
    const { x, y } = offset
    _offset.x = x
    _offset.y = y
}

function addOffset(x, y) {
    backup()
    offset.x += x
    offset.y += y
}

function subOffset(x, y) {
    backup()
    offset.x -= x
    offset.y -= y
}

function getOffset() {
    return {
        ...offset
    }
}

function resetOffset() {
    offset.x = 0
    offset.y = 0
}

export {
    addOffset,
    subOffset,
    getOffset,
    resetOffset,
    backStep
}