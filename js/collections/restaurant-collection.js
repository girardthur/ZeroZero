var app = app || {};

(function () {
    'use strict';

    app.RestaurantCollection = Backbone.Collection.extend({
        model: app.RestaurantModel,

        /**
         * Restaurant collection constructor
         *
         * @param {Array} models
         * @return {RestaurantCollection} restaurantCollection
         */
        initialize: function( models ) {

        },

        /**
         * Add each restaurant income per sec bought to return income per sec restaurantCollection
         *
         * @return {int} restaurantsIncomePerSecond
         */
        getRestaurantsIncomePerSecond: function() {
            var restaurantsIncomePerSecond = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    restaurantsIncomePerSecond += this.models[i].getRestaurantIncomePerSecond();
                }
            }
            return restaurantsIncomePerSecond;
        },

        /**
         * Add each restaurant income per click bought to return income per click restaurantCollection
         *
         * @return {int} restaurantsIncomePerClick
         */
        getRestaurantsIncomePerClick: function() {
            var restaurantsIncomePerClick = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    restaurantsIncomePerClick += this.models[i].getRestaurantIncomePerClick();
                }
            }
            return restaurantsIncomePerClick;
        },

        /**
         * Get a Restaurant id with a Product id
         *
         * @param {int} productId
         * @return {int} restaurantId
         */
        getRestaurantIdWithProductId: function( productId ) {
            return parseInt( productId.toString().slice( 0, 2 ) );
        },

        /**
         * Get a Restaurant with a Product id
         *
         * @param {int} productId
         * @return {RestaurantModel} restaurant
         */
        getRestaurantWithProductId: function( productId ) {
            return this.get( this.getRestaurantIdWithProductId( productId ) );
        },

        restaurantExist: function( restaurantId ) {
            return typeof this.get(restaurantId) === 'object';
        },

        /**
         * Check if a restaurant is valid ( exist and can be bought )
         *
         * @param {int} restaurantId
         * @return {boolean} restaurantIsValid
         */
        isValidRestaurantRId: function( restaurantId ) {
            if ( this.restaurantExist( restaurantId ) ) {
                return !this.get( restaurantId ).get('bought');
            } else {
                return false;
            }
        },

        /**
         * Check if a restaurant is valid with a product Id( exist and can be bought )
         *
         * @param {int} productId
         * @return {boolean} restaurantIsValid
         */
        isValidRestaurantPId: function( productId ) {
            return this.isValidRestaurantRId( this.getRestaurantIdWithProductId( productId ) );
        },

        /**
         * Check if a product is valid with a product Id( exist and can be bought )
         *
         * @param {int} productId
         * @return {boolean} productIsValid
         */
        isValidProduct: function( productId ) {
            if ( this.isValidRestaurantPId( productId ) ) {
                return this.getRestaurantWithProductId( productId ).isValidProduct( productId );
            } else {
                return false;
            }

        },

        /**
         * Get a product with productId
         *
         * @param {int} productId
         * @return {ProductModel} product
         */
        getProduct: function( productId ) {
            return this.getRestaurantWithProductId( productId ).getProduct( productId );
        }

    });

})();
