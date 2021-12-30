const ajax  = (method,url)=>{
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.send();
        xhr.onreadystatechange = e=>{
            if(e.target.readyState){
                if(e.target.status){
                    
                }
            }
        }
    })
}