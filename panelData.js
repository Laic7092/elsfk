import { row, col } from "./constant.js"
const panel = initPanelData()

function initPanelData() {
    const panel = new Array(col);
    for (let i = 0; i < col; i++) {
        panel[i] = new Array(row).fill(0);
    }
    return panel;
}

function fillCell(x, y) {
    panel[x][y] = 1
}

// function initPanelData() {
//     //这样填充的都是同一个二维数组..无语
//     const panel = new Array(col).fill(new Array(row).fill(0))
//     console.log(panel[0] === panel[1],"啊")
//     return panel
// }

function isCellFilled({ x, y }) {
    try {
        return panel[x][y] === 1
    } catch (error) {
        console.log("error", x , y)
    }
}

function checkLineClearable(y) {
    if (panel.every(item => item[y] === 1)) {
        panel.forEach((item, x) => {
            item[y] = 0
        })
        return true
    }
    return false
}

export {
    fillCell,
    isCellFilled,
    checkLineClearable
}