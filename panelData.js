import { row, col } from "./constant.js"
import { log } from "./utils.js";
const panel = initPanelData()

function initPanelData() {
    //改成20 * 10,方便行操作
    const panel = new Array(row);
    for (let i = 0; i < row; i++) {
        panel[i] = new Array(col).fill(0);
    }
    return panel;
}

function fillCell(x, y) {
    panel[y][x] = 1
}

function clearCell(x, y) {
    panel[y][x] = 0
}

// function initPanelData() {
//     //这样填充的都是同一个二维数组..无语
//     const panel = new Array(col).fill(new Array(row).fill(0))
//     console.log(panel[0] === panel[1],"啊")
//     return panel
// }

function isCellFilled({ x, y }) {
    if (y < 0) {
        return false
    }
    return panel[y][x] === 1
}





function checkLineClearable(y) {
    const line = panel[y]
    const clearAble = line.every(item => item === 1)
    if (clearAble) {
        line.fill(0)
    }
    return clearAble
}

function getToBeMovedCompo(delLineArray) {
    //这里由于实物,panel是10*20,panel[x][y],简单来说,读取panel[x],得到的是一列...
    //并不能直接读取某行,待修改...
    // const len = delLineArray.length

    //改成20*10了,希望好写一点
    const bottom = Math.min(...delLineArray)
    const vectorArray = []
    for (let y = 0; y < bottom; y++) {
        const line = panel[y]
        line.forEach((element,x) => {
            if (element === 1) {
                vectorArray.push({
                    x,
                    y
                })
            }
            //clearCell(x, y)
        });
        line.fill(0)
    }
    log("计算顶部后", panel)
    return vectorArray
}


export {
    fillCell,
    isCellFilled,
    checkLineClearable,
    getToBeMovedCompo
}