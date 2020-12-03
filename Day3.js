function getInput() {
    let fs = require('fs');
    let input = fs.readFileSync('input.txt', 'utf8');
    return input.split(/\r?\n/)
}

function getFullMap(right,down,linesArray){
    let maxLength = linesArray.length * right;
    let fullMap = linesArray;
    while(fullMap[0].length<=maxLength){
        fullMap = fullMap.map((element,index)=>{
            return element+linesArray[index];
        });        
    }
   return fullMap;
    
}
function isSymbol(xIndex,yIndex,symbol,map){
    return map[yIndex][xIndex]==symbol;
}
function execute(xInc,yInc){
    let fullmap = getFullMap(xInc,yInc,getInput());
    let x=0;
    let y =0;
    let incrementX = xInc;
    let incrementY=yInc;
    let count = 0;
    while(y<fullmap.length-1){
        x=x+incrementX;
        y=y+incrementY;
        if(isSymbol(x,y,'#',fullmap)){
            count = count+1;
        }
    }
    console.log(count);
    return count;
}
let total = execute(1,1);
total = total * execute(3,1);
total = total * execute(5,1);
total = total * execute(7,1);
total = total * execute(1,2);
console.log(total);
