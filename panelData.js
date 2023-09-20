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

function clearCell(x, y) {
    panel[x][y] = 0
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

function getToBeMovedCompo(delLineArray) {
    //这里由于实物,panel是10*20,panel[x][y],简单来说,读取panel[x],得到的是一列...
    //并不能直接读取某行,待修改...
    // const len = delLineArray.length
    const bottom = Math.min(...delLineArray)
    const vectorArray = []
    for (let x = 0; x < col; x++) {
        const colEle = panel[x]
        for (let y = 0; y < bottom; y++) {
            const cell = colEle[y];
            if (cell === 1) {
                vectorArray.push({
                    x,
                    y
                })
                clearCell(x, y)
                // fillCell(x, y + len)
            }
        }
    }
    // console.log("我不信", panel)
    return vectorArray
}


export {
    fillCell,
    isCellFilled,
    checkLineClearable,
    getToBeMovedCompo
}