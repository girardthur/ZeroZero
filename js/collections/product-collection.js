var app = app || {};

(function () {
    'use strict';

    app.ProductCollection = Backbone.Collection.extend({
        model: app.ProductModel,

        initialize: function( models ) {
            this.modelos = models;
        },

        getProductsIncomePerSecond: function() {
            var productsIncomePerSecond = 0;
            for( var i = 0; i < this.modelos.length; i++ ){
                productsIncomePerSecond += this.modelos[i].incomePerSecondBonus;
            }
            return productsIncomePerSecond;
        },

        getProductsIncomePerClick: function() {
            var productsIncomePerClick = 0;
            for( var i = 0; i < this.modelos.length; i++ ){
                productsIncomePerClick += this.modelos[i].incomePerClickBonus;
            }
            return productsIncomePerClick;
        }
    });
})();
