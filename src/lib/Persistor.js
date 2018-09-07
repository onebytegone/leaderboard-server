'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Class = require('class.extend'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync');

module.exports = Class.extend({

   init: function() {
      this.adapter = new FileSync('./store/db.json');
      this.db = low(this.adapter);
      this.db.defaults({})
         .write();
   },

   put: function(hash, range, value) {
      var currentHash = this.db.get(hash).value(),
          newObj = {};

      if (!_.isObject(currentHash)) {
         this.db.set(hash, {})
            .write();
      }

      newObj[range] = value;

      this.db.get(hash)
         .assign(newObj)
         .write();

      return Q.when();
   },

   get: function(hash, range) {
      var currentHash = this.db.get(hash).value(),
          withRange;

      withRange = currentHash ? currentHash[range] : null;

      if (withRange) {
         return Q.when(withRange);
      }

      if (currentHash) {
         return Q.when(currentHash);
      }

      return Q.when();
   },

});
