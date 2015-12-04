'use strict';

var app = app || {};
app.View = app.View || {};
app.View.Page = app.View.Page || {};

app.View.Page.Options = app.Core.Page.extend({
  el: '#optionsPage',
  initialize: function(opts) {
    this._app = opts.app;
  }
});
