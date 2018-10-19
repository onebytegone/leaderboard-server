'use strict';

var _ = require('underscore'),
    Class = require('class.extend'),
    express = require('express'),
    cors = require('cors'),
    Persistor = require('./lib/Persistor'),
    Games = require('./model/Games'),
    TopScores = require('./model/TopScores');

module.exports = Class.extend({

   init: function() {
      var persistor = new Persistor();

      this.games = new Games(persistor);
      this.topScores = new TopScores(persistor);
   },

   startServer: function(port) {
      console.log('starting server on port %d', port);
      this.app = express();
      this.app.use(express.json());

      this.app.use(cors());

      this.app.get('/ping', function(req, res) {
         res.send(JSON.stringify({ pong: new Date() }));
      });

      this.app.get('/games', function(req, res) {
         this.games.list(1)
            .then(function(games) {
               res.send(JSON.stringify(games));
            })
            .done();
      }.bind(this));

      this.app.get('/new-games', function(req, res) {
         var filter;

         filter = function(game) {
            return game.timeCreated === game.timeUpdated;
         };

         this.games.list(undefined, filter)
            .then(function(games) {
               res.send(JSON.stringify(games));
            })
            .done();
      }.bind(this));

      this.app.post('/games', function(req, res) {
         this.games.saveGame(req.body)
            .then(function() {
               res.send(JSON.stringify({ msg: 'success' }));
            })
            .catch(function(err) {
               console.log(err);
               res.send(JSON.stringify({ msg: 'error' }));
            })
            .done();
      }.bind(this));

      this.app.get('/top-scores', function(req, res) {
         var limit = 10;

         if (req.query.limit) {
            limit = parseInt(req.query.limit, 10);
            if (_.isNaN(limit)) {
               limit = 10;
            }
         }

         this.topScores.list(limit)
            .then(function(topScores) {
               res.send(JSON.stringify(topScores));
            })
            .done();
      }.bind(this));

      this.app.listen(port, function() {
         console.log('server listening on port %d', port);
      });
   },

});
