const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const calculate = (base, sign, number) => {
    return sign == "-" ? base - number : base + number;
}

const getAllIndexes = (arr, val) => {
    var indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].includes(val))
            indexes.push(i);
    return indexes;
}

const check = (arr, changeTo, instructions) => {
    for (let i = 0; i < arr.length; i++) {
        const change = arr[i];
        let jmp = 1;
        let alreadyDone = [];
        for (let line = 0; line < instructions.length; line = line + jmp) {
            const split = instructions[line].split(" ");
            let command = split[0];
            const sign = split[1].charAt(0);
            const number = parseInt(split[1].substring(1));

            if (line == change) {
                command = changeTo;
            }
            if (alreadyDone.includes(line)) {
                break;
            }
            jmp = 1
            if (command == "jmp") {
                jmp = calculate(jmp, sign, number);
                jmp -= 1;
            }
            alreadyDone.push(line);
            if (line == instructions.length - 1) {
                return change;
            }
        }

    }
    return 0;
}
const findChange = () => {
    let instructions = getInput("input.txt");
    let allJmpIndex = getAllIndexes(instructions, "jmp");
    let allNopIndex = getAllIndexes(instructions, "nop");
    return check(allJmpIndex, "nop", instructions) ?? check(allNopIndex, "jmp", instructions);
};
const execute = () => {
    let instructions = getInput("input.txt");
    let acc = 0;
    let jmp = 1;
    let alreadyDone = [];
    let change = findChange();
    for (let index = 0; index < instructions.length; index = index + jmp) {
        const split = instructions[index].split(" ");
        let command = split[0];
        const sign = split[1].charAt(0);
        const number = parseInt(split[1].substring(1));
        if (alreadyDone.includes(index) || index == instructions.length - 1) {
            return acc;
        }
        if (change == index) {
            command = command == "nop" ? "jmp" : "nop";
        }
        jmp = 1;
        switch (command) {
            case "acc":
                acc = calculate(acc, sign, number);
                break;
            case "jmp":
                jmp = calculate(jmp, sign, number);
                jmp -= 1;
                break;
            case "nop":
                break;
        }
        alreadyDone.push(index);

    }
}

console.log(execute());