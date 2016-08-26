!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";"use strict!";var i=n(2),r=new i.Cart;r.initialize()},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Cart=void 0;var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),u=n(3);e.Cart=function(t){function e(){i(this,e);var t=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.products=[],t.discount=0,t.cart=document.getElementById("cart"),t.productTable=document.getElementById("cartTable"),t.nameField=document.getElementById("productName"),t.priceField=document.getElementById("productPrice"),t.discountField=document.getElementById("discount"),t.addProductBtn=document.getElementById("addProduct"),t.setDiscountBtn=document.getElementById("setDiscount"),t}return o(e,t),c(e,[{key:"initialize",value:function(){console.log("Cart is initialized!"),this.bindEvents(),this.bindModelEvents()}},{key:"refreshCart",value:function(){var t=this,e=this.createTableHeadElement();this.productTable.innerHTML="",this.productTable.appendChild(e),this.products.forEach(function(e){var n=t.createProductElement(e.name,e.price,e.discount);t.productTable.appendChild(n)})}},{key:"createTableHeadElement",value:function(){var t=document.createElement("div");return t.className="table-row table-head",t.innerHTML='<div class="table-cell">Продукт</div><div class="table-cell">Цена</div><div class="table-cell">Цена со скидкой</div>',t}},{key:"createProductElement",value:function(t,e,n){var i=document.createElement("div");return i.className="table-row",i.innerHTML='<div class="table-cell">'+t+'</div><div class="table-cell">'+e+'</div><div class="table-cell">'+n+"</div>",i}},{key:"addNewProduct",value:function(){var t=this.nameField.value,e=this.priceField.value,n={};t.length&&e>0&&(n.name=t,n.price=Math.round(e),n.discount=Math.round(e),this.products.push(n),this.emit("addProduct"))}},{key:"getProductsSum",value:function(){return this.products.reduce(function(t,e){return t+e.price},0)}},{key:"getMaxPriceProductId",value:function(){var t=this.products.map(function(t){return t.price}),e=Math.max.apply(null,t),n=void 0;return this.products.forEach(function(t,i){t.price===e&&(n=i)}),n}},{key:"getProductsProportions",value:function(){var t=this.getProductsSum();return this.products.map(function(e){return e.price/t})}},{key:"setDiscount",value:function(){this.discount=this.discountField.value,this.emit("setDiscount")}},{key:"applyDiscount",value:function(){var t=this,e=this.discount,n=this.getProductsSum(),i=0;if(e>0&&e<=n){var r=this.getProductsProportions();r.forEach(function(n,r){var o=Math.round(t.products[r].price-e*n);i+=o,t.products[r].discount=o});var o=e-(n-i),c=this.getMaxPriceProductId(),u=this.products[c];u.discount-=o,this.emit("applyDiscount")}}},{key:"bindEvents",value:function(){var t=this;this.addProductBtn.addEventListener("click",function(e){e.preventDefault(),t.addNewProduct()}),this.setDiscountBtn.addEventListener("click",function(e){e.preventDefault(),t.setDiscount()})}},{key:"bindModelEvents",value:function(){this.on("addProduct",this.refreshCart,this),this.on("addProduct",this.applyDiscount,this),this.on("setDiscount",this.applyDiscount,this),this.on("applyDiscount",this.refreshCart,this)}}]),e}(u.EventEmitter)},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e,n){return t.fn==e&&t.ctx==n}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();e.EventEmitter=function(){function t(){n(this,t),this.events=new Map}return r(t,[{key:"_addEvent",value:function(t,e,n){if(this._hasEvent(t)){var r=this._getEvent(t).some(function(t){return!i(t,e,n)});r&&this._getEvent(t).push({fn:e,ctx:n})}else this.events.set(t,[{fn:e,ctx:n}])}},{key:"_removeEvent",value:function(t,e,n){var r=this;this._hasEvent(t)&&this._getEvent(t).forEach(function(o,c){i(o,e,n)&&r._getEvent(t).splice(c,1)})}},{key:"_activateEvent",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];this._hasEvent(t)&&this._getEvent(t).forEach(function(t){var e;(e=t.fn).apply.apply(e,[t.ctx].concat(n))})}},{key:"_getEvent",value:function(t){return this.events.get(t)}},{key:"_hasEvent",value:function(t){return this.events.has(t)}},{key:"on",value:function(t,e,n){return this._addEvent(t,e,n)}},{key:"un",value:function(t,e,n){return this._removeEvent(t,e,n)}},{key:"emit",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];return this._activateEvent.apply(this,[t].concat(n))}}]),t}()}]);