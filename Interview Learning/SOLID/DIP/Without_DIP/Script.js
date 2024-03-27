import PayPalStore from "./StoreAdaptedToPayPal";
import StripeStore from "./StoreAdaptedToStripe";

const storeConnectedToStripe = new StripeStore('John');
storeConnectedToStripe.purchaseBike(2);
storeConnectedToStripe.purchaseHelmet(2);

// if we need to change from Stripe to PayPal
// we need to change the dependency 👇

const storeConnectedToPaypal = new PayPalStore('John');
storeConnectedToPaypal.purchaseBike(2);
storeConnectedToPaypal.purchaseHelmet(2);