const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/); // split on every new line
    //return input.split(/\n\s*\n/); //split after every empty line
}
const part1 = input => {
    const timestamp = parseInt(input[0]);
    let buses = input[1]
        .split(',')
        .filter(x => x != 'x')
        .map(x => parseInt(x))
        .sort((a, b) => a - b);

    let bus;
    let minwait = timestamp;
    buses.forEach(b => {
        let dif = b - (timestamp % b);
        if (dif < minwait) {
            bus = b;
            minwait = dif;
        }
    });
    console.log(minwait * bus);
}
const part2 = input => {
    let buses = input[1]
        .split(',')
        .map((x, i) => x != 'x' ? {
            mod: parseInt(x),
            index: i
        } : null)
        .filter(x => x != null)
        .sort((a, b) => b.mod - a.mod);
    console.log(buses);

    let start = 0;
    let inc = 1;
    for (let i = 0; i < buses.length; i++) {
        const bus = buses[i];
        let found = false;

        while (!found) {
            if (((start + bus.index) % bus.mod) == 0) {
                inc *= bus.mod;
                console.log(bus.mod, inc)
                found = true;
            } else {
                start += inc;
            }
        }
        console.log(start);
    }
    console.log(start);
}

const execute = _ => {
    let input = getInput("input.txt");
    part1(input);
    part2(input);
}

execute();