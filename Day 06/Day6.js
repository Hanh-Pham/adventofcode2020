const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\n\s*\n/);
}

const remDup = s => s.split("").sort().reduce((a, b) => (a[a.length - 1] != b) ? (a + b) : a, "")
const countCommon = (arr, fullstring, length) => {
    let count = 0;

    for (var i = 0; i < arr.length; i++) {
        const letter = arr[i];
        if (fullstring.split(letter).length - 1 == length) {
            count += 1;
        }
    }
    return count;
}

const sum = arr => arr.reduce((a, b) => a + b)

const execute = _ => {
    let input = getInput("input.txt");
    let countAnswerArr = [];
    let countAnswerPart2 = [];

    input.forEach(group => {
        let flattenedString = group.replace(/(\r\n)|(\r)/g, "");
        const filtered = remDup(flattenedString);
        countAnswerArr.push(filtered.length);
        countAnswerPart2.push(countCommon(filtered, flattenedString, group.split(/\r?\n/).length));
    });

    let count = sum(countAnswerArr);
    let count2 = sum(countAnswerPart2);
    console.log(count);
    console.log(count2);
}


execute();