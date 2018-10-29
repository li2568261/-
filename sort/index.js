const sortArr = [ 6, 5, 3, 1, 8, 7, 2, 4, 3];
function swap(arr,i,j){
  arr[j] = arr[j] - arr[i];
  arr[i] = arr[i] + arr[j]
  arr[j] = arr[i] - arr[j];
}
// 冒泡排序依次遍历，当前大于后进行交换位置 稳定 O(n2)
function bubleSort(arr){
  for(let i = 0; i < arr.length - 1; i++){
    for(let j = 0; j < arr.length - i - 1; j++){
      arr[j] > arr[j + 1] && swap(arr,j,j+1);
    }
  }
  return arr;
}

// 选择排序，选择最小的放在当前最前位置 稳定 O(n2)
function selectionSort(arr){
  let minPos;
  for(let i = 0; i < arr.length; i++){
    minPos = i;
    for(let j = i; j < arr.length; j++){
      minPos = arr[j] < arr[minPos] ? j : minPos;
    }
    
    minPos !== i && swap(arr, minPos, i);

  }
  return arr;
}
// 插入排序，和当前位置元素之前的所有元素比对，当遇到比它小的，就插在它后一个位置，否则当前元素后移
function  insertSort(arr){
  let temp;
  for(let i = 1; i < arr.length; i++){
    temp = arr[i];
    // 这里 j不能用 let
    for(var j = i - 1; j > -1 && temp < arr[j]; j--){
        arr[j + 1] = arr[j];
    }
    arr[j + 1] = temp;
  }
  return arr;
}
// 优化的插入排序，对比的元素距离不再是1，多了一个动态定义区间
function shellSort(arr){
  let temp,
      gap = 1;
  // 动态定义序列区间，自己随意加的一个规则
  while(gap < arr.length / 3)gap = gap * 3 + 1;
  for(gap; gap > 0; gap = Math.floor(gap / 3)){
    for(let i = 1; i < arr.length; i++){
      temp = arr[i];
      // 这里 j不能用 let
      for(var j = i - gap; j > -1 && temp < arr[j]; j = j - gap){
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}
// 归并排序，可以把整个数组拆分成n/2个有序数组，然后归并成n/4个有序数组，然后...直至一个。
function mergeSort(arr){
  let splitArr = [];
  const arrMergeFuc = (left,right)=>{
    if(right === undefined) return left;
    let result = [];
    while(left.length > 0 && right.length > 0){
      result.push(left[0] < right[0] ? left.shift() : right.shift());
    }
    return result.concat(left.length > 0 ? left : right);
  }

  const numberMergeFuc = (left, right)=>{
    if(right === undefined) return [left];
    return left < right ? [left, right] : [right, left];
  }
  // 完成数组切分
  for(let i = 0; i < arr.length / 2; i++){
    splitArr.push(numberMergeFuc(arr[2 * i], arr[2 * i + 1]))
  }
  let combinTemp;
  // 相邻两个归并
  while(splitArr.length > 1){
    combinTemp = splitArr;
    splitArr = [];
    while(combinTemp.length !== 0){
      splitArr.push(arrMergeFuc(combinTemp.shift(),combinTemp.shift()));
    }
  }
  return splitArr[0];
}
// 快速排序，通过选取基准值，对整体进行排序，比基准值小，放基准值前面，比基准值大，放基准值后面
function quickSort(arr){
  let basePos = 0,
      tempArea;
  for(let i = 0 ; i < arr.length - 1; i = basePos){
    tempArea = 0;
    for(let j = i + 1; j < arr.length; j++){
      // 划分出比基准值小的区域
      let pos = basePos + tempArea + 1;
      if(arr[basePos] > arr[j]){
        pos !== j && swap(arr,pos,j)
        tempArea++;
      }
    }
    // 排序那分出来的区域部分
    tempArea > 1 && arr.splice(
      basePos,
      tempArea + 1,
      ...bubleSort(arr.slice(basePos + 1, basePos + tempArea + 1)),
      arr[basePos]
    )
    basePos = basePos + tempArea + 1;
  }
  return arr;
}
// 堆排序在构建大根堆，小根堆的过程
function heapSort(arr){
  // 首先把数组想像成一个树，其子节点索引为 2 * i + 1,2 * i + 2
  // 找出最后一个层的最后一个非叶子节点 length / 2
  let heapLength = arr.length;
  const lastLeaf = Math.floor(arr.length / 2) - 1;
  // 三角枝丫把最大的放在根
  const itemHeapSort = index=>{
    let left = index * 2 + 1,
        right = index * 2 + 2,
        maxValueIndex = index;
    if(left < heapLength) {
      if(arr[left] > arr[maxValueIndex]) 
        maxValueIndex = left;
      if(right < heapLength && arr[right] > arr[maxValueIndex])
        maxValueIndex = right;
    }
    // 当最大值不是当前根
    if(maxValueIndex !== index){
      //把当前三角枝丫的根和叶对换，并再去排序那个叶对应的三角枝丫
      swap(arr, maxValueIndex, index);
      itemHeapSort(maxValueIndex)
    }
  }
  // 初始化大根堆树
  for(let i = lastLeaf; i >= 0 ; i--){
    itemHeapSort(i)
  }
  for(let i = heapLength - 1; i > 0; i--){
    swap(arr, 0, i);
    heapLength--;
    itemHeapSort(0);
  }
  return arr;
}
console.log(sortArr);
console.log('buble:',bubleSort([...sortArr]));
console.log('selection:',selectionSort([...sortArr]));
console.log('insert:',insertSort([...sortArr]));
console.log('shell:',shellSort([...sortArr]));
console.log('merge:',mergeSort([...sortArr]));
console.log('quick:',quickSort([...sortArr]));
console.log('heap:',heapSort([...sortArr]));