const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/); // split on every new line
    //return input.split(/\n\s*\n/); //split after every empty line
}


const addjustDegree = (deg, amount) => {
    deg += amount;
    if (deg > 360) {
        deg -= 360;
    }

    if (deg < 0) {
        deg += 360;
    }

    if (deg === 360) {
        deg = 0;
    }
    return deg;
}
const rotateWaypoint = (wayX, wayY, amount) => {
    while (amount > 360) {
        amount -= 360;
    }

    while (amount < 0) {
        amount += 360;
    }

    switch (amount) {
        case 0:
        case 360:
            return;
        case 90: {
            const tmpY = wayY;
            wayY = -1 * wayX;
            wayX = tmpY;
            break;
        }
        case 180: {
            wayY = -1 * wayY;
            wayX = -1 * wayX;
            break;
        }
        case 270: {
            const tmpY = wayY;
            wayY = wayX;
            wayX = -1 * tmpY;
            break;
        }
    }
    return ({
        wayX,
        wayY
    });
}

const part1 = (input, y, x, deg) => {
    for (let i = 0; i < input.length; i++) {
        const el = input[i];
        const amount = parseInt(el.substr(1));
        const action = el.substr(0, 1);

        switch (action) {
            case 'N':
                y = y + amount;
                break;
            case 'S':
                y = y - amount;
                break;
            case 'E':
                x = x + amount;
                break;
            case 'W':
                x = x - amount;
                break;
            case 'L':
                deg = addjustDegree(deg, -1 * amount);
                break;
            case 'R':
                deg = addjustDegree(deg, amount);
                break;
            case 'F':
                switch (deg) {
                    case 0:
                        y = y + amount;
                        break;
                    case 90:
                        x = x + amount;
                        break;
                    case 180:
                        y = y - amount;
                        break;
                    case 270:
                        x = x - amount;
                        break;
                }
                break;
        }
    }
    console.log(Math.abs(x) + Math.abs(y));
}
const part2 = (input, wayY, wayX, x, y) => {
    for (let i = 0; i < input.length; i++) {
        const el = input[i];
        const amount = parseInt(el.substr(1));
        const action = el.substr(0, 1);

        switch (action) {
            case 'N':
                wayY += amount;
                break;
            case 'S':
                wayY -= amount;
                break;
            case 'E':
                wayX += amount;
                break;
            case 'W':
                wayX -= amount;
                break;
            case 'L':
                ({
                    wayX,
                    wayY
                }) = rotateWaypoint(wayX, wayY, -1 * amount);
                break;
            case 'R':
                ({
                    wayX,
                    wayY
                }) = rotateWaypoint(wayX, wayY, amount);
                break;
            case 'F':
                x += (wayX * amount);
                y += (wayY * amount);
                break;
        }
    }
    console.log(Math.abs(x) + Math.abs(y));
}

const execute = _ => {
    let input = getInput("input.txt");
    let x = 0,
        y = 0,
        wayX = 10,
        wayY = 1;
    let deg = 90;
    part1(input, y, x, deg);

    x = 0, y = 0;
    part2(input, wayY, wayX, x, y);
}

execute();