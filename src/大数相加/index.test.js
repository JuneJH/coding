const {
    add
} = require("./index")

describe("测试大数相加",()=>{
    it("大数相加",()=>{
        expect(add(1,1)).toBe("2")
    })
})

