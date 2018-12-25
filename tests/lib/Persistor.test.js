'use strict';

var _ = require('underscore'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    Persistor = rewire('../../src/lib/Persistor.js');

describe('Persistor', function() {
   var fakeConsole = { log: _.noop },
       revert;

   beforeEach(function() {
      revert = Persistor.__set__({
         console: fakeConsole,
      });
   });

   afterEach(function() {
      revert();
   });

   it('is a class', function() {
      expect(Persistor).to.be.a('function');
      expect(new Persistor()).to.be.an('object');
   });

   describe('lifecycle', function() {

      it('allows put/get of single item', function() {
         var persistor = new Persistor(),
             obj = { key: 'value' };

         return persistor.put('hashval', 'rangeval', obj)
            .then(function() {
               return persistor.get('hashval', 'rangeval');
            })
            .then(function(returned) {
               expect(returned).to.eql({ key: 'value' });
            });
      });

   });

   describe('get', function() {
      var persistor;

      beforeEach(function() {
         persistor = new Persistor();

         return persistor.put('hashval', 'range1', { key: 'value1' })
            .then(function() {
               return persistor.put('hashval', 'range2', { key: 'value2' });
            })
            .then(function() {
               return persistor.put('hashval', 'range3', { key: 'value3' });
            })
            .then(function() {
               return persistor.put('turtles', 'turtle-range', { key: 'turtle-value' });
            });
      });

      it('returns undefined for unknown hash', function() {
         return persistor.get('unknown-hash')
            .then(function(returned) {
               expect(returned).to.be(undefined);
            });
      });

      it('returns undefined for unknown hash and range', function() {
         return persistor.get('unknown-hash', 'unknown-range')
            .then(function(returned) {
               expect(returned).to.be(undefined);
            });
      });

      it('allows get of specific item', function() {
         return persistor.get('hashval', 'range2')
            .then(function(returned) {
               expect(returned).to.eql({ key: 'value2' });
            });
      });

      it('returns all items for hash when range is not provided', function() {
         return persistor.get('hashval')
            .then(function(returned) {
               expect(returned).to.eql({
                  range1: { key: 'value1' },
                  range2: { key: 'value2' },
                  range3: { key: 'value3' },
               });
            });
      });

   });

});
