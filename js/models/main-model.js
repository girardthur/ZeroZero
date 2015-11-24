var app = app || {};

(function () {
    'use strict';

    app.MainModel = Backbone.Model.extend({

        defaults: {
            id: 1000,
            description: 'main description',
            sound: false,
            money: 0,
            multiplier: 1,
            incomePerClick: 3,
            incomePerSecond: 2
            //restaurants: RestauCollec,
            //player: PlayerCollec,
        },

        initialize: function() {

        }

    });
})();
