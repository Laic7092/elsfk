import eventCenter from "../pub-sub/eventCenter.js";
window.addEventListener('load',() => {
    scoreEle = document.querySelector('#score')
    highestScoreEle = document.querySelector('#highestScore')
    highestScore = parseInt(localStorage.getItem("highestScore")) || 0
    setScore(scoreEle)
    setScore(highestScoreEle)
})
eventCenter.on("gg", ggCallBack)
let score = 0
let highestScore = 0
let scoreEle = null
let highestScoreEle = null


function setScore(ele) {
    ele.innerText = score
}

function getScore() {
    score += 1
    setScore(scoreEle)
}

function ggCallBack() {
    debugger
    if (score > highestScore) {
        highestScore = score
        localStorage.setItem("highestScore", highestScore)
    }
    score = 0
}

export {
    getScore
}