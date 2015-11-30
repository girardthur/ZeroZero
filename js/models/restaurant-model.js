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

        /**
         * Restaurant model constructor
         *
         * @return {RestaurantModel}
         */
        initialize: function() {
            this.loadProducts();
        },

        /**
         * Load restaurant products into product collection
         */
        loadProducts: function() {
            this.products = new app.ProductCollection( this.get('products') );
            this.products.bind( 'change add', function() {
                this.trigger( 'change', this );
            }, this );
        },

        /**
         * Call recalculate income per sec products collection method
         *
         * @return {int} incomePerSecond
         */
        getRestaurantIncomePerSecond: function() {
            return this.products.getProductsIncomePerSecond();
        },

        /**
         * Call recalculate income per click products collection method
         *
         * @return {int} incomePerClick
         */
        getRestaurantIncomePerClick: function() {
            return this.products.getProductsIncomePerClick();
        },

        isValidProduct: function( productId ) {
            return this.products.isValidProduct( productId );
        },

        /**
         * Get a product contained in products collection with a product id
         *
         * @param {int} productId
         * @return {ProductModel} product
         */
        getProduct: function( productId ) {
            return this.products.get( productId );
        }

    });

})();
