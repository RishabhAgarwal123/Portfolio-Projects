The Single Responsibility Principle:
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
