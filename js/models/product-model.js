var app = app || {};

(function () {
    'use strict';

    app.ProductModel = Backbone.Model.extend({

        defaults: {
            id: 1000,
            name: 'product name',
            description: 'product description',
            incomePerClickBonus: 1,
            incomePerSecondBonus: 1,
            bought: false,
            price: 100
        },

        /**
         * Product model constructor
         *
         * @return {ProductModel}
         */
        initialize: function() {

        }

    });

})();
