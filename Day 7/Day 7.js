const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const iterateRules = (rules, containBag) => {
    rules.forEach(rule => {
        let splitted = rule.split("contain");
        let bag = splitted[0].split("bag")[0].trim();
        let contains = splitted[1];

        containBag.forEach(b => {
            if (contains.includes(b) && !containBag.includes(bag)) {
                containBag.push(bag);
            }
        });
    });
}

const replacebag = (objectArr, object) => {

    let others = objectArr.filter(bag => bag.containingBags.includes(object.bag));
    others.forEach(other => {
        let bag = other.contains.filter(c => c.bag == object.bag)[0];
        bag.worth = (bag.amount * object.totalWorth) + bag.amount;

        if (other.contains.filter(c => c.worth == -1).length == 0) {
            other.totalWorth = other.contains.map(c => c.worth).reduce((a, b) => a + b);
            replacebag(objectArr, other);
        }
    });
}
const execute = () => {
    let rules = getInput("input.txt");
    let containBag = ["shiny gold"];

    let oldLength = containBag.length;
    do {
        oldLength = containBag.length;
        iterateRules(rules, containBag);
    } while (oldLength != containBag.length);


    let result = rules.filter(rule => {
        for (let index = 0; index < containBag.length; index++) {
            const b = containBag[index];
            if (rule.split("contain")[1].includes(b)) {
                return true;
            }
        }
        return false;
    });
    console.log(result.length)

    let objectArr = [];
    rules.forEach(rule => {
        let bag = rule.split("contain")[0].split("bag")[0].trim();
        let contain = rule
            .split("contain")[1]
            .split(",")
            .map(item => { return item.split("bag")[0].trim() })
            .map(line => { return { line, noOther: line == "no other", amount: parseInt(line.charAt(0)), bag: line.substring(1).trim(), worth: -1 } })
        objectArr.push({
            bag: bag,
            containingBags: contain.map(x => x.bag),
            contains: contain,
            noOther: contain.length == 1 && contain[0].noOther,
            totalWorth: -1
        });
    });

    objectArr.filter(x => x.noOther).forEach(x => {
        x.totalWorth = 1;
        let others = objectArr.filter(bag => bag.containingBags.includes(x.bag));
        others.forEach(other => {
            let bag = other.contains.filter(c => c.bag == x.bag)[0];
            bag.worth = bag.amount;
            if (other.contains.filter(c => c.worth == -1).length == 0) {
                other.totalWorth = other.contains.map(c => c.worth).reduce((a, b) => a + b);
                replacebag(objectArr, other);
            }
        });

    });
    console.log(objectArr.filter(x => x.bag == "shiny gold")[0].totalWorth);
}

execute();