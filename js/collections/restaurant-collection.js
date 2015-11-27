var app = app || {};

(function () {
    'use strict';

    app.RestaurantCollection = Backbone.Collection.extend({
        model: app.RestaurantModel,

        initialize: function( models ) {

        },

        getRestaurantsIncomePerSecond: function() {
            var restaurantsIncomePerSecond = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    restaurantsIncomePerSecond += this.models[i].getRestaurantIncomePerSecond();
                }
            }
            return restaurantsIncomePerSecond;
        },

        getRestaurantsIncomePerClick: function() {
            var restaurantsIncomePerClick = 0;
            for ( var i = 0; i < this.models.length; i++ ) {
                if ( this.models[i].get('bought') ) {
                    restaurantsIncomePerClick += this.models[i].getRestaurantIncomePerClick();
                }
            }
            return restaurantsIncomePerClick;
        },

        getRestaurantIdWithProductId: function( productId ) {
            return parseInt( productId.toString().slice( 0, 2 ) );
        },

        getRestaurantWithProductId: function( productId ) {
            return this.get( this.getRestaurantIdWithProductId( productId ) );
        },

        restaurantExist: function( restaurantId ) {
            return typeof this.get(restaurantId) === 'object';
        },

        isValidRestaurantRId: function( restaurantId ) {
            if ( this.restaurantExist( restaurantId ) ) {
                return this.get( restaurantId ).get('bought');
            } else {
                return false;
            }
        },

        isValidRestaurantPId: function( productId ) {
            return this.isValidRestaurantRId( this.getRestaurantIdWithProductId( productId ) );
        },

        isValidProduct: function( productId ) {
            if ( this.isValidRestaurantPId( productId ) ) {
                return this.getRestaurantWithProductId( productId ).isValidProduct( productId );
            } else {
                return false;
            }

        },

        getProduct: function( productId ) {
            return this.getRestaurantWithProductId( productId ).getProduct( productId );
        }

    });

})();
