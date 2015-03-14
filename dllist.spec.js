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

describe('DLList methods', function(){
	var list;

	beforeEach(function() {
		list = DLList.new();
	})

	it('isEmpty returns true when the list next is self sentinel.', function() {
		expect(list.isEmpty()).to.equal(true);
	});
	it('insertAt twice returns an element with the next pointed to the first element inserted.', function() {
		var item = list.insertAt(10, list.sentinel);
		expect(list.insertAt(5, list.sentinel).next).to.equal(item);
	});
	it('length returns 3 when inserted three element.', function() {
		list.insertAt(10, list.sentinel);
		list.insertAt(10, list.sentinel);
		list.insertAt(10, list.sentinel);
		expect(list.length()).to.equal(3);
	});
	it('unshift returns an element with the next pointed to the element which was the first before.', function() {
		var item = list.insertAt(10, list.sentinel);
		expect(list.unshift(5).next).to.equal(item);
	});
	it('push returns an element with the next pointed to the sentinel.', function() {
		var item = list.insertAt(10, list.sentinel);
		expect(list.push(5).next).to.equal(list.sentinel);
	});
	it('remove returns the removed value once it was inserted in the list.', function() {
		var item;
		list.insertAt(10, list.sentinel);
		list.insertAt(5, list.sentinel);
		item = list.insertAt(8, list.sentinel);
		list.insertAt(12, list.sentinel);
		expect(list.remove(item)).to.equal(8);
	});
	it('pops removes the last element and returns its value.', function() {
		list.push(10);
		list.push(5);
		list.push(8);
		expect(list.pop()).to.equal(8);
	});
	it.only('shift removes the first element and returns its value.', function() {
		list.push(10);
		list.push(5);
		list.unshift(8);
		expect(list.shift()).to.equal(8);
	});
});