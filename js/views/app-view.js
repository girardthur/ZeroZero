var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({

        el: '.main',

        events: {
            'click #btnOptions': 'showOptions',
            'click #btnMain': 'showMain',
            'click #btnRestaurants': 'showRestaurants'
        },

        initialize: function () {
            this.$btnOptions = this.$('#btnOptions');
            this.$btnMain = this.$('#btnMain');
            this.$btnRestaurants = this.$('#btnRestaurants');

            this.$indexPage = this.$('#indexPage');
            this.$restaurants = this.$('#restaurantsPage');
            this.$options = this.$('#optionsPage');

            this.showMain();
        },

        render: function () {
            // TMP VOID
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

        setBtnActive: function (but) {
            this.$btnOptions.removeClass('active');
            this.$btnMain.removeClass('active');
            this.$btnRestaurants.removeClass('active');

            but.addClass('active');
        }

    });
})(jQuery);
