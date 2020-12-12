const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const check= (arr,number)=>{
    for (let index = 0; index < arr.length; index++) {
        const nbr = arr[index];
        let dif = number-nbr;
        if(dif!=nbr && arr.includes(dif)){
            return true;
        }
    }
    return false;
}

const getRange = (arr, nbr ) => {
    for (let i = 0; i < arr.length; i++) {
      const sums = [arr[i]]
      let sum = arr[i]
      for (let j = i + 1; j < arr.length; j++) {
        sum = sum + arr[j]
        sums.push(arr[j])
        if (sum === nbr) return sums
        else if (sum > nbr) break
      }
    }
  }

const execute = () => {
    let input = getInput("input.txt");
    let nbrArr = input.map(x=>parseInt(x));
    
    const preamble = 25;
    for (let index = preamble; index < nbrArr.length; index++) {
        const nbr = nbrArr[index];
        const arr = nbrArr.slice(index-preamble,index);
        if(!check(arr,nbr)){
            console.log(nbr);
            let sumArr = getRange(nbrArr.slice(0,index),nbr).sort((a, b) => a - b);
            console.log(sumArr[0]+sumArr[sumArr.length-1]);
        }
    }
}

execute();