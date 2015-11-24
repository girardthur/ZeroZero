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

        initialize: function () {

            this.model.on('change:money',this.moneyChanged,this);
            this.model.on('change:incomePerClick',this.incomePCChanged,this);
            this.model.on('change:incomePerSecond',this.incomePSChanged,this);

            this.$btnOptions = this.$('#btnOptions');
            this.$btnMain = this.$('#btnMain');
            this.$btnRestaurants = this.$('#btnRestaurants');

            this.$indexPage = this.$('#indexPage');
            this.$restaurants = this.$('#restaurantsPage');
            this.$options = this.$('#optionsPage');

            this.$money = this.$('#money');
            this.$incomePS = this.$('#incomePS');
            this.$incomePC = this.$('#incomePC');

            this.showMain();
            this.render();
        },

        render: function() {
            this.moneyChanged();
            this.incomePCChanged();
            this.incomePSChanged();
        },

        moneyChanged: function () {
            this.$money.empty();
            this.$money.append(this.model.get('money'));
        },

        incomePSChanged: function() {
            this.$incomePS.empty();
            this.$incomePS.append(this.model.get('incomePerSecond')+" PS");
        },

        incomePCChanged: function() {
            this.$incomePC.empty();
            this.$incomePC.append(this.model.get('incomePerClick')+" PC");
        },

        showOptions: function () {
            this.$indexPage.hide();
            this.$restaurants.hide();

            this.setBtnActive(this.$btnOptions);
            this.$options.show();
        },

        showMain: function () {
            this.$options.hide();
            this.$restaurants.hide();

            this.setBtnActive(this.$btnMain);
            this.$indexPage.show();
        },

        showRestaurants: function () {
            this.$options.hide();
            this.$indexPage.hide();

            this.setBtnActive(this.$btnRestaurants);
            this.$restaurants.show();
        },

        setBtnActive: function ( but ) {
            this.$btnOptions.removeClass('active');
            this.$btnMain.removeClass('active');
            this.$btnRestaurants.removeClass('active');

            but.addClass('active');
        },

        clickIndex: function () {
            var clickIncome = this.model.get('money')+(this.model.get('incomePerClick')*this.model.get('multiplier'));
            this.model.set({money:clickIncome});
        }

    });
})(jQuery);
