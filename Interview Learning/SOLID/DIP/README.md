Dependency Inversion Principle:
High level modules should not depend on low level modules, both shoould depend on abstractions. It promotes decoupling of modules by introducing abstractions (interfaces or abstract classes) to depend on, rather then relying on specific implementations.
The main idea behind Dependency Inversion Principle is that any class that uses a dependency should only ever use the dependency through a predefined interface/wrapper.
This makes it so that your code will never directly depend on low level API for its operations. The reason it is so important is because if you ever need to change or remove that dependency it becomes really difficult when it is used all over your code.
By wrapping this dependency in an interface you can depend on interface you created which will make changing out the dependency painless.

Wthout Dependency Inversion:
STORE-APP
    |
    |
   \|/
STRIPE_API
In this situation we are directly depend on Stripe API, we are completely coupled. Other words, our store depends on Stripe API.
What happens if we want to change to another payment API or add it to out app? Or if we want to test our code using another API before changing or adding ?

With Dependency Inversion:
STORE-APP
    |
    |
   \|/
PaymentProcessor
    |
    |
   \|/
STRIPE_API
If we build something in middle, we can abstract the dependencies:
STORE-APP
    |
    |
   \|/
PaymentProcessor
    /\
   /  \______
  /         |
STRIPEAPI PayPalAPI
Now if we want to integrate other api, we just need to add it and implement our abstraction.
You don't want your high level code to depend on low level implementations of your dependencies. You don't want to depend on how stripe works or how paypal works. You want to depend on the payment processor that wraps those functionalities.

Advantages: 
1. Your code will not couple with exteranl API or implementations. 
2. Scalable. 
3. Maintainable. 
4. Clean

Diaadvantages: 
1. You may need to refactor a lot of things. 
2. Cost of refactor.

Examples:
1. We have some people and we want to set the relationship between them and a way to reasearch these realations for simplicity say we have a person called 'john' that has a son called 'chris' we want to record (low level) this relation and find a way to research (high level) it
    Abstraction :
    Make a Person class with name proprity
    Make a Relationship class that stores the relation ships between persons
    Make Research class to search these relation ships.
2. Payment Processor

