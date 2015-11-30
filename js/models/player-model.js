var app = app || {};

(function () {
    'use strict';

    app.PlayerModel = Backbone.Model.extend({

        defaults: {
            id: 1000,
            name: 'player name',
            startDate: '',
            moneySinceStart: 1999,
            tapSinceStart: 100
        },

        /**
         * Player model constructor
         *
         * @return {PlayerModel}
         */
        initialize: function() {

        }

    });

})();
