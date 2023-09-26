window.addEventListener('load',() => {
    scoreEle = document.querySelector('#score')
    setScore()
})
let score = 0
let scoreEle = null
function setScore() {
    scoreEle.innerText = score
}

function getScore() {
    score += 1
    setScore()
}

function gg(params) {
    score = 0
}

export {
    getScore
}