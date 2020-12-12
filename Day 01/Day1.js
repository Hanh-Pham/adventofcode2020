function calculate(){
    var fs = require('fs');
    var alltext = fs.readFileSync('input.txt', 'utf8');
    let numbersArr = alltext.split(/\r?\n/); 
    numbersArr = numbersArr.map(function (x) { 
        return parseInt(x); 
      });
       numbersArr.forEach(num1 => {
          let calc = 2020-num1;

          numbersArr.forEach(num2=>{
              let newcalc = calc-num2;
              if(numbersArr.includes(newcalc)){
                console.log(newcalc * num1 * num2);
            }
          })
      });          
}

calculate();
