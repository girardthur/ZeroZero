var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({

        el: '.main',

        events: {
            'click #btnOptions': 'showOptions',
            'click #btnMain': 'showMain',
            'click #btnRestaurants': 'showRestaurants',
            'click #indexPage': 'clickIndex'
        },

        initialize: function() {

            this.model.on( 'change:money', this.moneyChanged, this );
            this.model.on( 'change:incomePerClick', this.incomePCChanged, this );
            this.model.on( 'change:incomePerSecond', this.incomePSChanged, this );

            this.$btnOptions = this.$('#btnOptions');
            this.$btnMain = this.$('#btnMain');
            this.$btnRestaurants = this.$('#btnRestaurants');

            this.$indexPage = this.$('#indexPage');
            this.$restaurants = this.$('#restaurantsPage');
            this.$options = this.$('#optionsPage');

            this.$money = this.$('[data-target="money"]');
            this.$incomePS = this.$('[data-target="incomePS"]');
            this.$incomePC = this.$('[data-target="incomePC"]');

            this.showMain();
            this.render();
        },

        render: function() {
            this.moneyChanged();
            this.incomePCChanged();
            this.incomePSChanged();
        },

        moneyChanged: function() {
            this.$money.html( this.model.get('money') );
        },

        incomePSChanged: function() {
            this.$incomePS.html( this.model.get('incomePerSecond') + " PS" );
        },

        incomePCChanged: function() {
            this.$incomePC.html( this.model.get('incomePerClick') + " PC" );
        },

        showOptions: function() {
            this.$indexPage.hide();
            this.$restaurants.hide();

            this.setBtnActive( this.$btnOptions );
            this.$options.show();
        },

        showMain: function() {
            this.$options.hide();
            this.$restaurants.hide();

            this.setBtnActive( this.$btnMain );
            this.$indexPage.show();
        },

        showRestaurants: function() {
            this.$options.hide();
            this.$indexPage.hide();

            this.setBtnActive( this.$btnRestaurants );
            this.$restaurants.show();
        },

        setBtnActive: function( but ) {
            var activeStr = 'active';
            this.$btnOptions.removeClass( activeStr );
            this.$btnMain.removeClass( activeStr );
            this.$btnRestaurants.removeClass( activeStr );

            but.addClass( activeStr );
        },

        clickIndex: function() {
            var clickIncome = ( this.model.get('incomePerClick') * this.model.get('multiplier') );
            clickIncome += this.model.get('money');
            this.model.set( { money: clickIncome } );
        }

    });
    
})(jQuery);
