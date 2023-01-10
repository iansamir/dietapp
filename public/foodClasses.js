class Food {
    constructor({ name = '', portion = 0, units = '', calories = 0, group = '' }) {

        // If we pass anything in, construct those first.
        this.name = name;
        this.portion = portion;
        this.units = units;
        this.calories = calories;
        this.group = group;

        // // Look for matching strings in the default map. 
        // // If we find something and there's not a portion already
        // // we set all the default properties 

        let defaultExists = false;
        let defaultUnit;

        // FIRST, check for exact match
        // SECOND, check for exclusion. Ex: Input: "eggs" -> Match: "egg"
        // THIRD, check for inclusion. Ex: Input: "ribs" -> Match: "baby back ribs"

        if (Object.keys(defaultPortionMap).includes(name)) {
            this.name = name;
            defaultExists = true;
            defaultUnit = defaultPortionMap[name].units
        } else {
            Object.keys(defaultPortionMap).forEach(foodName => {
                if (name.includes(foodName)) {
                    name = foodName
                    this.name = name;
                    defaultExists = true;
                    defaultUnit = defaultPortionMap[name].units
                } else if (foodName.includes(name) && !defaultExists) {
                    name = foodName
                    this.name = name;
                    defaultExists = true;
                    defaultUnit = defaultPortionMap[name].units
                }
            })
        }

        // If we enter a portion, then we adjust the calories of the default food
        // by dividing by default portion, the multiplying by new portion 
        
        if (defaultExists && (!units || units == defaultUnit)) {
            this.portion =
                (portion == 0 && calories == 0) ? defaultPortionMap[name].portion : portion;
            this.calories =
                calories || (portion == 0 ? defaultPortionMap[name].calories : portion * defaultPortionMap[name].calories / defaultPortionMap[name].portion);
            this.units = defaultPortionMap[name].units;
        }
    }
}


let defaultPortionMap = {
    // Fruits
    'banana': { "portion": 1, "units": "whole", "calories": 100 },
    'tomato': { "portion": 1, "units": "whole", "calories": 40 },
    'strawberries': { "portion": 1, "units": "cup", "calories": 70 },
    'grape': { "portion": 1, "units": "cup", "calories": 70 },
    'blueberries': { "portion": 1, "units": "cup", "calories": 70 },
    'pineapple': { "portion": 1, "units": "cup", "calories": 70 },
    'mango': { "portion": 1, "units": "cup", "calories": 70 },
    'avocado': { "portion": 1, "units": "whole", "calories": 250 },

    // Vegetables
    'brussel sprouts': { "portion": 1, "units": "cup", "calories": 50 },
    'green beans': { "portion": 1, "units": "cup", "calories": 50 },
    'peas': { "portion": 1, "units": "cup", "calories": 50 },
    'broccoli': { "portion": 1, "units": "cup", "calories": 50 },
    'squash': { "portion": 1, "units": "cup", "calories": 50 },
    'zucchini': { "portion": 1, "units": "cup", "calories": 50 },
    'lettuce': { "portion": 100, "units": "g", "calories": 50 },
    'spinach': { "portion": 100, "units": "g", "calories": 50 },

    // Grains & Nuts
    'almonds': { "portion": 8, "units": "oz", "calories": 250 },
    'toast': { "portion": 1, "units": "slice", "calories": 95 },
    'mashed potatoes': { "portion": 100, "units": "g", "calories": 300 },
    'crossaint': { "portion": 1, "units": "whole", "calories": 250 },
    'bread': { "portion": 1, "units": "slice", "calories": 95 },
    'muffin': { "portion": 1, "units": "whole", "calories": 300 },
    'tortilla': { "portion": 1, "units": "whole", "calories": 90 },
    'rice': { "portion": 2, "units": "cups", "calories": 250 },

    // Meat & Proteins
    'steak': { "portion": 8, "units": "oz", "calories": 760 },
    'bacon': { "portion": 2, "units": "strips", "calories": 200 },
    'turkey bacon': { "portion": 2, "units": "strips", "calories": 140 },
    'turkey sandwich': { "portion": 1, "units": "whole", "calories": 600 },
    'turkey breast': { "portion": 2, "units": "slices", "calories": 200 },
    'egg': { "portion": 1, "units": "whole", "calories": 90 },
    'baked beans': { "portion": 1, "units": "cup", "calories": 120 },
    'chicken': { "portion": 8, "units": "oz", "calories": 450 },
    'beef': { "portion": 8, "units": "oz", "calories": 200 },
    'sausage': { "portion": 100, "units": "g", "calories": 180 },
    'hot dog': { "portion": 1, "units": "whole", "calories": 200 },
    'salmon': { "portion": 8, "units": "oz", "calories": 450 },
    'sushi': { "portion": 1, "units": "roll", "calories": 400 },

    // Beverages
    'milk': { "portion": 1, "units": "glass", "calories": 180 },
    'orange juice': { "portion": 1, "units": "glass", "calories": 200 },
    'apple juice': { "portion": 1, "units": "glass", "calories": 200 },
    'coffee': { "portion": 1, "units": "cup", "calories": 15 },
    'beer': { "portion": 1, "units": "cup", "calories": 170 },

    // Dairy & Fats
    'cheese': { "portion": 1, "units": "slice", "calories": 80 },
    'oil': { "portion": 1, "units": "tbsp", "calories": 100 },
    'yogurt': { "portion": 0.5, "units": "cups", "calories": 180 },
    'cake': { "portion": 1, "units": "slice", "calories": 450 },
    'peanut butter': { "portion": 1, "units": "tbsp", "calories": 80 },
    'brownie': { "portion": 1, "units": "whole", "calories": 350 },
    'chocolate': { "portion": 50, "units": "g", "calories": 80 },
    'ice cream': { "portion": 1, "units": "scoop", "calories": 190 },
    'pie': { "portion": 1, "units": "slice", "calories": 480 },

}

// formattedFoodData.json already includes the default portion map above
// plus more foods I data scraped using Python.

fetch('formattedFoodData.json', (err) => console.log(err))
    .then(x => x.json())
    .then(json => {
        defaultPortionMap = json
        console.log(defaultPortionMap)
    })

export { Food };