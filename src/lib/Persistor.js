'use strict';

var Q = require('q'),
    Class = require('class.extend');

module.exports = Class.extend({

   put: function(hash, range, value) {
      console.log('TODO: put value to %s, %s: %j', hash, range, value);
      return Q.when();
   },

   get: function(hash, range) {
      console.log('TODO: get value from %s, %s', hash, range);
      return Q.when({});
   },

});
