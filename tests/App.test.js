'use strict';

var _ = require('underscore'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    App = rewire('../src/App.js');

describe('App', function() {
   var fakeConsole = { log: _.noop },
       revert;

   beforeEach(function() {
      revert = App.__set__({
         console: fakeConsole,
      });
   });

   afterEach(function() {
      revert();
   });

   it('is a class', function() {
      expect(App).to.be.a('function');
      expect(new App()).to.be.an('object');
   });

});
