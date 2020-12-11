const occupied = '#';
const empty = 'L';
const floor = '.';

const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const getAdjSeats = (x, y, arr) => {
    let adjacentsCoord = [
        [x, y - 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x - 1, y + 1],
        [x - 1, y],
        [x - 1, y - 1]
    ]

    let filtered = adjacentsCoord.filter(([x, y]) => typeof (arr[y] && arr[y][x]) !== 'undefined')
    return filtered.map(([x, y]) => arr[y][x]);
}
const getCount = (arr, symbol) => {
    return [].concat.apply([], arr).filter(x => {
        return x == symbol;
    }).length;
}
const changeSeat = (arr) => {
    const newArr = arr.map(function (arr) {
        return arr.slice();
    });

    for (let y = 0; y < arr.length; y++) {
        const row = arr[y];
        for (let x = 0; x < row.length; x++) {
            const element = arr[y][x];
            let occupiedSeats = getAdjSeats(x, y, arr).filter(x => x == occupied).length;
            switch (element) {
                case empty:
                    if (occupiedSeats == 0) {
                        newArr[y][x] = occupied;
                    }
                    break;
                case occupied:
                    if (occupiedSeats >= 4) {
                        newArr[y][x] = empty;
                    }
                    break
                default:
                    break;
            }
        }
    }
    return newArr;

}
const part1 = (data) => {
    let newdata;
    let oldCount = 0;
    let newCount = 0;
    let run = true;
    while (run) {
        newdata = changeSeat(newdata || data);
        newCount = getCount(newdata, occupied);
        if (oldCount == newCount) {
            run = false;
        } else {
            oldCount = newCount;
        }
    }


    console.log("part 1",getCount(newdata, occupied));
}

const checkSeats=(baseY,baseX,data)=>{
    let countOccupied = 0
    for(let y=baseY-1;y>-1;y--){
        if(data[y][baseX]==empty){
            break
        }
        if(data[y][baseX]==occupied){
            countOccupied++
            break
        }
    }
    for(let y=baseY+1;y<data.length;y++){
        if(data[y][baseX]==empty){
            break
        }
        if(data[y][baseX]==occupied){
            countOccupied++
            break
        }

    }
    for(let x=baseX+1;x<data[0].length;x++){
        if(data[baseY][x]==empty){
            break
        }
        if(data[baseY][x]==occupied){
            countOccupied++
            break
        }

    }
    for(let x=baseX-1;x>-1;x--){
        if(data[baseY][x]==empty){
            break
        }
        if(data[baseY][x]==occupied){
            countOccupied++
            break
        }

    }
    for(let x=baseX-1, y=baseY-1;x>-1,y>-1;x--,y--){
        if(data[y][x]==empty){
            break
        }
        if(data[y][x]==occupied){
            countOccupied++
            break
        }
 
    }
    for(let x=baseX+1, y=baseY-1;x<data[0].length,y>-1;x++,y--){
        if(data[y][x]==empty){
            break
        }
        if(data[y][x]==occupied){
            countOccupied++
            break
        }
    }
    for(let x=baseX+1, y=baseY+1;x<data[0].length,y<data.length;x++,y++){
            if(data[y][x]==empty){
                break
            }
            if(data[y][x]==occupied){
                countOccupied++
                break
            }
    }
    for(let x=baseX-1, y=baseY+1;x>-1,y<data.length;x--,y++){
            if(data[y][x]==empty){
                break
            }
            if(data[y][x]==occupied){
                countOccupied++
                break
            }
    }
    return countOccupied
}
const part2 = (data) => {
    let newdata = data;
    let oldCount = 0;
    let newCount = 0;
    let run = true;
    while (run) {
        const newArr = newdata.map(function (arr) {
            return arr.slice();
        });
        for(let y=0;y<newdata.length;y++){
            for(let x=0;x<newdata[0].length;x++){
                let el = newdata[y][x]
                if(el==floor){
                    continue
                }
                let occupiedSeats = checkSeats(y,x,newdata);
                switch (el) {
                    case empty:
                        if (occupiedSeats == 0) {
                            newArr[y][x] = occupied;
                        }
                        break;
                    case occupied:
                        if (occupiedSeats >= 5) {
                            newArr[y][x] = empty;
                        }
                        break
                    default:
                        break;
                }        
            }     
        }
        newdata = newArr;
        newCount = getCount(newdata, occupied);
        if (oldCount == newCount) {
            run = false;
        } else {
            oldCount = newCount;
        }
    }


    console.log("part 2",getCount(newdata, occupied));
}
const execute = () => {
    let input = getInput("input.txt");
    const data = input.map(el => el.split(''));
    part1(data);
    part2(data);
}

execute();