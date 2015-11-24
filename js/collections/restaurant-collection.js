var app = app || {};

(function () {
    'use strict';

    app.RestaurantCollection = Backbone.Collection.extend({
        model: app.RestaurantModel
    });
})();
