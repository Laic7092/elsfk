import { deepCopy } from "../utils.js";

const blocks = [
    [
        [1, 1, 1, 1],
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    [
        [1, 1],
        [0, 1],
        [0, 1]
    ],
    [
        [1, 1],
        [1, 0],
        [1, 0]
    ],
    [
        [1, 0],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 0]
    ],
]

const vBlocks = blocks.map(transBlockToVector2)

function blockFactory(num) {
    let randomInteger = Math.floor(Math.random() * 7);
    //这段是为了后续支持固定的方块
    if (num !== undefined) {
        randomInteger = num
    }
    return deepCopy(vBlocks[randomInteger])
}

function transBlockToVector2(block) {
    //下注点上移四个格子,应该是(4,-3)
    //从base点开始
    const basePoint = {
        x: 4,
        y: -3
    }
    let xOffset = 0
    let yOffset = 0
    const res = []
    block.forEach(element => {
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

class BlockQueue {
    constructor() {
        this.blockQueue = []
        this.top = null
        this.initQueue()
    }

    initQueue() {
        this.enQueueDefault()
        this.enQueueDefault()
        this.setTop()
    }

    enQueueDefault() {
        this.blockQueue.push(blockFactory())
    }

    enQueue(item) {
        this.blockQueue.push(item)
    }

    deQueue() {
        const res = this.blockQueue.shift()
        this.setTop()
        return res
    }

    jumpQueue(item) {
        this.blockQueue.unshift(item)
        this.setTop()
    }

    getCurBlock() {
        return this.blockQueue[0]
    }

    setTop() {
        this.top = this.blockQueue[0]
    }
}

window.abc = new BlockQueue()
// export default new BlockQueue()
export default window.abc

