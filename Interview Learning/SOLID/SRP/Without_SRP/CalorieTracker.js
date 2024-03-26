class CalorieTracker {
    constructor (maxCalories) {
        this.maxCalories = maxCalories;
        this.currentCalories = 0;
    }

    trackCalories(calorie) {
        this.currentCalories += calorie;
        
        if (this.currentCalories >= this.maxCalories) {
            this.logCalories();
        }
    }

    // This code is violating the SRP
    // Because the reponsibility to log a message is not of CaloreTracker class
    logCalories() {
        console.log('Max Calories Exceeded');
    }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(5000);
calorieTracker.trackCalories(700);