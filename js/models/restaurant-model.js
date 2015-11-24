var app = app || {};

(function () {
    'use strict';

    app.RestaurantModel = Backbone.Model.extend({

        defaults: {
            id: 1000,
            name: 'restaurant name',
            description: 'restaurant description',
            stock: 10000,
            bought: false
            // products: ProductsCollec
        }

    });
})();
