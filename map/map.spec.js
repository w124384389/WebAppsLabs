try {
   var chai = require('./../chai.js');
   var expect = chai.expect;
   var methods = require('./mapCode.js');
   var binarySearch = methods.binarySearch;
   var countTags = methods.countTags;
   var extractHashTags = methods.extractHashTags;
} catch (e) {}

function randomString(len) {
   var arr = [], caseRange, i;
   if (len == null) { len = 5; }
   for (i = 0; i < len; i += 1) {
      caseRange = [65, 97][Math.floor(Math.random() * 2)];
      arr.push(Math.floor(Math.random() * 26) + caseRange);
   }
   return String.fromCharCode.apply(String, arr);
}
// DO NOT CHANGE ANYTHING ABOVE THIS LINE

// Add your tests below
describe('Your code for map', function() {
   it('defines a variable makeMap', function() {
         expect(function() { makeMap; }).to.not.throw(Error);
   });
   // Add more "it" sections below
   it('actually defines a function makeMap', function() {
    expect(makeMap).to.be.a('function');
   } );
});

describe('Your makeMap function', function() {
   var map = makeMap();

   it('returns an object', function() {
      expect(map).to.be.a('object');
   });

   it('returns an object with methods has, lookup, add, update and remove', function() {
      ['has', 'lookup', 'add', 'update', 'remove'].forEach(function(key) {
         expect(map[key]).to.be.a('function');
      });
   });
});

describe('Map methods:', function() {
   var map;
   beforeEach(function() {
      // This ensures every test sees a fresh empty map
      map = makeMap();
   });
   it('has returns false if the map is empty', function() {
      expect(map.has("first")).to.equal(false);
   });
   it('has returns false if an element isn`t in the map', function() {
      map.add("first", 10);
      expect(map.has("second")).to.equal(false);
   });
   it('has returns true if an element is in the map', function() {
      map.add("first", 10);
      expect(map.has("first")).to.equal(true);
   });

   it('lookup should error if the key does not exist', function() {
      map.add("first", 10);
      expect(function() { map.lookup("second"); }).to.throw(Error);
   });
   it('lookup returns the value stored in the key', function() {
      map.add("first", undefined);
      expect(map.lookup("first")).to.equal(undefined);
   });

   it('add returns the map object', function() {
      expect(map.add()).to.equal(map);
   });
   it('add should return an error if the key already exist', function() {
      map.add("first", 10);
      expect(function() { map.add("first", 42); }).to.throw(Error);
   });

   it('update returns the map object', function() {
      map.add("first", 12);
      expect(map.update("first", 45)).to.equal(map);
   });
   it('update should return an error if the key does not exist', function() {
      expect(function() { map.update("third", 11); }).to.throw(Error);
   });

   it('remove should return an error if the key does not exist', function() {
      map.add("second", 10);
      expect(function() { map.remove("third"); }).to.throw(Error);
   });

   it('a randomized set of adds and removes should behave properly', function() {
      var iters = 10, steps = 200, iter, step;
      var noItems = [];
      var randomNum, key;
      for (iter = 0; iter < 10; iter += 1) {
         map = makeMap();
         randomNum = Math.random();
         noItems = [];
         for (step = 0; step < 200; step += 1) {
            if (Math.random() > 0.5) { // 50-50 do a pus
               key = randomString();
               noItems.push(key);
               map.add(key, randomNum);
            } else { // or do a pop
               if (noItems.length === 0) {
                  expect(function() { map.remove(); }).to.throw(Error);
               } else {
                  expect(function() { map.remove(noItems.pop()); }).not.to.throw(Error);
               }
            }
         }
      }
   });   
});
