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
		expect(list).to.be.a('object');
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
	it('shift removes the first element and returns its value.', function() {
		list.push(10);
		list.push(5);
		list.unshift(8);
		expect(list.shift()).to.equal(8);
	});
	it('isFirst returns true if item passed as argument is the first of the list.', function() {
		var item = list.push(10);
		list.push(5);
		expect(list.isFirst(item)).to.equal(true);
	});
	it('isLast returns true if item passed as argument is the last of the list.', function() {
		var item;
		list.push(10);
		item = list.push(5);
		expect(list.isLast(item)).to.equal(true);
	});
	it('endAt returns the list with just 3 items out of the 5 items inserted.', function() {
		var item;
		list.push(10);
		list.push(1);
		item = list.push(5);
		list.push(8);
		list.push(12);
		expect(list.endAt(item).length()).to.equal(3);
	});
	it('iterator returns an iterator.', function() {
		expect(list.iterator().hasNext()).to.equal(false);
	});
	it('forEach returns a list of items modified by a given function.', function() {
		list.push(10);
		list.push(35);
		list.unshift(7);
		expect(list.forEach(function (item){ item.value *= 2; }).sentinel.next.value).to.equal(14);
	});
	it('toArray returns a list of values in the order they appear.', function() {
		list.push(10);
		list.push(35);
		list.push(7);
		list.push(14);
		expect(list.toArray()[3]).to.equal(14);
	});
	it('iterateFrom returns an iterator starting from the item passed as argument until the last item of list.', function() {
		var item;
		list.push(10);
		list.push(35);
		item = list.push(7);
		list.push(14);
		expect(list.iterateFrom(item).toArray().length).to.equal(2);
	});
	it.only('reverseIterateFrom returns an iterator starting from the item passed as argument until the first item of list.', function() {
		var item;
		list.push(10);
		list.push(35);
		item = list.push(7);
		list.push(14);
		expect(list.reverseIterateFrom(item).toArray().length).to.equal(3);
	});
});