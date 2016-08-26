!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";"use strict!";var r=n(2),i=new r.Cart;i.initialize()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.Cart=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(3);e.Cart=function(t){function e(){r(this,e);var t=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.products=[],t.discount=0,t.cart=document.getElementById("cart"),t.productTable=document.getElementById("cartTable"),t.nameField=document.getElementById("productName"),t.priceField=document.getElementById("productPrice"),t.discountField=document.getElementById("discount"),t.addProductBtn=document.getElementById("addProduct"),t.setDiscountBtn=document.getElementById("setDiscount"),t}return o(e,t),u(e,[{key:"initialize",value:function(){console.log("Cart is initialized!"),this.bindEvents(),this.bindModelEvents()}},{key:"refreshCart",value:function(){var t=this,e=this.createTableHeadElement();this.productTable.innerHTML="",this.productTable.appendChild(e),this.products.forEach(function(e){var n=t.createProductElement(e.name,e.price,e.discount);t.productTable.appendChild(n)})}},{key:"createTableHeadElement",value:function(){var t=document.createElement("div");return t.className="table-row table-head",t.innerHTML='<div class="table-cell">Продукт</div><div class="table-cell">Цена</div><div class="table-cell">Цена со скидкой</div>',t}},{key:"createProductElement",value:function(t,e,n){var r=document.createElement("div");return r.className="table-row",r.innerHTML='<div class="table-cell">'+t+'</div><div class="table-cell">'+e+'</div><div class="table-cell">'+n+"</div>",r}},{key:"addNewProduct",value:function(){var t=this.nameField.value,e=this.priceField.value,n={};t.length&&e>0&&(n.name=t,n.price=Math.round(e),n.discount=Math.round(e),this.products.push(n),this.emit("addProduct"))}},{key:"getProductsSum",value:function(){return this.products.reduce(function(t,e){return t+e.price},0)}},{key:"getMaxPriceProduct",value:function(){var t=this.products.map(function(t){return t.price}),e=Math.max.apply(null,t);return e}},{key:"getProductsProportions",value:function(){var t=this.getProductsSum();return this.products.map(function(e){return e.price/t})}},{key:"setDiscount",value:function(){var t=this,e=this.discountField.value,n=this.getProductsSum(),r=0;if(e>0&&e<=n){e=Math.round(e);var i=this.getProductsProportions();i.forEach(function(n,i){var o=e*n;r+=o,t.products[i].discount=Math.round(t.products[i].price-o)}),this.emit("setDiscount")}}},{key:"bindEvents",value:function(){var t=this;this.addProductBtn.addEventListener("click",function(e){e.preventDefault(),t.addNewProduct()}),this.setDiscountBtn.addEventListener("click",function(e){e.preventDefault(),t.setDiscount()})}},{key:"bindModelEvents",value:function(){this.on("addProduct",this.refreshCart,this),this.on("addProduct",this.setDiscount,this),this.on("setDiscount",this.refreshCart,this)}}]),e}(c.EventEmitter)},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e,n){return t.fn==e&&t.ctx==n}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.EventEmitter=function(){function t(){n(this,t),this.events=new Map}return i(t,[{key:"_addEvent",value:function(t,e,n){if(this._hasEvent(t)){var i=this._getEvent(t).some(function(t){return!r(t,e,n)});i&&this._getEvent(t).push({fn:e,ctx:n})}else this.events.set(t,[{fn:e,ctx:n}])}},{key:"_removeEvent",value:function(t,e,n){var i=this;this._hasEvent(t)&&this._getEvent(t).forEach(function(o,u){r(o,e,n)&&i._getEvent(t).splice(u,1)})}},{key:"_activateEvent",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];this._hasEvent(t)&&this._getEvent(t).forEach(function(t){var e;(e=t.fn).apply.apply(e,[t.ctx].concat(n))})}},{key:"_getEvent",value:function(t){return this.events.get(t)}},{key:"_hasEvent",value:function(t){return this.events.has(t)}},{key:"on",value:function(t,e,n){return this._addEvent(t,e,n)}},{key:"un",value:function(t,e,n){return this._removeEvent(t,e,n)}},{key:"emit",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return this._activateEvent.apply(this,[t].concat(n))}}]),t}()}]);