/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

// ADD YOUR TESTS HERE
describe('Your code for linked lists', function(){
	it('defines a variable DLList', function(){
		expect(function(){DLList;}).to.not.throw(Error);
	});
})

describe('Your makeNewList function', function(){
	var list = DLList.new();

	it('returns an object', function() {
		expect(list).to.be. a('object');
	});
	it('returns an object with methods isEmpty, length, last, insertAt, unshift, push, endAt, remove, pop, shift, isFirst, isLast, iterator, forEach, toArray, iterateFrom, reverseIterateFrom', function() {
		['isEmpty', 'length', 'last', 'insertAt', 'unshift', 'push', 'endAt', 'remove', 'pop', 'shift', 'isFirst', 'isLast', 'iterator', 'forEach', 'toArray', 'iterateFrom', 'reverseIterateFrom'].forEach(function(key) {
			expect(list[key]).to.be.a('function');
		});
	});
});