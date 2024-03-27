Interface Segregation Principle - ISP:
The ISP states that the client should not be forced to depend on interfaces they do not use. In simpler terms, it promotes designing interfaces that are specific to the needs of clients and avoids imposing unnecessary dependencies.
Or no client should be forced to depend on methods it does not use.

Advantages:

1.  Faster Compilation: If you have violated ISP i.e... that you have stuffed methods in interface, and when method signature changes, you need to recompile all derived classes. This is an important aspects in some compiled languages like C++ which is well known for slow compilation. While another way around is self explainable. 2. Reuseability: 'Fat Interfaces'- Interfaces with additional useless methods - lead to inadverent coupling between classes. Thus, an experienced dev knows coupling is bane of reuseability. 3. Maintainability: The much more universal ISP benefit is that by avoiding unneeded dependencies, the system becomes:
    a. Easier to understand.
    b. Lighter to test.
    c. Quicker to change.

Disadvantages:

1. You may need to refactor a lot of things. 2. Cost of refactor.

Examples:

1. Say we want to make a 3 in 1 printer that can be used as a scanner, fax and printer. How will you go about designing such structure?
2. Another example
