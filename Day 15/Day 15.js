const execute = () => {
    const input = [16,1,0,18,12,14,19];

    let index = 1
    let map = new Map();
    let nextnbr;
    while(index<30000000){
        
        let nbr = (index<=input.length)?input[index-1]:nextnbr;
        nextnbr = map.has(nbr)?index-map.get(nbr):0;
        map.set(nbr,index)
        index++;
    }
    console.log(nextnbr)

}

execute();


