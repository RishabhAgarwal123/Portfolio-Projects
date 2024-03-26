import calorieLogger from './CalorieLogger';

// This class is only performing task related to tracking calories only task related to calories
class ClaorieTracker {
    constructor(maxCalorie) {
        this.maxCalorie = maxCalorie;
        this.currentCalorie = 0;
    }

    trackCalorie(calorie) {
        this.currentCalorie += calorie;
        if (this.currentCalorie >= this.maxCalorie) {
            calorieLogger('Max Calories Excedeed');
        }
    }
}

const calorieTracker = new ClaorieTracker(2000);
calorieTracker.trackCalorie(5000);
calorieTracker.trackCalorie(2000);
calorieTracker.trackCalorie(1000);