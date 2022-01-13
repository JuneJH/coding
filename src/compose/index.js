/*
 * @Author: June
 * @Date: 2022-01-13 14:56:45
 * @LastEditTime: 2022-01-13 14:59:11
 * @LastEditors: June
 * @Description: 
 */
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