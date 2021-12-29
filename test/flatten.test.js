const {compose} = require("../src/compose")
test ("compose",()=>{
    function add(a){
        return a + 10;
    }
    function d (a){
        return a * 10;
    }
    const fn = compose(add,d);
    const result = fn(10);
    expect(result).toBe(110)
})