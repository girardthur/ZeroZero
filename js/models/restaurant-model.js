var app = app || {};

(function () {
    'use strict';

    app.RestaurantModel = Backbone.Model.extend({

        defaults: {
            id: 1000,
            name: 'restaurant name',
            description: 'restaurant description',
            stock: 10000,
            bought: false
        },

        initialize: function() {
            this.loadProducts();
        },

        loadProducts: function() {
            this.products = new app.ProductCollection( this.get('products') );
            this.products.bind( 'change add', function() {
                this.trigger( 'change', this );
            }, this );
        },

        getRestaurantIncomePerSecond: function() {
            return this.products.getProductsIncomePerSecond();
        },

        getRestaurantIncomePerClick: function() {
            return this.products.getProductsIncomePerClick();
        }

    });

})();
