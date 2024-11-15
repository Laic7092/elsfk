import eventCenter from "../pub-sub/eventCenter.js"
import { blockQueue } from './instance.js'
import { move, rotate } from "./operate.js"

document.addEventListener('keydown', inputHandler)
eventCenter.on("gg", ggCallBack)

const useDirection = (g, cb) => {
    let startX = 0
    let startY = 0
    let direction
    g.addEventListener('touchstart', (e) => {
        e.cancelable && e.preventDefault();
        const { clientX, clientY } = e.changedTouches[0];
        [startX, startY] = [clientX, clientY]
    }, {
        passive: false
    })
    g.addEventListener('touchend', (e) => {
        e.cancelable && e.preventDefault();
        const { clientX, clientY } = e.changedTouches[0]
        let [x, y] = [startX - clientX, startY - clientY]
        if (Math.abs(x) < 1 && Math.abs(y) < 1) return
        direction = Math.abs(x) > Math.abs(y)
            ? x < 0
                ? 'right'
                : 'left'
            : y < 0
                ? 'down'
                : 'up'
        cb(direction)
    }, {
        passive: false
    })
}

window.addEventListener('load', () => {
    const panelELe = document.querySelector('.gamePanel')
    useDirection(panelELe, (direction) => {
        const top = blockQueue.top
        if (direction !== 'up') {
            move(top, direction)
        }
    })
})

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

