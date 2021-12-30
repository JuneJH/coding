const {ajax} = require("../src/ajax")
test ("ajax",()=>{
    const result = ajax("get","http://localhost:3000/");
    expect(result).toBe("ok")
})