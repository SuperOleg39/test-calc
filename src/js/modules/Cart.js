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

    getMaxPriceProduct() {
        let prices = this.products.map( item => {
            return item.price;
        });

        let maxPrice = Math.max.apply(null, prices);

        return maxPrice;
    }

    getProductsProportions() {
        let sum = this.getProductsSum();

        return this.products.map( item => {
            return item.price / sum;
        });
    }

    setDiscount() {
        let discount = this.discountField.value;
        let sum = this.getProductsSum();
        let appliedDiscount = 0;

        if (discount > 0 && discount <= sum) {
            discount = Math.round(discount);

            let proportions = this.getProductsProportions();

            proportions.forEach( (item, i) => {
                let currentDiscount = discount * item;

                appliedDiscount += currentDiscount;

                this.products[i].discount = Math.round(this.products[i].price - currentDiscount);
            });

            this.emit('setDiscount');
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
        this.on('addProduct', this.setDiscount, this);
        this.on('setDiscount', this.refreshCart, this);
    }
}
