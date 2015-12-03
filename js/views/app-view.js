var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({

        el: '.main',

        events: {
            'click #btnOptions': 'showOptions',
            'click #btnMain': 'showMain',
            'click #btnRestaurants': 'showRestaurants',
            'click #indexPage': 'clickIndex',
            'click [data-target-action="infosRestaurant"]': 'showProducts',
            'click [data-target-action="clickBuyProduct"]': 'buyProduct'
        },

        /**
         * AppView Constructor
         *
         * @return {AppView} appView
         */
        initialize: function() {

            this.model.on( 'change:money', this.moneyChanged, this );
            this.model.on( 'change:incomePerClick', this.incomePCChanged, this );
            this.model.on( 'change:incomePerSecond', this.incomePSChanged, this );

            this.$btnOptions = this.$('#btnOptions');
            this.$btnMain = this.$('#btnMain');
            this.$btnRestaurants = this.$('#btnRestaurants');

            this.$indexPage = this.$('#indexPage');
            this.$restaurants = this.$('#restaurantsPage');
            this.$restaus = this.$('[data-target="restaurants"]');
            this.$options = this.$('#optionsPage');

            this.$money = this.$('[data-target="money"]');
            this.$incomePS = this.$('[data-target="incomePS"]');
            this.$incomePC = this.$('[data-target="incomePC"]');

            this.$popup = this.$('#popup');

            this.showMain();
            this.render();
        },

        /**
         * Show restaurant's products in popup
         *
         * @param {event} e
         */
        showProducts: function( e ) {
            if ( this.model.restaurants.get( $(e.currentTarget).attr('data-id')).get('bought') ) {
                var templ =  _.template( $('#modal-template').html() );
                var restau = this.model.restaurants.get( $(e.currentTarget).attr('data-id') );

                this.$popup.append( templ( { restaurant: restau} ) );
            }
        },

        /**
         * render method
         */
        render: function() {
            this.moneyChanged();
            this.incomePCChanged();
            this.incomePSChanged();
        },

        /**
         * Update money display
         */
        moneyChanged: function() {
            this.$money.html( this.model.get('money') );
        },

        /**
         * Update income per second display
         */
        incomePSChanged: function() {
            this.$incomePS.html( this.model.get('incomePerSecond') + " PS" );
        },

        /**
         * Update income per click display
         */
        incomePCChanged: function() {
            this.$incomePC.html( this.model.get('incomePerClick') + " PC" );
        },

        /**
         * Show options screen
         */
        showOptions: function() {
            this.$indexPage.hide();
            this.$restaurants.hide();

            this.setBtnActive( this.$btnOptions );
            this.$options.show();
        },

        /**
         * Show main screen
         */
        showMain: function() {
            this.$options.hide();
            this.$restaurants.hide();

            this.setBtnActive( this.$btnMain );
            this.$indexPage.show();


        },

        /**
         * Show restaurants screen
         */
        showRestaurants: function() {
            this.$options.hide();
            this.$indexPage.hide();

            this.setBtnActive( this.$btnRestaurants );
            this.$restaurants.show();
            this.initRestaurants();
        },

        /**
         * Update selected menu button
         */
        setBtnActive: function( but ) {
            var activeStr = 'active';
            this.$btnOptions.removeClass( activeStr );
            this.$btnMain.removeClass( activeStr );
            this.$btnRestaurants.removeClass( activeStr );

            but.addClass( activeStr );
        },

        /**
         * Update money for a click
         */
        clickIndex: function() {
            this.model.clickIncome();
        },

        /**
         * Initialize restaurants list
         */
        initRestaurants: function() {
            var templ =  _.template( $('#restaurants-template').html() );
            this.$restaus.html( templ( { restaurants: this.model.restaurants } ) );
        }

    });

})(jQuery);
