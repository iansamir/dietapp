import { Food } from '/foodClasses.js'

const queryMap = {
    "breakfast": ["2 eggs", "toast", "turkey bacon", "orange juice"],
    "scrambled eggs": ["3 eggs", "turkey breast", "cheese", "oil"],
    "breakfast burrito": ["2 eggs", "tortilla", "cheese", "tomato"],
    "lunch": ["turkey sandwich", "tomato soup", "almonds"],
    "protein shake": ["protein powder", "milk", "banana", "peanut butter"],
    "dinner": ["steak", "mashed potatoes", "brussel sprouts"],
    "fruits" : ['strawberries', 'grapes', 'blueberries']
}

const splitInputToQueries = (input) => {
    input = input.toLowerCase();
    let inputArr = input.split(',');
    let queryArr = [];

    inputArr.forEach(query => {
        query = query.trim();
        if (query) {
            queryArr.push(query);
        }
    });
    return queryArr;
}

const MAX_CALORIES = 10000;
const MAX_PORTION = 100;

const stringToFood = (string) => {
    // Assuming format {name} {portion} {units} @ {calories} 
    let [name, calories] = string.split("@");
    let params = {}

    // make sure calories are within reason
    if (calories) {
        params.calories = parseInt(calories.match(/[0-9]/g).join(""));
        params.calories = Math.min(params.calories, MAX_CALORIES);
    }
    // regex to match strings like "100 g" or "100g "
    if (name.match(/[[0-9]\s*g[^a-z]|[0-9]\s*g$/)) {
        params.portion = parseInt(name.match(/[0-9]/g).join(""));
        params.units = "g";
        name = name.replace(/[[0-9]+\s*g[^a-z]|[0-9]+\s*g$/, '')
    }
    
    // regex to match units like "3 eggs"
    // make sure portion is within reason
    if (name.match(/[0-9]/g)) {
        params.portion = parseInt(name.match(/[0-9]/g).join(""))
        params.portion = Math.min(params.portion, MAX_PORTION);
        name = name.replace(/[0-9]/g, "");
    }

    params.name = name.trim();
    return new Food(params);
}

const queryToMeals = (queries) => {
    let mealArr = [];
    for(let query of queries){
        if(Object.keys(queryMap).includes(query)){
            queryMap[query].forEach(foodName => {
                mealArr.push(stringToFood(foodName))
            });
        } else {
            mealArr.push(stringToFood(query));
        }
    }
    return mealArr;
}

const appendMealsAsFoods = (mealArr) => {
    let formattedFoodArr = [];
    for (let food of mealArr) {
        let str = `${food["name"]}, ${food["portion"]} ${food["units"]} @ ${food["calories"]} calories`
        if (food["calories"] == 0) {
            str = food["name"]
        } else if (food["portion"] == 0) {
            str = `${food["name"]} @ ${food["calories"]} calories`
        }
        formattedFoodArr.push(str);
    }
    return formattedFoodArr;
}

const compose = (...fns) => arg => {
    return fns.reduce((composed, f) => f(composed), arg);
}

const parseInput = (input) => {
    return compose(
        splitInputToQueries,
        queryToMeals,
        appendMealsAsFoods
    )(input);
};

export { parseInput };

// console.log(parseInput("breakfast, 4 bananas @ 900 calories, tomato"));
// console.log(stringToFood("banana 40 g"));
// console.log(stringToFood('banana 400g @ 200 cal'));