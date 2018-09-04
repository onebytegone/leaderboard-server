'use strict';

var _ = require('underscore'),
    Q = require('q'),
    BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({

   saveGame: function() {
      return Q.when();
   },

   list: function(limit) {
      var games;

      games = [
         {
            id: 'aaaa-aaa',
            timestamp: '1970-02-02T04:24',
            players: [
               {
                  name: 'bob',
                  score: 5,
               },
            ],
         },
      ];

      if (limit) {
         games = _.first(games, limit);
      }

      return Q.when(games);
   },

});
