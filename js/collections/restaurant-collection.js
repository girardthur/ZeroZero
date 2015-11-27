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
        }
    });
})();
