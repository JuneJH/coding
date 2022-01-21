function Events(){
    this._cache = {};
}
Events.prototype.on = function(type,handle){
    console.log('on',type)
    if(!this._cache[type]){
        this._cache[type] = [];
    }
    this._cache[type].push(handle)

}
Events.prototype.off = function(type,handle){
    if(!this._cache[type]) return;
    this._cache[type] = this._cache[type].filter(fn=>fn !== handle && fn.origin != handle)

}
Events.prototype.once = function(type,handle){
    const that = this;
    function only(...args){
        handle(...args)
        that.off(type,handle);
    }
    only.origin = handle;
    this.on(type,only);
}
Events.prototype.emit = function(type,...args){
    if(!this._cache[type]) return;
    this._cache[type].forEach(fn=>{
        fn.call(this,...args)
    })
}

module.exports = {
    Events
}