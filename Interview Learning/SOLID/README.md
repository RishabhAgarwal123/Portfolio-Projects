SOLID Principles:

S: Single Responsibility Principle:

SRP in javascript states that a class or function should have only one responsibility or job, means that each module should focus on doing one thing well and not try to handle multiple unrelated tasks.
Every module or function should have only one reason to change.
Every module, class or function in a computer program should have responsibility over a single part of the program's functionality, and it should encapsultes that part. All of that module, class or function services should be narrowly aligned with that responsibility.

Wrong Interpretion of principle:
Most developers interpret to mean that class should perform only one task. But it's not only classes, functions you implement in code during development should also perform one task. So one should interpret it as meaning that implementation should perform only one task.

Advantages:

1. Clean: Clean and standard code.
2. Maintainable: Manageable and easy for maintainence.
3. Scalable and readable: Easy to refactor or change readable code.

Disadvantages:

1. Too many small modules/classes.
2. Take more time for development and increases project cost.

Examples:

1. Calories Tracking and Logging Message for Calories
2. A calculator which has two task one to calculate and other task is too saves the result.
3. Writing a Journal and Saving

O: Open/Closed Principle:

Software entities or Every Class/Function/Mudule/Section of your code should be open for entension but closed for modification.
Means the behaviour of module should be easily extendable wihout modifying its existing code.
In other words, class/function/module should be extended in functionality without having to go into your class and change it.

Advantages:

1. Extensibility: "When a single change to a program results in cascade of changes to dependent modules, that program exibhits the undesirable attributes that we have come to associate with 'bad' design. The problem becomes fragile, rigid, unpredictable and unreusable. The open/closed principle attacks this problem in a very straight forward way. It says you should design modules in a way that never change, you extend the behaviour of such modules by adding new code, not by changing old code that already works.

2. Maintainability: The main benefit of this approcah is that an interfaces introduces and additional level of abstraction which enables loose coupling. The implementations of interface are independent of each other and don't need to share any code.

3. Flexiility: The OCP also applies to plugin and middleware architecture, In that case, your base software entity is your application core functionality. In that case plugins, you have base or core modules that can be plugged with new features and functionality through a common gateway interface. A good example for this is web browser extensions. Binary compatability will also be in-tact in subsequent releases.

Disadvantages:

1. The resource allocator code need to be unit tested when a new esouce type is added.
2. Adding a new resource type introduces considerable risk in the design as almost all aspects of resource allocation have to be modified.
3. Developer adding a new resource type has to understand the inner workings for the resource allocator.

Examples:

1. Creating a quiz with multiple types of questions: MCQ, True/False... .
2. Say we need to make class Product which have some proprities of the product like its name , color and size. We also need to make a filter to filter these products by size , color , name or combination of the three.

L: Liskov Substitution Principle

The main idea behind LSP is that any function/module that interacts with a class should also be able to interact with all subclasses of that class without breaking. This essentially means class is interchangable with it's sub-classes.
Or in a simpler way if a program works with a certain type, it should work with any of it's subtypes without causing any unexpected behaviour.
Or objects of a superclass shall be replacable with objects of it's subclasses without breaking the application.

Advantages:

1. It ensures correct sub-hierarchy with relevant checks.
2. It becomes easy to extend new classes.
3. The maintainability of code becomes easy.
4. There shall be no runtime suprises in the application.

Disadvantages:

1. Sometimes we need to update base class in order to support new extension.
2. You may need to refactor a lot of things.
3. Cost of refractor.

Examples:

1. We want to make a rectangle class and another square class and we want both of them to have the same methods which are get,set width/height and calculating the area
   Abstraction :
   Make a Reatagle class with the mentioned proprities
   Make a Square class with the mentioned proprities

I: Interface Segregation Principle:

The ISP states that the client should not be forced to depend on interfaces they do not use. In simpler terms, it promotes designing interfaces that are specific to the needs of clients and avoids imposing unnecessary dependencies.
Or no client should be forced to depend on methods it does not use.

Advantages:

1.  Faster Compilation: If you have violated ISP i.e... that you have stuffed methods in interface, and when method signature changes, you need to recompile all derived classes. This is an important aspects in some compiled languages like C++ which is well known for slow compilation. While another way around is self explainable. 
2. Reuseability: 'Fat Interfaces'- Interfaces with additional useless methods - lead to inadverent coupling between classes. Thus, an experienced dev knows coupling is bane of reuseability. 
3. Maintainability: The much more universal ISP benefit is that by avoiding unneeded dependencies, the system becomes:
    a. Easier to understand.
    b. Lighter to test.
    c. Quicker to change.

Disadvantages:

1. You may need to refactor a lot of things. 2. Cost of refactor.

Examples:

1. Say we want to make a 3 in 1 printer that can be used as a scanner, fax and printer. How will you go about designing such structure?
2. Another example

D: Dependency Inversion Principle:

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

