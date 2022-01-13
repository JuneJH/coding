const call  = (method,url)=>{
    if (!obj) {
        obj = typeof window === 'undefined' ? global : window;
    };
    const func = Symbol('func');
    obj[func] = this;
    const result = obj[func](...args);
    delete obj[func];
    return result;
}

module.exports = {
    call
}