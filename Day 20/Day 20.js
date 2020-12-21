const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    // return input.split(/\r?\n/); // split on every new line
    return input.split(/\n\s*\n/); //split after every empty line
}

function reverseString(str) {
    return (str === '') ? '' : str.split('').slice().reverse().join('');
}

const execute = _ => {
    const input = getInput("input.txt");
    let allBorders = new Map();
    let tiles = [];
    input.forEach(tile => {
        tileLines = tile.split(/\r?\n/).map(x => x.split('\r')[0]);
        let tileID = parseInt(tileLines[0].split(' ')[1].split(':')[0]);
        let tileData = tileLines.slice(1)

        let borders = [
            tileData[0],
            tileData[tileData.length - 1],
            tileData.reduce((a, b) => a + b[0], ''),
            tileData.reduce((a, b) => a + b[tileData[0].length - 1], '')
        ];
        borders.forEach(border => {
            allBorders.set(border, (allBorders.get(border) || 0) + 1)
        })
        tiles.push({
            tileID,
            borders
        })
    })

    let runningTotal = 1;

    tiles.forEach(tile => {
        let sum = -4;
        tile.borders.forEach(t => {
            sum += allBorders.get(t) + (allBorders.get(reverseString(t)) || 0)
        })

        if (sum == 2) {
            runningTotal *= tile.tileID
        }
    })

    console.log(runningTotal)

}

execute()