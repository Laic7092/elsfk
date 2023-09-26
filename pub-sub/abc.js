import eventCenter from "./eventCenter.js";


const cb = (evt) => {
    //console.log("hh", evt)
}
//eventCenter.on("abc", cb)

setTimeout(() => {
    const evt = "dassd"
    eventCenter.emit("abc",evt)
}, 1000)


setTimeout(() => {
    eventCenter.off("abc", cb)
}, 3000)


setTimeout(() => {
    const evt = "dassd"
    eventCenter.emit("abc",evt)
}, 6000)