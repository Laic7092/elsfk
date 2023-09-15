const compos = [
    [
        [1,1,1,1],
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [0,1,0],
        [1,1,1]
    ],
    [
        [1,1],
        [0,1],
        [0,1]
    ],
    [
        [1,1],
        [1,0],
        [1,0]
    ],
    [
        [1,0],
        [1,1],
        [0,1]
    ],
    [
        [0,1],
        [1,1],
        [1,0]
    ],
]

const compoQueue = []

function initQueue() {
    enQueue(compoFactory())
    enQueue(compoFactory())
}

function enQueue(item) {
    compoQueue.push(item)
}

function deQueue() {
    return compoQueue.shift()
}

function getCurCompo() {
    return compoQueue[0]
}

function compoFactory(num) {
    let randomInteger = Math.floor(Math.random() * 7);
    // aa[randomInteger] += 1
    if (num !== undefined) {
        randomInteger = num
    }
    const vectorArray = transCompoToVector2(compos[randomInteger])
    return vectorArray
}

function transCompoToVector2(compo) {
    //下注点上移四个格子,应该是(4,-3)
    //从base点开始
    const basePoint = {
        x: 4,
        y: -3
    }
    let xOffset = 0
    let yOffset = 0
    const res = []
    compo.forEach(element => {
        xOffset = 0
        element.forEach(cELement => {
            if (cELement === 1) {
                const point = {
                    x: basePoint.x + xOffset,
                    y: basePoint.y + yOffset
                }
                res.push(point)
            }
            xOffset++
        });
        yOffset++
    });
    return res
}

function test() {
    const aa = new Array(7).fill(0)
    let cnt = 0
    while(cnt <= 100000000) {
        cnt += 1
        compoFactory()
    }
    // console.log(aa)
}

export {
    initQueue,
    getCurCompo,
    compoFactory,
    enQueue,
    deQueue
}

