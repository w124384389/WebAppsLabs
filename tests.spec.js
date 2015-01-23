try {
   var chai = require('./chai.js');
   var expect = chai.expect;
   var methods = require('./yourCode.js');
   var binarySearch = methods.binarySearch;
   var countTags = methods.countTags;
   var extractHashTags = methods.extractHashTags;
} catch (e) {}

// Do not change anything above this line
describe('Your code for stacks', function() {
	it('defines a variable makeStack', function() {
   		expect(function() { makeStack; }).to.not.throw(Error);
	});
	// Add more "it" sections below
   it('actually defines a function makeStack', function() {
    expect(makeStack).to.be.a('function');
   } );
});

describe('Your makeStack function', function() {
   var stack = makeStack();

   it('returns an object', function() {
      expect(stack).to.be.a('object');
   });

   it('returns an object with methods push, pop and isEmpty', function() {
      ['push', 'pop', 'isEmpty'].forEach(function(key) {
         expect(stack[key]).to.be.a('function');
      });
   });
});

describe('Stack methods:', function() {
   var stack;
   beforeEach(function() {
      // This ensures every test sees a fresh empty stack
      stack = makeStack();
   });
   it('isEmpty returns true for a new stack', function() {
      expect(stack.isEmpty()).to.equal(true);
   });
   it('isEmpty returns false if an element is pushed', function() {
      stack.push(2);
      expect(stack.isEmpty()).to.equal(false);
   });
});