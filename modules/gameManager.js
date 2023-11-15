import eventCenter from "../pub-sub/eventCenter.js"
import { blockQueue } from './instance.js'
import { move, rotate } from "./operate.js"

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
    const top = blockQueue.top
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
        move(blockQueue.top, 'down')
    }, 500);
}

function stopGame(id) {
    clearInterval(id)
}

