'use strict';

var app = app || {};
app.Core = app.Core || {};

app.Core.Page = Backbone.View.extend({
  show: function() {
    this.$el.show();
  },
  hide: function() {
    this.$el.hide();
  }
});
