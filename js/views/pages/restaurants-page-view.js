'use strict';

var app = app || {};
app.View = app.View || {};
app.View.Page = app.View.Page || {};

app.View.Page.Restaurants = app.Core.Page.extend({
  el: '#restaurantsPage',
  events: {
    'click #btnOptions': 'showOptions',
    'click #btnMain': 'showMain',
    'click #btnRestaurants': 'showRestaurants',
  },
  initialize: function(opts) {
    this._app = opts.app;
    this._restaurants = opts.restaurants;
    this._saveTemplates();
  },
  _saveTemplates: function() {
    var $tmpMain = this.$('#restaurants-template');
    this._tpl = {
      main: _.template($tmpMain.html())
    };
    $tmpMain.remove();
  },
  saveReferences: function() {
    // this.$btnOptions = this.$('#btnOptions');
    // this.$btnMain = this.$('#btnOptions');
    // this.$btnRestaurants = this.$('#showRestaurants');
  },
  render: function() {
    this.undelegateEvents();
    this.$el.html(this._tpl.main({
      restaurants: this._restaurants
    }));
    this.delegateEvents();
    return this;
  }
});
