The Open/Closed Principle:
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