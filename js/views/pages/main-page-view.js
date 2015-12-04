'use strict';

var app = app || {};
app.View = app.View || {};
app.View.Page = app.View.Page || {};

app.View.Page.Main = app.Core.Page.extend({
  el: '#mainPage',
  initialize: function(opts) {
    this._app = opts.app;
  }
});
