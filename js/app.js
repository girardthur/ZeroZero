/*global $ */
/*jshint unused:false */
var app = app || {};

$(function () {
    'use strict';
    var mainModel = new app.MainModel();
    new app.AppView( { model: mainModel } );
});
