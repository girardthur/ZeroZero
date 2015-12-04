/*global $ */
/*jshint unused:false */
'use strict';

var app = app || {};

var Application = (function() {
  function Application() {
    this._private = {
      currentPage: null,
    };
    // this.init();
  }

  Application.prototype = {
    // Il faut bien se cacher des choses de temps a autre
    // TODO: Prendre des cours de blagues, droles
    Cache: {
      Views: {},
      Collections: {},
      Models: {},
      set: function(prop, name, data) {
        this[prop][name] = data;
        return this;
      },
      get: function(prop, name) {
        return this[prop][name];
      },
    },
    showPage: function(targetedPage) {
      var pageView = this.getView(targetedPage);
      if (pageView == null) {
        console.error('Targeted page not found', targetedPage);;
        return;
      }
      if (this._private.currentPage) {
        this._private.currentPage.hide();
      }
      this._private.currentPage = pageView;
      // On peu le faire en 1 ligne, mais ca implique une certaine rigueur pour plus tard, so, on la joue a la cool
      this._private.currentPage.show();
    },
    // ShortCuts
    getView: function(name) {
      return this.Cache.get('Views', name);
    },
    setView: function(name, view) {
      return this.Cache.set('Views', name, view);
    },
    getModel: function(name) {
      return this.Cache.get('Models', name);
    },
    setModel: function(name, view) {
      return this.Cache.set('Models', name, view);
    },
    getCollection: function(name) {
      return this.Cache.get('Collections', name);
    },
    setCollection: function(name, collection) {
      this.Cache.set('Collections', name, collection);
      return collection;
    },
    getMainModel: function() {
      return this.getModel('Main');
    },
    initCollections: function() {
      // ex: this.Cache.setCollection(new app.Collection.Restaurants());
      return new Promise(function(resolve, reject) {
        this.setModel('Main', new app.MainModel());
        var fakeRestaurants = _.times(16, function(index) {
          return new app.RestaurantModel({
            id: index + 1,
            name: 'restaurant name ' + index,
            description: 'restaurant description'  + index,
            stock: index * 1000,
            bought: true
          });
        });
        this.setCollection('Restaurants', new app.RestaurantCollection(fakeRestaurants));
        resolve();
      }.bind(this));
    },
    initVars: function() {
      return new Promise(function(resolve, reject) {
        this.initCollections()
          .then(resolve)
          .catch(reject);
      }.bind(this));
    },
    initLayout: function() {
  		var hHeader = $('header').get(0).offsetHeight,
  			hFooter = $('footer').get(0).offsetHeight,
        $body = $('section.page-container'),
  			hViewPort = window.innerHeight;

        $body.css('top', hHeader + 'px');
    		$body.css('overflow', 'auto');
    		$body.css('min-height ', '100%');
    		$body.css('max-height', (hViewPort - hHeader - hFooter) + 'px');
    },
    initViews: function() {
      return new Promise(function(resolve, reject) {
        this.initLayout();

        // this.setView('appView', new app.AppView({
        //   model: new app.MainModel(),
        //   app: this
        // }));

        this.setView('footer', new app.View.Footer({
          el: 'footer',
          app: this
        }));
        this.setView('header', new app.View.Header({
          el: 'header',
          app: this,
          model: this.getMainModel()
        }));
        this.setView('Page.Options', new app.View.Page.Options({
          app: this
        }));
        this.setView('Page.Main', new app.View.Page.Main({
          app: this
        }));
        this.setView('Page.Restaurants', new app.View.Page.Restaurants({
          app: this,
          model: this.getMainModel(),
          restaurants: this.getCollection('Restaurants')
        }).render());
        resolve();
      }.bind(this));
    },
    init: function() {
      var self = this
      console.log('init !');
      this.initVars()
        .then(this.initViews.bind(this))
        .then(function() {
          console.log('rdy TO click !');
          self.showPage('Page.Restaurants');
        })
        .catch(function(err) {
          console.error('El couillos dans le patos', err);
        });
    }
  };

  return Application;
}());

$(document).ready(function() {
  window.Application = new Application();
  Application.init();
});
