/*
 * @Author: June
 * @Date: 2022-01-13 14:57:13
 * @LastEditTime: 2022-01-19 15:20:18
 * @LastEditors: June
 * @Description: 
 */
// 克隆
function clone(obj){
    if(obj instanceof Array){
        return cloneArray(obj)
    }else if (obj instanceof Object){
        return cloneObj(obj)
    }else{
        return obj;
    }
}

function cloneArray(arr){
    const result = new Array(arr.length);
    for(let i = 0; i < arr.length; i ++){
        if(arr[i] instanceof Object){
            result.push(clone(arr[i]))
        }else{
            result.push(arr[i]);
        }
    }
    return result;
}
function cloneObj(obj){
    const result = {};
    Object.getOwnPropertyNames(obj).forEach(ele=>{
        if(ele instanceof Object){
            result[ele] = clone(obj[ele])
        }else{
            result[ele] = obj[ele];
        }
    })
    return result
}

const obj = {
    a:[1,2,3,4,5],
    b:123,
    c:'abc',
    d:{x:12,y:12}
}

console.log(clone(obj));