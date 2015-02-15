/*
 * collection.spec.js
 *
 * Test file for your collection class
 */
var expect, Task, TaskCollection;

expect = require("./chai.js").expect;

Task = require("./task.js");
TaskCollection = require("./collection.js");

// ADD YOUR TESTS HERE
describe('Your code for task collection', function(){
	it('defines a variable TaskCollection', function(){
		expect(function(){TaskCollection;}).to.not.throw(Error);
	});
});

describe('Your makeNewCollection function', function(){
	var col = TaskCollection.new();

	it('returns an object', function() {
		expect(col).to.be. a('object');
	});
	it('returns an object with methods length, isEmpty, get, has, add, new, remove, filter, forEach', function() {
		['length', 'isEmpty', 'get', 'has', 'add', 'new', 'remove', 'filter', 'forEach'].forEach(function(key) {
			expect(col[key]).to.be.a('function');
		});
	});
});
describe('TaskCollection methods', function(){
	var col;

	beforeEach(function() {
		col = TaskCollection.new();
	})

	it('length returns the number of tasks currently stored.', function() {
		col.add(Task.new()).add(Task.new());
		expect(col.length()).to.equal(2);
	});
	it('isEmpty returns true when the collection is empty.', function() {
		expect(col.isEmpty()).to.equal(true);
	});
	it('get returns the task that the title is a string', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.get("Two").title).to.equal("Two");
	});
	it('get returns the task that the ID is a number', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		for (var i = t.length - 1; i >= 0 ; i -= 1) {
			expect(col.get(t[i].id).id).to.equal(t[i].id);
		}
	});
	it('get returns the task that accepts a function', function() {
		var t = [
			Task.fromString("One #first #second"),
			Task.fromString("Two #first #second #third"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.get(function(task) { return task.hasTag("third") }).title).to.equal("Two");
	});
	it('get returns the task that the title is a regular expression', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("12345 #first #second"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.get(/\d/).title).to.equal("12345");
	});
	it('has returns true if the task is in the collection.', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.has(16)).to.equal(true);
	});
	it('add returns the collection when the task is added.', function() {
		expect(col.add(Task.new())).to.equal(col);
	});
	it('add returns the collection when added several tasks.', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
		];
		expect(col.add(t).length()).to.equal(3);
	});
	it('new returns the new empty task', function() {
		expect(col.new().id).to.equal(22);
	});
	it('remove returns the collection when removes one task by ID', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.remove(1).length()).to.equal(2);
	});
	it('remove returns the collection when removes multiple tasks by IDs', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
			Task.fromString("Four #fifth"),
			Task.fromString("Five #first"),
		];
		col.add(t);
		expect(col.remove([26,29]).length()).to.equal(3);
	});
	it('filter returns a new TaskCollection that contains the tasks that match the arguments ', function() {
		var t = [
			Task.fromString("One #first #second #third"),
			Task.fromString("Two #first #second"),
			Task.fromString("Three #first"),
			Task.fromString("Four #fifth"),
			Task.fromString("Five #first"),
		];
		col.add(t);
		expect(col.filter([32,33]).length()).to.equal(2);
	});
	it('forEach returns the collection', function() {
		var t = [
			Task.fromString("One #first #second"),
			Task.fromString("Two #first #second #third"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		expect(col.forEach(function(task) { task.title = "whoa!" }).get("whoa!").title).to.equal("whoa!");
	});

	it('print returns a string with all the collection data', function() {
		var t = [
			Task.fromString("One #first #second"),
			Task.fromString("Two #first #second #third"),
			Task.fromString("Three #first"),
		];
		col.add(t);
		col.values[1].toggleCompleted();
		expect(col.print()).to.equal("One #first #second\nTwo #first #second #third (2015/02/15)\nThree #first\n");
	});

	it('print returns an empty string', function() {
		expect(col.print(col)).to.equal("");
	});

	it.only('concat contains all the tasks from the collections passed as arguments', function() {
		var t = [
			Task.fromString("One #first #second"),
			Task.fromString("Two #first #second #third"),
			Task.fromString("Three #first")
		];
		col.add(t);
		var c2, c3;
		c2= TaskCollection.new();
		c3= TaskCollection.new();
		t = [
			Task.fromString("Four #second"),
			Task.fromString("Five #first #third")
		];
		c2.add(t);
		t = [
			Task.fromString("Six #second"),
			Task.fromString("Seven #second #fourth #fifth #sixth #seventh"),
			Task.fromString("Eight #first #third")
		];
		c3.add(t);
		col.concat(c2, c3);
		expect(col.values.length).to.equal(8);
		expect(col.values[5].title).to.equal("Six");

	});
});
