Liskov Substitution Principle:
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
