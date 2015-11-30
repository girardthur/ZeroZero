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

        /**
         * Main model constructor
         *
         * @return {MainModel}
         */
        initialize: function() {
            this.setIntervalWithContext( this.secondPassed, 1000, this );
            var self = this;
            this.fetch( { success: function( self ) {
                self.refreshIncome();
            } } );
        },

        /**
         * Refresh income attributes with new values
         */
        refreshIncome: function() {
            this.set( {
                incomePerSecond: this.getTotalIncomePerSecond(),
                incomePerClick: this.getTotalIncomePerClick()
            } );
        },

        /**
         * Load restaurants json data into a restaurant collection and set it in attribute
         *
         * @param {json} restaurants
         */
        loadRestaurants: function( restaurants ) {
            this.restaurants = new app.RestaurantCollection( restaurants );
            this.restaurants.bind( 'change add', function() {
                this.refreshIncome();
            }, this );
        },

        /**
         * Load player json data into a player model and set it in attribute
         *
         * @param {json} player
         */
        loadPlayer: function( player ) {
            this.player = new app.PlayerModel( player );
        },

        /**
         * Recalculate income per second calling restaurants collection
         *
         * @return {int} incomePerSecond
         */
        getTotalIncomePerSecond: function() {
            return this.restaurants.getRestaurantsIncomePerSecond();
        },

        /**
         * Recalculate income per click calling restaurants collection
         *
         * @return {int} incomePerClick
         */
        getTotalIncomePerClick: function() {
            return this.restaurants.getRestaurantsIncomePerClick();
        },

        /**
         * Call loading methods when the model is fetched
         *
         * @param {response} response
         * @return {response} response
         */
        parse: function( response ) {
            this.loadPlayer( response.player );
            this.loadRestaurants( response.restaurants );
            return response;
        },

        /**
         * Used to keep context with setInterval native function
         *
         * @param {String} code
         * @param {int} delay
         * @param {context} context
         * @return {Function} setInterval
         */
        setIntervalWithContext: function( code, delay, context ){
            return setInterval( function() {
                code.call( context )
            }, delay )
        },

        /**
         * Set money with new value ( executed each sec )
         */
        secondPassed: function() {
            this.set({
                money: ( this.get('incomePerSecond') * this.get('multiplier') ) + this.get('money')
            });
        },

        /**
         * Check if a product can be bought
         *
         * @param {int} productId
         * @return {boolean} isPurchasable
         */
        canBuy: function( productId ) {
            if ( this.restaurants.isValidProduct( productId ) ) {
                return this.restaurants.getProduct(productId).get('price') <= this.get('money');
            } else {
                return false;
            }
        },

        /**
         * Update money for a click
         */
        clickIncome: function() {
            this.set( { money: ( this.get('incomePerClick') * this.get('multiplier') ) + this.get('money') } );
        }

    });

})();
