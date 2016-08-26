import { EventEmitter } from './EventEmitter';

export class Cart extends EventEmitter {
    constructor() {
        super();

        this.products = [];
        this.discount = 0;

        this.cart = document.getElementById('cart');
        this.productTable = document.getElementById('cartTable');
        this.nameField = document.getElementById('productName');
        this.priceField = document.getElementById('productPrice');
        this.discountField = document.getElementById('discount');
        this.addProductBtn = document.getElementById('addProduct');
        this.setDiscountBtn = document.getElementById('setDiscount');
    }

    initialize() {
        console.log('Cart is initialized!');

        this.bindEvents();
        this.bindModelEvents();
    }

    refreshCart() {
        let tableHead = this.createTableHeadElement();

        this.productTable.innerHTML = '';
        this.productTable.appendChild(tableHead);

        this.products.forEach( item => {
            let product = this.createProductElement(item.name, item.price, item.discount);

            this.productTable.appendChild(product);
        });
    }

    createTableHeadElement() {
        let row = document.createElement('div');

        row.className = 'table-row table-head';
        row.innerHTML = `<div class="table-cell">Продукт</div><div class="table-cell">Цена</div><div class="table-cell">Цена со скидкой</div>`;

        return row;
    }

    createProductElement(name, price, discount) {
        let row = document.createElement('div');

        row.className = 'table-row';
        row.innerHTML = `<div class="table-cell">${name}</div><div class="table-cell">${price}</div><div class="table-cell">${discount}</div>`;

        return row;
    }

    addNewProduct() {
        let name = this.nameField.value;
        let price = this.priceField.value;
        let product = {};

        if (name.length && price > 0) {
            product.name = name;
            product.price = Math.round(price);
            product.discount = Math.round(price);

            this.products.push(product);

            this.emit('addProduct');
        }
    }

    getProductsSum() {
        return this.products.reduce(function(sum, item) {
            return sum + item.price;
        }, 0);
    }

    getMaxPriceProductId() {
        let prices = this.products.map( item => {
            return item.price;
        });
        let maxPrice = Math.max.apply(null, prices);
        let maxPriceProductId;

        this.products.forEach( (item, i) => {
            if (item.price === maxPrice) {
                maxPriceProductId = i;
            };
        });

        return maxPriceProductId;
    }

    getProductsProportions() {
        let sum = this.getProductsSum();

        return this.products.map( item => {
            return item.price / sum;
        });
    }

    setDiscount() {
        this.discount = this.discountField.value;

        this.emit('setDiscount');
    }

    applyDiscount() {
        let discount = this.discount;
        let sum = this.getProductsSum();
        let sumWithDiscount = 0;

        if (discount > 0 && discount <= sum) {
            let proportions = this.getProductsProportions();

            proportions.forEach( (item, i) => {
                console.log(discount * item)
                let currentDiscount = Math.round(this.products[i].price - discount * item);
                console.log(currentDiscount)

                sumWithDiscount += currentDiscount;

                this.products[i].discount = currentDiscount;
            });

            // Apply remainder
            let remainder = discount - (sum - sumWithDiscount);
            let maxPriceProductId = this.getMaxPriceProductId();
            let maxPriceProduct = this.products[maxPriceProductId];

            maxPriceProduct.discount -= remainder;

            this.emit('applyDiscount');
        }
    }

    bindEvents() {
        this.addProductBtn.addEventListener('click', e => {
            e.preventDefault();

            this.addNewProduct();
        });

        this.setDiscountBtn.addEventListener('click', e => {
            e.preventDefault();

            this.setDiscount();
        });
    }

    bindModelEvents() {
        this.on('addProduct', this.refreshCart, this);
        this.on('addProduct', this.applyDiscount, this);
        this.on('setDiscount', this.applyDiscount, this);
        this.on('applyDiscount', this.refreshCart, this);
    }
}
