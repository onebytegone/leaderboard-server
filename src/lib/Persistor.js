'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Class = require('class.extend'),
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter, db;

module.exports = Class.extend({

   init: function() {
      adapter = new FileSync('./store/db.json');
      db = low(adapter);
      db.defaults({})
         .write();
   },

   put: function(hash, range, value) {
      var currentHash = db.get(hash),
          obj = {};

      if (!_.isObject(currentHash)) {
         db.set(hash, {})
            .write();
      }

      obj[range] = value;

      db.set(hash, obj)
         .write();

      return Q.when();
   },

   get: function(hash, range) {
      var currentHash = db.get(hash).value();

      if (_.isUndefined(currentHash[range])) {
         return Q.when(currentHash);
      }

      if (!currentHash) {
         return Q.when();
      }

      return Q.when(currentHash[range]);
   },

});
