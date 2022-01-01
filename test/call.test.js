const {call} = require("../src/compose")
test ("call",()=>{
    function add(...params){
        return {
            that:this,
            params,
        }
    }
    const obj = {a:1}
    add.call = call;
    const result = add.call(obj,1)
    expect(result.that).toBe(obj)
})