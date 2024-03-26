class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProuctFilter {
    bySize(products, color) {
        return products.filter(product => product.color === color);
    }

    bySize(products, size) {
        return products.filter(product => product.size === size);
    }

    bySizeAndColor(products, size, color) {
        return products.filter(product => product.color === color && product.size === size);
    }
}

let apple = new Product('Apple', 'green', 'small');
let tree = new Product('Tree', 'green', 'large');
let house = new Product('House', 'blue', 'large');

let products = [apple, tree, house];

let pf = new ProductFilter();
for (let p of pf.bySize(products, 'large')) {
    console.log(` * ${p.name} is green`);
}