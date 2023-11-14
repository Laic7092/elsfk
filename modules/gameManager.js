import BlockQueue from "./blockQueue.js"
import { move, rotate } from "./operate.js"
import eventCenter from "../pub-sub/eventCenter.js"

document.addEventListener('keydown', inputHandler)
eventCenter.on("gg", ggCallBack)


let intervalId = ''
gameStart()

function ggCallBack() {
    stopGame(intervalId)
    gameStart()
}

function inputHandler(keyboardEvent) {
    if (!intervalId) return
    const { key } = keyboardEvent
    const top = BlockQueue.top
    switch (key.toUpperCase()) {
        case 'W':
            rotate(top)
            break;
        case 'A':
            move(top, 'left')
            break;
        case 'S':
            move(top, 'down')
            break;
        case 'D':
            move(top, 'right')
            break;

        default:
            break;
    }
}

function gameStart() {
    intervalId = setInterval(() => {
        move(BlockQueue.top, 'down')
    }, 500);
}

function stopGame(id) {
    clearInterval(id)
}

