/*
 * @Author: June
 * @Date: 2022-01-13 14:56:56
 * @LastEditTime: 2022-01-19 15:20:29
 * @LastEditors: June
 * @Description: 
 */
//curry   固定参数，延迟执行

function curry(func,...args){
    return function(...params){
        args = args.concat(params);
        if(args.length >= func.length){
            return func(...args);
        }else{
            return curry(func,...args);
        }
    }
}

// 测试

function add(a,b,c,d,e){
    return a + b + c + d + e;
}

console.log(curry(add,1)(2)(2)(2)(2));

function prefixString(prefix) {
    return function (str) {
      return "" + prefix + str;
    };
  }
  function curry(fn, ...args) {
    const len = fn.length;
    return function (...params) {
      params = [...args, ...params];
      if (params.length >= len) {
        return fn.call(this, ...params);
      } else {
        return curry(fn, ...params);
      }
    };
  }

  const a = curry(function (prefix,str) {
      return "" + prefix + str;
    },"@")

  function add(a, b, c) {
    return a + b + c;
  }


  const addA = prefixString("A-");
  const addB = prefixString("B-");

  console.log(addA("小明"));
  console.log(addB("小红"));

  console.log(curry(add, 1)(2)(2)(2)(2));

  function curryAdd(...args){
    let result = 0;
    args.forEach(ele=>result += ele)
    function _add(...params){
       params.forEach(ele=>result += ele);
       return _add;
    }
    _add.toString = ()=>{
      return result;
    }
    return _add;
  }
  console.log("add",curryAdd(1));                // f 1
  console.log("add",curryAdd(1)(1));             // f 2
  console.log("add",curryAdd(1)(1)(1));          // f 3
  console.log("add",curryAdd(1)(1)(1)(1));       // f 4
  console.log("add",curryAdd(1)(1)(1)(1)(1));    // f 5
  console.log("add",curryAdd(1)(1)(1)(1)(1)());  // f 5