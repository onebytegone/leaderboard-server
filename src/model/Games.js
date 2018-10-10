'use strict';

var _ = require('underscore'),
    Q = require('q'),
    uuid = require('uuid/v4'),
    BaseModel = require('./BaseModel'),
    NameGenerator = require('./../lib/NameGenerator');

module.exports = BaseModel.extend({

   saveGame: function(game) {
      var nameGenerator = new NameGenerator();

      if (!_.isObject(game)) {
         return Q.reject({ message: 'The provided game must be an object' });
      }

      if (!_.isArray(game.players)) {
         return Q.reject({ message: 'A game must have an array of `players`' });
      }

      if (_.isEmpty(game.players)) {
         return Q.reject({ message: 'There must be at least one player in the array of `players`' });
      }

      if (game.id) {
         // If the game already has an ID, this is an existing game
         // and we can capture a timestamp for the time it was updated.
         game.updatedTimestamp = Date.now();
      } else {
         game.id = uuid();
      }

      if (!game.timestamp) {
         game.timestamp = Date.now();
      }

      _.each(game.players, function(player) {
         if (!player.name) {
            player.name = nameGenerator.generateName();
         }
      });

      console.log('DEBUG saving game: %j', game);

      return this.persistor.put('games', game.id, game);
   },

   list: function(limit) {
      return this.persistor.get('games')
         .then(function(games) {
            games = _.sortBy(games, 'timestamp').reverse();

            if (limit) {
               games = _.first(games, limit);
            }

            return games;
         });
   },

});
