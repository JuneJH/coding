const http = require("http");

http.createServer((req,res)=>{
    console.log("收到请求")
    res.end("ok")
}).listen(3000,()=>{
    console.log("serve start at 3000")
})