'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Class = require('class.extend');

module.exports = Class.extend({

   init: function() {
      // TODO: actually read/write to a file
      this.inMemoryStorage = {};
   },

   put: function(hash, range, value) {
      if (!_.isObject(this.inMemoryStorage[hash])) {
         this.inMemoryStorage[hash] = {};
      }

      this.inMemoryStorage[hash][range] = value;

      return Q.when();
   },

   get: function(hash, range) {
      if (_.isUndefined(range)) {
         return Q.when(this.inMemoryStorage[hash]);
      }

      if (!this.inMemoryStorage[hash]) {
         return Q.when();
      }

      return Q.when(this.inMemoryStorage[hash][range]);
   },

});
