const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    // return input.split(/\r?\n/); // split on every new line
    return input.split(/\n\s*\n/); //split after every empty line
}

const isValid = (rules, msg, [ruleNr, ...rest]) => {

    if (!ruleNr || !msg) return !ruleNr && !msg;
    const rule = rules.get(ruleNr);

    return rule instanceof Array ?
        rule.some(r => isValid(rules, msg, r.concat(rest))) :
        msg[0] === rule && isValid(rules, msg.slice(1), rest);
};

const calculate = (rules, messages) => {
    const map = rules
        .map(r => r.split(": "))
        .reduce(
            (m, [n, r]) =>
            m.set(n, r[0] === '"' ? r[1] : r.split(" | ").map(n => n.split(" "))),
            new Map()
        );

    return messages.map(msg => isValid(map, msg, "0")).filter(Boolean).length;
};


const execute = _ => {
    const input = getInput("input.txt");
    const rules = input[0].split(/\r?\n/)
    rules[0] = rules[0].substring(1)
    rules[rules.length - 1] = rules[rules.length - 1].split(/\r/)[0]
    const messages = input[1].split(/\r?\n/)

    console.log(calculate(rules, messages))
    const overrides = ["8: 42 | 42 8", "11: 42 31 | 42 11 31"];

    console.log(calculate(rules.concat(overrides), messages))
}

execute()