'use strict';

var _ = require('underscore'),
    Q = require('q'),
    BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

   list: function(limit) {
      var scores;

      scores = [
         {
            name: 'bob',
            score: 999999999,
         },
         {
            name: 'joe',
            score: 1,
         },
      ];

      if (limit) {
         scores = _.first(scores, limit);
      }

      return Q.when(scores);
   },

});
