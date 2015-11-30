var app = app || {};

(function () {
    'use strict';

    app.ProductCollection = Backbone.Collection.extend({
        model: app.ProductModel,

        /**
         * Product collection constructor
         *
         * @param {Array} models
         * @return {ProductCollection} productsCollection
         */
        initialize: function( models ) {

        },

        /**
         * Add each product income per sec bought to return income per sec productsCollection
         *
         * @return {int} productsIncomePerSecond
         */
        getProductsIncomePerSecond: function() {
            var productsIncomePerSecond = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    productsIncomePerSecond += this.models[i].get('incomePerSecondBonus');
                }
            }
            return productsIncomePerSecond;
        },

        /**
         * Add each product income per click bought to return income per click productsCollection
         *
         * @return {int} productsIncomePerClick
         */
        getProductsIncomePerClick: function() {
            var productsIncomePerClick = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    productsIncomePerClick += this.models[i].get('incomePerClickBonus');
                }
            }
            return productsIncomePerClick;
        },

        /**
         * Check if a product exist in the products collection
         *
         * @return {boolean} productExist
         */
        productExist: function( productId ) {
            return typeof this.get( productId ) === 'object';
        },

        /**
         * Check if a product is valid ( exist and can be bought )
         *
         * @return {boolean} isValid
         */
        isValidProduct: function( productId ) {
            if ( this.productExist( productId ) ) {
                return this.get( productId ).get('bought') ? false : true;
            } else {
                return false;
            }
        }

    });

})();
