const getInput = filename => {
    let fs = require('fs');
    let input = fs.readFileSync(filename, 'utf8');
    return input.split(/\r?\n/); // split on every new line
    // return input.split(/\n\s*\n/); //split after every empty line
}


const execute = _ => {
    const input = getInput("input.txt");
    input[0] = input[0].substring(1)
    // console.log(input)

    const allergensToIngredients = new Map(); // string => Set
    const ingredientCounter = {};
    const allIngredients = new Set();


    input.forEach(line => {
        const [ingredients, allergens] = line.replace(')', '').split(' (contains ').map(x => x.split(/[ ,]+/g));

        for (const a of allergens) {
            if (allergensToIngredients.has(a)) {
                allergensToIngredients.set(a, ingredients.filter(i => allergensToIngredients.get(a).includes(i)))
                // allergensToIngredients[a] = new Set(ingredients.filter(i => allergensToIngredients[a].has(i)));
            } else {
                allergensToIngredients.set(a, ingredients);
                // allergensToIngredients[a] = new Set(ingredients);
            }
        }
        for (const ingredient of ingredients) {
            ingredientCounter[ingredient] = (ingredientCounter[ingredient] || 0) + 1
            allIngredients.add(ingredient);
        }
    })

    const definedAllergens = {};
    const definedIngredients = {};

    let allergens = Array.from(allergensToIngredients.keys());
    // console.log(allergens, allergensToIngredients)
    while (allergens.length > 0) {
        const found = allergens.find(x => allergensToIngredients.get(x).length === 1);
        const ingredient = allergensToIngredients.get(found);

        definedAllergens[found] = ingredient;
        allergensToIngredients.delete(found)

        allergensToIngredients.forEach((value, key, map) => {
            allergensToIngredients.set(key, value.filter(x => x != ingredient))
        });

        allergens = Array.from(allergensToIngredients.keys());
    }

    for (const key in definedAllergens) {
        definedIngredients[definedAllergens[key]] = key;
    }

    const okIngredients = [...allIngredients].filter(ingredient => !(ingredient in definedIngredients));

    const sum = okIngredients.map(ingredient => ingredientCounter[ingredient]).reduce((a, b) => a + b, 0);

    console.log(sum);

    console.log(Object.keys(definedAllergens).sort().map(allergen => definedAllergens[allergen]).join(','));
}

execute()