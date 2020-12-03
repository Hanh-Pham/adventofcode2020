function getInput() {
    let fs = require('fs');
    let input = fs.readFileSync('input.txt', 'utf8');
    return input.split(/\r?\n/)
}


function getObjects() {
    let array = getInput();
    return array.map(line => {
        let lineSplit = line.split(' ');
        return {
            "min": parseInt(lineSplit[0].split('-')[0]),
            "max": parseInt(lineSplit[0].split('-')[1]),
            "letter": lineSplit[1].slice(0, -1),
            "word": lineSplit[2]
        }
    });
}

function check() {
    let objects = getObjects();
    let count = 0;
    objects.forEach(element => {
        // let occurence = element.word.split(element.letter).length - 1;        
        // if (occurence >= element.min && occurence <= element.max ) {
        //     count = count + 1;
        // }

        if((element.word[element.min-1]==element.letter && element.word[element.max-1]!=element.letter )
            ||
            (element.word[element.min-1]!=element.letter && element.word[element.max-1]==element.letter )
            ){
            count = count +1;
        }
        
    });
    console.log(count);
}
check();
