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
            this.setIntervalWithContext( this.secondPassed, 1000, this );
            var self = this;
            this.fetch( { success: function( self ) {
                self.refreshIncome();
            } } );
        },

        refreshIncome: function() {
            this.set( {
                incomePerSecond: this.getTotalIncomePerSecond(),
                incomePerClick: this.getTotalIncomePerClick()
            } );
        },

        loadRestaurants: function( restaurants ) {
            this.restaurants = new app.RestaurantCollection( restaurants );
            this.restaurants.bind( 'change add', function() {
                this.refreshIncome();
            }, this );
        },

        loadPlayer: function( player ) {
            this.player = new app.PlayerModel( player );
        },

        getTotalIncomePerSecond: function() {
            return this.restaurants.getRestaurantsIncomePerSecond();
        },

        getTotalIncomePerClick: function() {
            return this.restaurants.getRestaurantsIncomePerClick();
        },

        parse: function( response ) {
            this.loadPlayer( response.player );
            this.loadRestaurants( response.restaurants );
            return response;
        },

        setIntervalWithContext: function( code, delay, context ){
            return setInterval( function() {
                code.call( context )
            }, delay )
        },

        secondPassed: function() {
            this.set({
                money: ( this.get('incomePerSecond') * this.get('multiplier') ) + this.get('money')
            });
        },

        canBuy: function( productId ) {
            if ( this.restaurants.isValidProduct( productId ) ) {
                return this.restaurants.getProduct(productId).get('price') <= this.get('money');
            } else {
                return false;
            }
        }

    });

})();
