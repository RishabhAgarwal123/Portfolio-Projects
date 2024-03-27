// this class acts like the Stripe API
// for examplification only

export default class Stripe {
    constructor(user) {
        this.user = user;
    }

    makePayment(amountInCents) {
        console.log(`${this.user} made payment of ${amountInCents / 100}$ with Stripe`);
    }
}