// As the principle states interfaces should be seperated but unfortunately Javascript doens't have interfaces so we will wrap around 
// it as we will see. First we need to make a Machine class interface that has abstract methods to print , fax and printer

class Machine {
    constructor() {
        if (this.contructor.name === 'Machine') {
            throw new Error('Machine is abstract');
        }
    }

    print(doc) { }
    fax(doc) { }
    scan(doc) { }
}

// now the user wants a 3 in 1 printer let's define it as follows
class MultiFactorPrinter extends Machine {
    print(doc) {
        console.log(`${doc} to print`);
    }

    fax(doc) {
        console.log(`${doc} to fax`);
    }

    scan(doc) {
        console.log(`${doc} to scan`);
    }
}

// seems ok but what if another use wants to have a printer that only prints , bear in mind classes that inherets from interfaces 
// must implement the abstract methods ok we can do some thing like that

class OldFashionedPrinter extends Machine {
    print(doc) {
        console.log(`${doc} to print`);
    }

    fax(doc) {
        console.log(`Will do nothing`);
    }

    scan(doc) {
        console.log(`Will do nothing`);
    }
}

// but what happens when a user call fax function on this old fashioned printer, as you might guess it will do nothing but it 
// exists and it shouldn't even exist in the first place which violates a principle called the least surprise principle
//  (the user get surprised if he discovered that the old fashioned printer has a fax method ) , fax and scan methods shouldn't be 
//  allowed here. So we might throw errors when these methods get called