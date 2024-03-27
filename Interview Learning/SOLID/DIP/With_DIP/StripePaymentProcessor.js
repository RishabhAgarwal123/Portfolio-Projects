import Stripe from "./Stripe";

// this class acts like the Stripe payment processor (just like a gateway)
// this way, we don't repeat the Store class, but the implementation gateway class
// one per API

export default class StripePaymentProcessor {
    constructor(user) {
        this.stripe = new Stripe(user);
    }

    pay(amountInDollars) {
        this.stripe.MakePayment(amountInDollars * 100);
    }
}