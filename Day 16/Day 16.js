const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    // return input.split(/\r?\n/); // split on every new line
    return input.split(/\n\s*\n/); //split after every empty line
}
const checkInRanges = (ranges, number) => {

    let check = ranges.filter(x => x.min <= number && number <= x.max).length;
    return check > 0
}
const part1 = (input) => {
    const fields = input[0].split(/\r?\n/);
    const nearbyTickets = input[2].split(/\r?\n/)
    const ranges = fields.map(x => x.split(':')[1]
        .split('or')
        .map(y => y.trim()))
        .flat()
        .map(x => {
            let numbers = x.split('-');
            return {
                min: +numbers[0],
                max: +numbers[1]
            }
        })

    nearbyTickets.shift()
    const nearbyNumbers = nearbyTickets.map(x => x.split(',').map(x => +x))

    let invalidNumbers = []
    let invalidIndex = []
    nearbyNumbers.forEach((numb, index) => {
        // console.log(numb)
        numb.forEach(nr => {
            if (!checkInRanges(ranges, nr)) {
                invalidNumbers.push(nr)
                invalidIndex.push(index)
            }
        });

    });

    console.log(invalidNumbers.reduce((acc, curr) => acc + curr, 0))
    return invalidIndex;
}

const part2 = (input, invalids) => {
    const fields = input[0].split(/\r?\n/);
    const ranges = fields
        .map(x => {
            let ranges = x.split(':')[1]
                .split('or')
                .map(y => y.trim())
                .map(z => {
                    let numbers = z.split('-');
                    return {
                        min: +numbers[0],
                        max: +numbers[1]
                    }
                })
            return {
                title: x.split(':')[0],
                ranges,
                index: null
            }
        })

    const myTicket = input[1].split(/\r?\n/)
    myTicket.shift();
    let ticketNumbers = myTicket[0].split(',').map(x => parseInt(x))

    const nearbyTickets = input[2].split(/\r?\n/)
    nearbyTickets.shift()
    const nearbyNumbers = nearbyTickets
        .map(x => x.split(',')
            .map(y => parseInt(y)))
        .map((x, i) => invalids.includes(i) ? null : x)
        .filter(x => x != null)

    nearbyNumbers.push(ticketNumbers)

    const allValid = nearbyNumbers;
    let remainingFields = Array.from(ranges);
    const remainingFieldPositions = remainingFields.map((_, i) => i);

    while (remainingFields.length > 0) {
        let found = false;
        for (const i of remainingFieldPositions) {
            // console.log(allValid)
            const values = allValid.map(x => x[i]).flat();
            const matchings = remainingFields.filter(field => values.every(val => checkInRanges(field.ranges, val)))

            if (matchings.length === 1) {
                ranges.filter(x => x.title == matchings[0].title)[0].index = i;
                remainingFields.splice(remainingFields.indexOf(matchings[0]), 1);
                remainingFieldPositions.splice(remainingFieldPositions.indexOf(i), 1);
                found = true;
            }
        }
        if (!found) {
            console.log("error");
            break;
        }
    }
    let indexesToUse = ranges.filter(x => x.title.includes('departure')).map(x => x.index);

    let data = []
    indexesToUse.forEach(index => {
        data.push(ticketNumbers[index])
    });
    console.log(data.reduce((acc, curr) => acc * curr))
}
const execute = () => {
    const input = getInput("input.txt")
    // console.log(input);
    const invalids = part1(input);
    part2(input, invalids);
}

execute();


