function getInput() {
    let fs = require('fs');
    let input = fs.readFileSync('input.txt', 'utf8');
    return input.split(/\n\s*\n/);
}
function fourDigits(input, from, to) {
    if(!/^\d{4}$/.test(input)) {
        return false;
    }
    const int = parseInt(input);
    if(int < from) return false;
    if(int > to) return false;
    return true;
}

function check(string) {
    let mustHaveValues = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    for (let index = 0; index < mustHaveValues.length; index++) {
        const val = mustHaveValues[index];
        if (!string.includes(`${val}`)) {
            return false;
        }
        const value = string.split(" ").find(x => x.includes(`${val}`)).split(":")[1];
    
        switch (val) {
            case "byr":
                if (!fourDigits(value,1920,2002)) {
                    return false;
                }
                break;
            case "iyr":
                if (!fourDigits(value,2010,2020)) {
                    return false;
                }
                break;
            case "eyr":
                if (!fourDigits(value,2020,2030)) {
                    return false;
                }
                break;
            case "hgt":
                let number = parseInt(value);
                let sort = value.split(`${number}`).pop();
                if(sort=="cm"){
                    if(number<150 || number>193){                        
                        return false;
                    }
                }else if(sort=="in"){
                    if(number<59 || number>76){                        
                        return false;
                    }
                }
                else{
                   return false;
                }
                break;
            case "hcl":
                if (!/^#[0-9a-f]{6}$/.test(value)) {
                    return false;
                }
                break;
            case "ecl":
                if (!/(amb)|(brn)|(blu)|(gry)|(grn)|(hzl)|(oth)/.test(value)) {                    
                    return false;
                }
                break;
            case "pid":
                if (!/^\d{9}$/.test(value)) {                    
                    return false;
                }
                break;            
        }
    }
    return true;
}
function execute() {
    let passports = getInput();
    let vaildCount = 0;
    passports.forEach(pass => {
        pass= pass.replace(/(\r\n)|(\r)/g," ");
        if (check(pass)) {
            vaildCount = vaildCount + 1;
        }
    });
    console.log(vaildCount);
}
execute();