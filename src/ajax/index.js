/*
 * @Author: June
 * @Date: 2022-01-11 15:20:20
 * @LastEditTime: 2022-01-13 14:38:59
 * @LastEditors: June
 * @Description: 
 */
const {fakeXhr} = require("nise")
const ajax  = (method,url)=>{
    return new Promise((resolve,reject)=>{
        const xhr =  fakeXhr.useFakeXMLHttpRequest();
        console.log(xhr)
        xhr.open(method,url);
        xhr.send();
        xhr.onreadystatechange = e=>{
            if(e.target.readyState === 4){
                if(e.target.status === 200){
                    resolve(e.target.response)
                }else{
                    reject("出错了")
                }
            }
        }
    })
}
ajax("get","/call.js")
module.exports = {
    ajax
}