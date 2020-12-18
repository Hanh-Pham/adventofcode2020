const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/); // split on every new line
    //return input.split(/\n\s*\n/); //split after every empty line
}

const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}
const operators = ['*', '/', '+', '-']

const calc = (array, isPart2) => {
    if (isPart2) {
        let replacing = true;
        while (replacing) {
            let addSign = array.indexOf('+');
            if (addSign == -1) {
                replacing = false
            } else {
                array.splice(addSign - 1, 3, array[addSign - 1] + array[addSign + 1])
            }
        }
    }
    let result = array[0];
    for (let i = 1; i < array.length; i++) {
        const element = array[i];
        switch (element) {
            case '*':
                result = result * array[i + 1];
                i++
                break
            case '/':
                result = result / array[i + 1];
                i++
                break
            case '+':
                result = result + array[i + 1];
                i++
                break
            case '-':
                result = result - array[i + 1];
                i++
                break
            case !isNaN(element):
                console.log(element)
                break
        }
    }
    return result
}
const calculate = (input, isPart2) => {
    let results = [];
    const regExp = /\(([^()]*)\)/g;
    const regExpOuter = /\(([^)]+)\)/g;

    input.forEach(line => {
        let calculating = true;
        while (calculating) {
            let matches = line.match(regExp) || line.match(regExpOuter);
            if (matches != null) {
                matches.forEach(match => {
                    const index = line.indexOf(match);
                    let f = line
                        .substring(index + 1, index + match.length - 1)
                        .split(' ')
                        .map(x => {

                            if (isNumeric(x)) {
                                return +x;
                            } else if (operators.includes(x)) {
                                return x
                            }
                        })
                        .filter(x => typeof x != 'undefined');
                    const cal = calc(f, isPart2)
                    line = line.replace(match, cal)
                });
            } else {
                calculating = false;
            }
            if (!line.includes('(') && operators.some(function (v) {
                    return line.indexOf(v) >= 0;
                })) {
                let array = line.split(' ')
                    .map(x => {
                        if (isNumeric(x)) {
                            return +x;
                        } else if (operators.includes(x)) {
                            return x
                        }
                    })
                    .filter(x => typeof x != 'undefined')
                results.push(calc(array, isPart2))
                calculating = false;
            }
        }
    });

    console.log(results.reduce((a, b) => a + b))
}
const execute = _ => {
    let input = getInput("input.txt");
    calculate(input, false)
    calculate(input, true)

}

execute();