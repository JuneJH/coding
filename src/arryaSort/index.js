/*
 * @Author: June
 * @Date: 2022-01-13 14:58:02
 * @LastEditTime: 2022-01-13 14:58:56
 * @LastEditors: June
 * @Description: 
 */
// 快排
function change(arr,left,right){
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}
const quickSort  = (arr)=>{
    function _quickSort(arr,start,end){
        console.log(arr,start,end)
        const len = arr.length;
        if(len === 0 || start > end - 1 || start > len)return;
        let left =start,right = end;
        do{
            do left ++; while(arr[left] < arr[start] && left < right);
            do right --; while(arr[right] > arr[start] && left < right);
            if(left < right){
                change(arr,left,right)
            }
        }while(left < right)
        const middleIndex = left === right ? right - 1:right;
        change(arr,start,middleIndex);
        _quickSort(arr,start,middleIndex);
        _quickSort(arr,middleIndex + 1,end)
    }
    _quickSort(arr,0,arr.length);
}
const arr = [2,3,4,9,1,8,7,6,5]
console.log(quickSort(arr),arr)


module.exports = {
    quickSort
}