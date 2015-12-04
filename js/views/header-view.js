'use strict';

var app = app || {};
app.View = app.View || {};

app.View.Header = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },
  initialize: function(opts) {
    this._app = opts.app;

    this.model.on('change:money', this.moneyChanged, this);
    this.model.on('change:incomePerClick', this.incomePCChanged, this);
    this.model.on('change:incomePerSecond', this.incomePSChanged, this);

    this.saveReferences();
  },
  saveReferences: function() {
    this.$money = this.$('[data-target="money"]');
    this.$incomePS = this.$('[data-target="incomePS"]');
    this.$incomePC = this.$('[data-target="incomePC"]');
  },
  // Update money display
  moneyChanged: function() {
    this.$money.html(this.model.get('money') );
  },
  // Update income per second display
  incomePSChanged: function() {
    this.$incomePS.html(this.model.get('incomePerSecond') + " PS" );
  },
  // Update income per click display
  incomePCChanged: function() {
    this.$incomePC.html(this.model.get('incomePerClick') + " PC" );
  },
  // Update money for a click
  onClick: function() {
      this.model.clickIncome();
  },
});
