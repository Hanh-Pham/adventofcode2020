function getInput(filename) {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

function loopThrough(space,arraySize,amountLoops,frontLetter,backLetter,startIndex){
    let start =Array.from(Array(arraySize).keys())
    const maxLength = startIndex + amountLoops;
    for (let index = startIndex; index<maxLength; index++) {    
        const letter = space[index];
        let half_length = Math.ceil(start.length / 2); 
        switch(letter){
            case frontLetter:
                start = start.splice(0,half_length);
                break;
            case backLetter:
                start = start.splice(half_length,start.length);
                break;
        }        
    }
    return start[0];
}

function firstNonConsecutive(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] + 1 !== arr[i]) return arr[i];
    }
    return null;
}

function execute(){
    let input = getInput("input.txt");
    let highestSeatId = 0;
    let takenSeats=[];
    input.forEach(element => {
        let row = loopThrough(element,128,8,"F","B",0);
        let col = loopThrough(element,8,4,"L","R",7);
        let seatId= row * 8 +col;
        takenSeats.push(seatId);
        if(seatId>highestSeatId){
            highestSeatId =seatId;
        }
    });
    console.log(highestSeatId);

    console.log(firstNonConsecutive(takenSeats.sort()));
}


execute();