//这是一个发布订阅模式,eventCenter返回一个对象,all属性是一个Map,根据事件名和对应回调存储
//例如事件 key: 'click', value: [fn1,fn2]

export default function pubSub(all = new Map()) {
    function on(type, handler) {
        const handlers = all.get(type)
        if (handlers) {
            handlers.push(handler)
        } else {
            all.set(type, [handler])
        }
        console.log('on' ,all);
    }
    function off(type, handler) {
        const handlers = all.get(type)
        if (handlers) {
            if (handler) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1)
            }
            else {
                handlers.set(type, [])
            }
            console.log('off' ,all);
        }
    }
    function emit(type ,evt) {
        const handlers = all.get(type)
        if (handlers) {
            handlers.slice().map(handler => handler(evt))
            console.log('emit' ,type, evt);
        }
    }

    return {
        all,
        on,
        off,
        emit
    }
}