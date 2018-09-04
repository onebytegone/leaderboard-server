'use strict';

var Q = require('q'),
    Class = require('class.extend');

module.exports = Class.extend({

   init: function(persistor) {
      this.persistor = persistor;
   },

   save: function() {
      return Q.when();
   },

   list: function() {
      return Q.when([]);
   },

});
