import { initQueue, getCurCompo, compoFactory } from "./compoQueue.js"
import { move, rotate } from "./operate.js"
import eventCenter from "./pub-sub/eventCenter.js"

document.addEventListener('keydown', inputHandler)
eventCenter.on("jumpQueue", jumpQueueCallBack)
eventCenter.on("gg", ggCallBack)

initQueue()
let curCompo = getCurCompo()
gameStart()

function jumpQueueCallBack() {
    curCompo = getCurCompo()
}

function ggCallBack(params) {
    let a = confirm("gg")

}

// test()
function inputHandler(keyboardEvent) {
    const { key } = keyboardEvent
    switch (key.toUpperCase()) {
        case 'W':
            rotate(curCompo)
            break;
        case 'A':
            move(curCompo, 'left')
            break;
        case 'S':
            move(curCompo, 'down')
            break;
        case 'D':
            move(curCompo, 'right')
            break;

        default:
            break;
    }
}

function gameStart() {
    setInterval(() => {
        curCompo = getCurCompo()
        move(curCompo, 'down')
    }, 500);
}

function test() {
    let a = 0
    setInterval(() => {
        move(curCompo,'down')
    }, 100);

    setInterval(() => {
        enQueue(compoFactory((a++%7)))
        deQueue()
        curCompo = getCurCompo()
    }, 2000);
}
