var app = app || {};

(function () {
    'use strict';

    app.MainModel = Backbone.Model.extend({
        url: "./data/data.json",
        defaults: {
            id: 1000,
            description: 'main description',
            sound: false,
            money: 0,
            multiplier: 1,
            incomePerClick: 3,
            incomePerSecond: 2
        },

        initialize: function() {
            this.fetch( { success: function() { console.log( "SUCCESS: Main model fetch" ) } } );
        },

        loadRestaurants: function( restaurants ) {
            this.restaurants = new app.RestaurantCollection( restaurants );
        },

        loadPlayer: function( player ) {
            this.player = new app.PlayerModel( player );
        },

        parse: function( response ) {
            this.loadPlayer( response.player );
            this.loadRestaurants( response.restaurants );
            return response;
        }

    });
})();
