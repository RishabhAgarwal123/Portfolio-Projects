import Stripe from "./Stripe";

// with the code like this, we need to have our code coupled to the Stripe logic
// and force us to create as many Store classes as APIs that we need to use

export default class StripeStore {
    constructor(user) {
        this.stripe = new Stripe(user);
    }

    purchaseBike(quantity) {
        const bikePrice = 200;
        const finalAmount = this.multiplyBy100(bikePrice * quantity)
        this.stripe.makePayment(finalAmount);
    }

    purchaseHelmet(quantity) {
        const helmetPrice = 15;
        const finalAmount = this.multiplyBy100(helmetPrice * quantity)
        this.Stripe.makePayment(finalAmount);
    }

    multiplyBy100(amount) {
        // we need to multiply by 100 because Stripe API requires amount in cents
        return amount * 100;
    }
}