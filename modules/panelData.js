import { row, col } from "../constant.js"
import { enQueue, deQueue, compoFactory, jumpQueue } from "./compoQueue.js"
import { clearRow } from "./gamePanel.js"
import { resetOffset } from "./offset.js"
import { getScore } from "./score.js";
// import { log } from "../utils.js";
import eventCenter from "../pub-sub/eventCenter.js";

eventCenter.on("gg", ggCallBack)

const panel = initPanelData()

function ggCallBack() {
    for (let i = 0; i < row; i++) {
        panel[i] = new Array(col).fill(0);
    }
}

//初始化一个 20 * 10 二维数组,方便对整行移除
function initPanelData() {
    const panel = new Array(row);
    for (let i = 0; i < row; i++) {
        panel[i] = new Array(col).fill(0);
    }
    return panel;
}

//方块堆叠到最顶层代表游戏结束
function fillCell(x, y) {
    if (y <= 0) {
        eventCenter.emit("gg")
        return
    }
    panel[y][x] = 1
}

function clearCell(x, y) {
    panel[y][x] = 0
}

//检查当前网格是否被填充, 因为方块默认从-4高度开始,所以不计算y < 0的情况
function isCellFilled({ x, y }) {
    if (y < 0) {
        return false
    }
    return panel[y][x] === 1
}

function isInPanel({ x, y }) {
    return (x >= 0 && x < col) && (y >= -4 && y < row)
}

function canChange(vectorArray) {
    const allInPanel = vectorArray.every(item => isInPanel(item))
    if (!allInPanel) return false
    const allCellEmpty = vectorArray.findIndex(item => isCellFilled(item)) === -1
    return allInPanel && allCellEmpty
}

//检查当前行是否可删除
function checkLineClearable(y) {
    if (y <= 0 ) return false
    const line = panel[y]
    const clearAble = line.every(item => item === 1)
    if (clearAble) {
        line.fill(0)
    }
    return clearAble
}

function lockCompo(vectorArray) {
    const delLineArray = []
    vectorArray.forEach(item => {
        const { x ,y } = item
        fillCell(x, y)
        if (checkLineClearable(y)) {
            delLineArray.push(y)
        }
    })
    deQueue()
    resetOffset()
    if (delLineArray.length > 0) {
        delLineArray.forEach(y => {
            clearRow(y)
            getScore()
        })
        const vectorArray = getToBeMovedCompo(delLineArray)
        jumpQueue(vectorArray)
    }
    enQueue(compoFactory())
}

//这里把整个顶部作为compo插入的队列顶端,从而让其自动下移
function getToBeMovedCompo(delLineArray) {
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
        });
        line.fill(0)
    }
    //log("计算顶部后", panel)
    return vectorArray
}

export {
    canChange,
    lockCompo,
}