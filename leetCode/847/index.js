
/**
 * 
 * @param {*} arr 
 * @param {*} val 
 */
var removeArrayItem = function(arr, val){
    arr.splice(arr.findIndex(item=>item ==val), 1);
}
/**
 * @param {number[][]} graph
 * @return {number}
 */
// 算出点到点最短路径，然后通过排列组合计算出各种顺序的最短路径，求最短
var shortestPathLength = function(graph) {
    if(graph.length < 2)return 0;
    const mapGraph = graph.map(item=>{
        const tempArr = [];
        item.forEach(val=>{
            tempArr[val] = 1;
        })
        return tempArr;
    })
    //点到点的算法
    const pointToPointMinRoad = [];
    // 点到点路径数组初始化
    for(var i = 0; i < graph.length; i++){
        pointToPointMinRoad.push([]);
    }
    // 点到点路径数组赋值
    for(var i = 0; i < graph.length; i++){
        for(var j = i + 1; j < graph.length; j++){
            
            pointToPointMinRoad[i][j] = findShortstRoad(i, j);
            pointToPointMinRoad[j][i] = findShortstRoad(i, j);
        }
    }
    
    // 分支查找的过程，广度优先逐级遍历，找到到达end的最近节点,遍历过得节点可以不用处理。
    function findShortstRoad(begin, end){
        // 直连返回当前路径
        if(mapGraph[begin][end])return 1;
        var nodeRecord = {};// 记录已使用节点
        nodeRecord[begin] = true;
        var waitStack = [ // 待检测点
            graph[begin]
        ]
        var i = 0; // 检测次数
        // 记录当前路径
        while(waitStack.length){
            i++;
            const next = waitStack.shift().filter(val=>!nodeRecord[val]);
            // 广度优先遍历，看是否找到节点
            const isFindNode = next.find(val=>{
                nodeRecord[val] = true;  // 已访问
                waitStack.push(graph[val]); // 带访问节点入栈
                return mapGraph[val][end];
            });
            // 找到返回找到路径长度
            if(isFindNode !== undefined){
                return i + 1;
            }
        }
        
    }
    // 生成序列位0-数组length的数列
    const readArr = Array.from(new Array(graph.length),(val,index)=>index);
    
    // --------------------
    // 排列组合后处理文件，然后再加一次循环，不美观，没继续写。
    // let resultArr =  [
    //     readArr.splice(0,1)
    // ]
    // // 排列组合
    // while(readArr.length){
    //     const teplateArr = [];
    //     const currentEl = readArr.splice(0,1)[0];
    //     // 不插队尾，因为路径来回是相同长度是一致的；
    //     for(var j = 0; j < resultArr.length; j++ ){
    //         let temp = resultArr.slice(0);
    //         temp.splice(i, 0, currentEl);
    //         teplateArr.push();
    //     }
    //     resultArr = teplateArr;
    // }
    // resultArr.forEach()


    // --------------------
    /**
     * next 访问的下一个节点
     * router 当前访问路径
     * waitNode 待访问节点
     * statusStack 每次进入一个节点保存当前待访问节点
     * routerCount 访问总路径数
     * mincount 记录最短路径数
     */

    var next,router,waitNode,statusStack,routerCount,mincount = Infinity;

    // 路径长度增加，进入路径
    const nextIn = (next)=>{
        
        routerCount += pointToPointMinRoad[router[router.length - 1]][next];
         
        router.push(next);
        
    }
    for(var i = 0; i < readArr.length; i++){
        // 首节点初始化
        routerCount = 0;
        router = [readArr[i]];
        waitNode = readArr.slice(0);
        waitNode.splice(i, 1);
        statusStack = [waitNode.slice(0)]

        while(statusStack.length !== 0){
            // 外层作为开始节点回溯
            next = statusStack[statusStack.length - 1].shift();// 队列出队
            removeArrayItem(waitNode, next); // 删除尚未使用元素
            nextIn(next) //记录路径长度，以及路径节点
            
            while(waitNode.length !== 0 && routerCount < mincount){
                next = waitNode.shift();
                nextIn(next);
                // 保存当前状态
                statusStack.push(waitNode.slice(0));
            }
            if(router.length === graph.length){
                // 全节点遍历到的判断
                console.log('router:',router,'len:',routerCount);
                if(routerCount === readArr.length - 1)return routerCount;
                mincount = mincount > routerCount ? routerCount : mincount;
            }
            
            // 到顶了先出一波
            const popNode = router.pop();
            waitNode = waitNode.concat(popNode); 
            routerCount -= pointToPointMinRoad[popNode][router[router.length - 1]];
            
            // 清理空请求队列
            while(statusStack.length && statusStack[statusStack.length - 1].length === 0){
                // 状态出一个，路由出一个，等待池进一个，路径回一个
                statusStack.pop(); 
                const popNode = router.pop();
                waitNode = waitNode.concat(popNode);
                routerCount -= pointToPointMinRoad[popNode][router[router.length - 1]]// 最后一段距离取出来
            }
        }
    }

    return mincount;
    
};
// 直接bfc 通过位运算得出问题
var shortestPathLength = function(graph){
    if(graph.length < 2)return 0;
    var fillStatus = (1<<graph.length) - 1;
    var statusStack,visitied,step;
    var minstep = Infinity;
    for(var i = 0; i < graph.length; i++){
        statusStack = [];
        statusStack.push([i, 1<<i]);
        visitied = Array.from(new Array(graph.length), ()=>[]);
        step = 0;
        min = beginToAll() + 1;
        minstep = minstep > min ? min : minstep;
    }
    function beginToAll(){
        while(statusStack.length){
            var stepLen = statusStack.length;
            while(stepLen--){
                let last = statusStack.shift();
                let lastPoint = last[0];
                let lastStatus = last[1];
                let currentRelativeNode = graph[lastPoint];

                for (let index = 0; index < currentRelativeNode.length; index++) {
                    const nextNode = currentRelativeNode[index];
                    let status = lastStatus | (1 << nextNode);
                    
                    if(status === fillStatus) return step;
                    
                    if(!visitied[nextNode][status]){
                        visitied[nextNode][status] = 1;
                        statusStack.push([nextNode, status])
                    }
                    // console.log(visitied[nextNode][status],nextNode,status,visitied);
                }
                // console.log(statusStack);
            }
            step++;
        }
    }
    return minstep;
}
// console.log(shortestPathLength([[1,2,3],[0],[0],[0]]));
// console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]]));
// console.log(shortestPathLength([[6,8],[2,9],[1,3,5],[2,6],[5],[2,6,4],[5,3,0,7],[6],[0],[1]]));
// console.log(shortestPathLength([[2,3,5,7],[2,3,7],[0,1],[0,1],[7],[0],[10],[9,10,0,1,4],[9],[7,8],[7,6]]));
// 1 3 5 7 9
// console.log(bfcToFindMinRouter([[]]));
// console.log(bfcToFindMinRouter([[1,2,3],[0],[0],[0]]));
// console.log(bfcToFindMinRouter([[1],[0,2,4],[1,3,4],[2],[1,2]]));
// console.log(bfcToFindMinRouter([[6,8],[2,9],[1,3,5],[2,6],[5],[2,6,4],[5,3,0,7],[6],[0],[1]]));
// console.log(bfcToFindMinRouter([[2,3,5,7],[2,3,7],[0,1],[0,1],[7],[0],[10],[9,10,0,1,4],[9],[7,8],[7,6]]));