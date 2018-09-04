'use strict';

var _ = require('underscore'),
    BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

   list: function(limit) {
      return this.persistor.get('games')
         .then(function(games) {
            var scores;

            scores = _.chain(games)
               .pluck('players')
               .flatten()
               .sortBy('score')
               .reverse()
               .value();

            if (limit) {
               scores = _.first(scores, limit);
            }

            return scores;
         });
   },

});
