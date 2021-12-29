function compose (...fn){
    if(fn.length === 0){
        return args=>args
    }
    if(fn.length === 1){
        return fn[0]
    }
    return fn.reduce((a,b)=>(...args)=>a(b(...args)))
}

module.exports = {
    compose
}