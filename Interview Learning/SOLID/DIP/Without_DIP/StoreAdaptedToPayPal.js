import PayPal from "./PayPal";

// with the code like this, we need to have our code coupled to the PayPal logic
// and force us to create as many Store classes as APIs that we need to use

export default class PayPalStore {
    constructor(user) {
        this.payPal = new PayPal();
        this.user = user;
    }

    purchaseBike(quantity) {
        const bikePrice = 200;
        this.payPal.makePayment(this.user, bikePrice * quantity);
    }

    purchaseHelmet(quantity) {
        const helmetPrice = 15;
        this.payPal.makePayment(this.user, helmetPrice * quantity);
    }
}