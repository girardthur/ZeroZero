'use strict';

var app = app || {};
app.View = app.View || {};

app.View.Footer = Backbone.View.extend({
  events: {
    'click #btnOptions': 'showOptions',
    'click #btnMain': 'showMain',
    'click #btnRestaurants': 'showRestaurants',
  },
  initialize: function(opts) {
    this._app = opts.app;
    this.saveReferences();
  },
  saveReferences: function() {
    // this.$btnOptions = this.$('#btnOptions');
    // this.$btnMain = this.$('#btnOptions');
    // this.$btnRestaurants = this.$('#showRestaurants');
  },
  showOptions: function() {
    this._app.showPage('Page.Options');
  },
  showMain: function() {
    this._app.showPage('Page.Main');
  },
  showRestaurants: function() {
    this._app.showPage('Page.Restaurants');
  }
});
