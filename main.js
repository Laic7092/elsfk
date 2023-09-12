window.addEventListener('load', initMountedElement)

const cellSize = 40
let ctx = null
//20x10的网格,每个网格
//假设每个网格40px的方形...

class Vector2 {
    // x = 0;
    // y = 0;
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
}

const compos = [
    [
        [1,1,1,1],
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [0,1,0],
        [1,1,1]
    ],
    [
        [1,1],
        [0,1],
        [0,1]
    ],
    [
        [1,1],
        [1,0],
        [1,0]
    ],
    [
        [1,0],
        [1,1],
        [0,1]
    ],
    [
        [0,1],
        [1,1],
        [1,0]
    ],
]

function initMountedElement() {
    const gamePanel = document.getElementById('gamePanel')
    gamePanel.setAttribute('width','400px')
    gamePanel.setAttribute('height','800px')
    gamePanel.classList.add('gamePanel')
    //Canvas 的默认大小为 300 像素 ×150 像素（宽 × 高，像素的单位是 px）
    if (gamePanel.getContext) {
        ctx = gamePanel.getContext("2d");
        drawPanel(ctx)
      } else {
        // canvas-unsupported code here
      }


}

function drawPanel(ctx) {
    const cellSize = 40
    const row = 20
    const col = 10
    ctx.strokeStyle = '#d8453d'
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ctx.strokeRect(j*cellSize, i*cellSize, cellSize, cellSize)
        }

    }
}

function drawRectCell(ctx, position) {
    const { x, y } = position
    ctx.fillStyle = "#04be02";
    ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function clearRectCell(ctx, position) {
    const { x, y } = position
    ctx.clearRect(x * cellSize + 1, y * cellSize + 1, cellSize -2, cellSize -2)
}

function transCompoToVector2(compo) {
    //下注点上移四个格子,应该是(4,-3)
    //从base点开始
    const basePoint = {
        x: 4,
        y: -3
    }
    let xOffset = 0
    let yOffset = 0
    const res = []
    compo.forEach(element => {
        xOffset = 0
        element.forEach(cELement => {
            if (cELement === 1) {
                const point = {
                    x: basePoint.x + xOffset,
                    y: basePoint.y + yOffset
                }
                res.push(point)
            }
            xOffset++
        });
        yOffset++
    });
    return res
}

function drawCompo(vectorArray) {
    vectorArray.forEach(item => {
        drawRectCell(ctx, item)
    })
}

function down(vectorArray) {
    const newVectorArray = vectorArray.map(item => {
         const newPoint = { ...item }
         newPoint.y += 1
         return newPoint
     })
     computeCompo(newVectorArray,vectorArray)
     vectorArray.length = 0
     vectorArray.push(...newVectorArray)
 }

 function vectorIsEqual(point1, point2) {
     return point1.x === point2.x && point1.y === point2.y
 }

 function computeCompo(newVectorArray,vectorArray) {
     const newSet = new Set(newVectorArray.map((item) => `${item.x}-${item.y}`));
     const oldSet = new Set(vectorArray.map((item) => `${item.x}-${item.y}`));

     const delPoints = vectorArray.filter(
       (item) => !newSet.has(`${item.x}-${item.y}`)
     );
     const addPoints = newVectorArray.filter(
       (item) => !oldSet.has(`${item.x}-${item.y}`)
     );

     delPoints.forEach(item => {
         clearRectCell(ctx, item)
     })

     addPoints.forEach(item => {
         drawRectCell(ctx, item)
     })
     console.log(delPoints,"del")
     console.log(addPoints,"add")

 }
