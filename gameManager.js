import { initQueue, getCurCompo } from "./compoQueue.js";
import { move, rotate } from "./operate.js";
document.addEventListener('keydown', inputHandler)

initQueue()
const curCompo =  getCurCompo()

function inputHandler(keyboardEvent) {
    const { key } = keyboardEvent
    switch (key.toUpperCase()) {
        case 'W':
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

setInterval(() => {
   move(curCompo, 'down')
}, 1000);