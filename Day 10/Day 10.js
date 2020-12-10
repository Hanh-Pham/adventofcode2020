const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const part1 = (sorted) => {
    let joltDiff = { one: [], two: [], three: [], other: [] };
    for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];
        let diff = 0;
        if (index == 0) {
            diff = element;
        }
        else {
            diff = element - sorted[index - 1];
        }
        switch (diff) {
            case 1:
                joltDiff.one.push(element);
                break;
            case 2:
                joltDiff.two.push(element);
                break;
            case 3:
                joltDiff.three.push(element);
                break;
            default: joltDiff.other.push(element);
                break;
        }
    }
    console.log(joltDiff.one.length * joltDiff.three.length);
}

const part2 = (sorted) => {
    let arr = [1];
    for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];
        arr[element] = (arr[element - 3] || 0) + (arr[element - 2] || 0) + (arr[element - 1] || 0);
    }
    console.log(arr.pop());
}

const execute = () => {
    let input = getInput("input.txt");
    let nbrArr = input.map(x => parseInt(x));

    let sorted = nbrArr.sort((a, b) => a - b);
    sorted.push(sorted[sorted.length - 1] + 3);

    part1(sorted);
    part2(sorted);
}

execute();