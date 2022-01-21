/*
 * @Author: June
 * @Date: 2022-01-13 14:57:04
 * @LastEditTime: 2022-01-20 15:06:54
 * @LastEditors: June
 * @Description: 
 */
//防抖，搜索，拖拽
function debounce(handle,delay){
    let timer = null;
    return function (...args){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            handle.call(this,...args);
        },delay)
    }
}
/**
 * 防抖和节流的区别在与，一个后执行，一个先执行
 * 防抖就是，用户多次触发，但是只把最后触发的作为结果
 * 节流就是，用户多次触发，但是是吧第一次触发作为结果
 *  
 */

//节流，函数只有在大于或等于执行周期才执行  窗口调整，页面滚动，抢购疯狂点击

function throttle(handle,wait){
    let lastTime = 0;
    return function (...args){
        let nowTime = +new Date();
        if(nowTime - lastTime > wait){
            handle.call(this,...args);
            lastTime = nowTime;
        }
    }
}

// 测试
function clickHandel (){
    console.log(this.value)
}
const dom = document.getElementById('debounce');
dom.oninput = debounce(clickHandel,1000)

const domShow = document.getElementById('show');
const domBtn = document.getElementById('btn');
function clickAdd(){
    domShow.innerText = +(domShow.innerText) + 1;
}
domBtn.onclick = throttle(clickAdd,1000);