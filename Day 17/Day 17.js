const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/); // split on every new line
    // return input.split(/\n\s*\n/); //split after every empty line
}
function countNeighbours(x, y, z, w, map, isPart2) {
    let count = 0;
    for (let ww = (isPart2 ? w - 1 : 0); ww <= (isPart2 ? w + 1 : 0); ww++) {
        for (let zz = z - 1; zz <= z + 1; zz++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
                for (let xx = x - 1; xx <= x + 1; xx++) {
                    if ((xx !== x || yy !== y || zz !== z || ww !== w) && map[`${xx},${yy},${zz},${ww}`]) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}


const execute = (isPart2) => {
    const input = getInput("input.txt").map((x) => x.trim().split(''))

    let map = {};
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] === "#") {
                map[`${x},${y},0,0`] = true
            }
        }
    }
    let height = [0, input.length], width = [0, input[0].length], depth = [0, 1], hyper = [0, 1]
    for (let i = 0; i < 6; i++) {
        let newMap = {}
        depth[0]--
        depth[1]++
        width[0]--
        width[1]++
        height[0]--
        height[1]++
        if (isPart2) {
            hyper[0]--
            hyper[1]++
        }

        for (let w = hyper[0]; w < hyper[1]; w++) {
            for (let z = depth[0]; z < depth[1]; z++) {
                for (let y = width[0]; y < width[1]; y++) {
                    for (let x = height[0]; x < height[1]; x++) {
                        let neighbours = countNeighbours(x, y, z, w, map, isPart2)
                        const isActive = map[`${x},${y},${z},${w}`];
                        if (neighbours == 3 || (neighbours == 2 && isActive)) {
                            newMap[`${x},${y},${z},${w}`] = true;
                        }
                    }

                }

            }

        }

        map = newMap;
    }
    console.log(Object.keys(map).length)
}



execute();
execute(true);


