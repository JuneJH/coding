//call
Function.prototype.myCall = function (obj, ...args) {
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window;
    }
    const func = Symbol('func');
    obj[func] = this;
    const result = obj[func](...args);
    delete obj[func];
    return result;
}
Function.prototype.myCall = function (context,...args){
    if(typeof context === "symbol"){
        throw new Error("暂时不能处理Symbol对象")
    }
   if(context == null){
       context = window;
   }
   if(typeof context != "object"){
       context = new context.constructor(context)
   }
   const func = Symbol("func");
   context[func] = this;
   const result = context[func](...args);
   delete context[func];
   return result;
}

// apply
Function.prototype.myApply = function () {
    let [obj, args] = Array.from(arguments);
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window;
    }
    const func = Symbol('func')
    obj[func] = this;
    const result = obj[func](...args);
    delete obj[func];
    return result;
}
//bind 
// 1. 当一个函数调用bind时，可传入参数为第一个需要绑定的this对象，后面参数选择传递
// 2. 调用bind后返回一个新的函数，该函数的功能为原函数，只是改变了this指向
// 3. 此时如果还有参数，将拼接到第一步的参数后面
// 4. 如果是new执行该函数，新的对象的构造函数指向认识原函数，且bind返回的函数以及传递所改变的this没有任何作用

Function.prototype.myBind = function () {
    //解构参数
    let [obj, ...args] = Array.from(arguments);
    //检查是否传入改变this的对象
    if (!obj) {
        obj = typeof window == 'undefined' ? gboal : window
    }
    //保存函数
    const func = this;
    //继承中介
    const temp = function () {};
    // 返回函数
    function Fn(...runArgs){
        //是否是new执行，此时不改变this指向，constructor  
        if(new.target){
            obj = this
        }
        // 因为最后会删除func这个属性，所以每次执行需要赋值
        if(!obj.func){
            obj.func = func;
        }
        const result = obj.func(...args,...runArgs);
        delete obj.func;
        return result;
    }
    // 继承原型
    temp.prototype = func.prototype;
    Fn.prototype = new temp();
    return Fn
}

Function.prototype.myBind = function (context,...args){
    if(typeof context === "symbol"){
        throw new Error("暂时不能处理Symbol对象")
    }
   if(context == null){
       context = window;
   }
   if(typeof context != "object"){
       context = new context.constructor(context)
   }

   const func = this;
   
   function Fn(...fnArgs){
       if(new.target){
           context = this;
       }
   }

   

}

function test(...val) {
    console.log(...val)
    console.log('this:',this)
    // return val
}
const obj = {
    a: 1,
    b: 2,
}


// test.myCall(obj,12);
// test.myApply();
const newFn = test.myBind(obj,12)
// console.log(new newFn().constructor)

module.exports = {
    call
}