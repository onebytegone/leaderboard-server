'use strict';

var _ = require('underscore'),
    sinon = require('sinon'),
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

   describe('sayHello', function() {
      var logStub;

      beforeEach(function() {
         logStub = sinon.stub(fakeConsole, 'log');
      });

      afterEach(function() {
         logStub.restore();
      });

      it('prints hello', function() {
         var app = new App();

         expect(app.sayHello()).to.be(undefined);
         sinon.assert.calledOnce(logStub);
         sinon.assert.calledWithExactly(logStub, 'Hello!');
      });

   });

});
