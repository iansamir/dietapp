import { parseInput, getTotalCalories } from "/foodFunctions.js"

let $searchBar = $('input')

let $response = $('#response')
let $total_calories_el = $('#total-calories-el')
let $total_calories = $('#total-calories')

let totalCalories = 0;

$searchBar.on('change', () => {
    if (!AIMode) {
        parseInput($searchBar.val()).forEach(foodString => {
            let foodDiv = document.createElement('p');
            foodDiv.innerHTML = foodString;
            // Click to remove a food, subtract the calories
            foodDiv.addEventListener('click', () => {
                if (foodString.split("@").length > 1) {
                    totalCalories -= parseInt(foodString.split("@")[1]);
                }
                $total_calories.html(totalCalories);
                foodDiv.remove();
            })
            $response.append(foodDiv);
        });

        totalCalories += getTotalCalories($searchBar.val());
        $total_calories_el.css('display', 'block');
        $total_calories.html(totalCalories);

        $searchBar.val("")
    }
})

let goalCalories = 2400;
let calorie_goal_el = $("#calorie-goal-el")

calorie_goal_el.html(goalCalories);

let reset_button = $('#reset-button')
reset_button.click(() => {
    goalCalories = 2400;
    calorie_goal_el.css('color', 'black');
    calorie_goal_el.html(goalCalories);
});

let track_button = $('#track-button')
track_button.click(() => {
    goalCalories -= totalCalories;
    if (goalCalories < 0) {
        calorie_goal_el.css('color', 'red')
    } else {
        calorie_goal_el.css('color', 'black');
    }

    calorie_goal_el.html(goalCalories);

});

let clear_button = $('#clear-button')
clear_button.click(() => {
    // console.log('cleared!')
    totalCalories = 0;
    $response.html(' ');
    $total_calories.html(totalCalories);
    $total_calories_el.hide();
});