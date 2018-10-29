// 当他是两个值得时候返回
// ['a','b']['b','a']
// 从后往前的思想，每进来一个值，分别往不同的位置插入
// function permutation(arr){
//     if(arr.length == 2){
//         return [
//             [arr[0], arr[1]],
//             [arr[1], arr[0]]
//         ]
//     }
//     const result = [];

//     permutation(arr.slice(1)).map(item => {
//         for(var i = 0; i <= item.length; i++){
//             var temp = item.slice(0)
//             result.push((temp.splice(i , 0, arr[0]), temp));
//         }
        
//     });
    
//     console.log(result.length);
//     console.log('-------------');
//     return result;
    
// }

modele.exports = function permutation(arr){
    if(arr.length < 2){
        return arr;
    }
    // 初始化
    var result = [arr.splice(0, 1)]
    arr = arr.slice(0);
    var currentEl,resultTemp,sliceResultItem;
    while(arr.length){
        currentEl = arr.splice(0, 1)[0];
        resultTemp = [];
        result.forEach(val=>{
            for (var index = 0; index <= val.length; index++) {
                // 分别插插插
                sliceResultItem = val.slice(0);
                sliceResultItem.splice(index, 0, currentEl)
                resultTemp.push(sliceResultItem);
            }
        })
        result = resultTemp;
    }
    return result;
}
console.log(permutation(['a','b','c','d']));