var app = app || {};

(function () {
    'use strict';

    app.MainModel = Backbone.Model.extend({

        defaults: {
            title: '',
            completed: false
        }

    });
})();
