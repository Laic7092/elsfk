export class GamePanel {
    constructor(ctx, row, col, cellSize, width, height) {
        this.row = row
        this.col = col
        this.cellSize = cellSize
        this.ctx = ctx
        this.width = width
        this.height = height
        this.drawPanel()
    }

    drawPanel() {
        const ctx = this.ctx
        ctx.strokeStyle = '#d8453d'
        const { row, col, cellSize } = this
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize)
            }
        }
    }

    drawRectCell(position) {
        const { cellSize } = this
        const { x, y } = position
        this.ctx.fillStyle = "#04be02";
        this.ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)
    }

    clearRectCell(position) {
        const { cellSize } = this
        const { x, y } = position
        this.ctx.clearRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2)
    }

    clearRow(y) {
        const { col } = this
        for (let x = 0; x < col; x++) {
            this.clearRectCell({
                x,
                y
            })
        }
    }

    drawCompo(vectorArray) {
        vectorArray.forEach(item => {
            this.drawRectCell(item)
        })
    }

    reRraw() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawPanel()
    }
}