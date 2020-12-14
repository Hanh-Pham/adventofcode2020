const getInput = (filename) => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/)
}

const applyMask=(line, mask,linestart,isPart1) =>{
    let binary = line[linestart].toString(2).padStart(36, 0).split('');

    for (let i = 0; i < 36; i++) {
        let boolChk = isPart1?(mask[i] !== 'X'):(mask[i] === 'X' || mask[i] === '1')
        if (boolChk) {
            binary[i] = mask[i];
        }
    }
    return binary;
}
const part1= (input)=>{
    let memory = {}
    let mask = '';
    
    input.forEach(line =>{
         if (line[0]==='mask'){
             mask = line[1].split('');
         }else{
             let binary = applyMask(line, mask,1,true);
             memory[line[0]] = binary; 
         }
    });
    let sum = 0
    Object.keys(memory).forEach(key =>{
        let string = memory[key].join('');
        sum += parseInt((string),2)
    })

    console.log(sum);
}

const part2=(input)=>{
    let memory = {};
    let mask = '';
    
    input.forEach(line =>{
        if(line[0] === 'mask'){
            mask =line[1].split('');
        }else{

            let binary = applyMask(line,mask,0,false);
            
            let notDone = true;
            let possiblesKeys = [binary.map(e=>e)];
            
            while(notDone){
                notDone = false;
                for (let index = 0; index < possiblesKeys.length; index++) {
                    const key = possiblesKeys[index];
                    let x = key.indexOf('X');
                    if( x !== -1){
                       key[x] = '0';
                       possiblesKeys.push(key.map(e=>e));
                       key[x] = '1';
                       possiblesKeys.push(key.map(e=>e));
                       notDone = true;
                       possiblesKeys.splice(index,1)
                   }
                }
            }
            possiblesKeys.forEach(key =>{
                let decimal = parseInt(key.join(''),2);
                memory[decimal] = line[1]
            })
        }
    })

    let sum = Object.keys(memory).reduce((acc,curr)=>acc+memory[curr],0);
    console.log(sum);
}

const execute = () => {
    let input = getInput("input.txt");
    const convertedInput = input.map(e=>{
        if(e.indexOf('mask')>-1){
            return ['mask',e.substr(7)]; 
        }else{
            e = e.split(' = ');
            e[0] = e[0].substr(3);
            e[0] = e[0].slice(0,-1).slice(1);
            return [parseInt(e[0]),parseInt([e[1]])]
        }
    });

    part1(convertedInput);
    part2(convertedInput);
}

execute();


