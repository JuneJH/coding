const ajax  = (method,url)=>{
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
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

module.exports = {
    ajax
}