import { initQueue, getCurCompo, compoFactory } from "./compoQueue.js"
import { move, rotate } from "./operate.js"
import eventCenter from "../pub-sub/eventCenter.js"

document.addEventListener('keydown', inputHandler)
// eventCenter.on("gs", gsCallBack)
eventCenter.on("gg", ggCallBack)
eventCenter.on("jumpQueue", jumpQueueCallBack)


initQueue()
let curCompo = getCurCompo()
let intervalId = ''
gameStart()

// function gsCallBack() {
//     gameStart()
// }

function ggCallBack() {
    stopGame(intervalId)
    gameStart()
}

function jumpQueueCallBack() {
    curCompo = getCurCompo()
}

// test()
function inputHandler(keyboardEvent) {
    if (!intervalId) return
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
    intervalId = setInterval(() => {
        curCompo = getCurCompo()
        move(curCompo, 'down')
    }, 500);
}

function stopGame(id) {
    clearInterval(id)
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
