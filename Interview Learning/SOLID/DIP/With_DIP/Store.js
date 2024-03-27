export default class Store {
    constructor(paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    purchaseBike(quantity) {
        const bikePrice = 200;
        this.paymentProcessor.pay(bikePrice * quantity);
    }

    purchaseHelmet(quantity) {
        const helmetPrice = 15;
        this.paymentProcessor.pay(helmetPrice * quantity);
    }
}