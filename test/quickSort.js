const {quickSort} = require("../src/quickSort")
test ("quickSort",()=>{
    const arr = [2,3,5,7,9,1,4,6,8]
    const result = quickSort(arr)
    expect(result.join(",")).toBe("1,2,3,4,5,6,7,8,9")
})