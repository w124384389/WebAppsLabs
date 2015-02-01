/*
 * task.spec.js
 *
 * Test file for your task class
 */
var expect, Task;

expect = require('./chai.js').expect;

Task = require('./task.js');

// ADD YOUR TESTS HERE
describe('Your code for tasks', function(){
	it('defines a variable Task', function(){
		expect(function(){Task;}).to.not.throw(Error);
	});
});

describe('Your makeNewTask function', function(){
	var task = Task.new();

	it('returns an object', function() {
		expect(task).to.be. a('object');
	});

	it('returns an object with methods setTitle, isCompleted, toggleCompleted, hasTag, addTag, removeTag, toggleTag, addTags, removeTags, toggleTag, clone', function() {
		['setTitle', 'isCompleted', 'toggleCompleted', 'hasTag', 'addTag', 'removeTag', 'toggleTag', 'addTags', 'removeTags', 'toggleTag', 'clone'].forEach(function(key) {
			expect(task[key]).to.be.a('function');
		});
	});
});

describe('Task methods', function(){
	var task;

	beforeEach(function() {
		task = Task.new();
	})

	it('setTitle returns the task object', function() {
		expect(task.setTitle("")).to.equal(task);
	});
	it('isCompleted returns true if task is completed', function() {
		task.completedTime = new Date(Date.now());
		expect(task.isCompleted()).to.equal(true);
	});
	it('toggleCompleted returns the task object', function() {
		expect(task.toggleCompleted()).to.equal(task);
	});
	it('toggleCompleted uncompletes a task completed', function() {
		task.completedTime = new Date(Date.now());
		expect(task.toggleCompleted().isCompleted()).to.equal(false);
	});
	it('toggleCompleted completes a task uncompleted', function() {
		expect(task.toggleCompleted().isCompleted()).to.equal(true);
	});
	it('hasTag returns false when the tag is empty', function() {
		expect(task.hasTag("")).to.equal(false);
	});
	it('hasTag returns false when the tag is not in the tag list', function() {
		task.addTag("second");
		expect(task.hasTag("first")).to.equal(false);
	});
	it('hasTag returns true when the tag is in the list', function() {
		task.addTag("first").addTag("second").addTag("third");
		expect(task.hasTag("second")).to.equal(true);
	});
	it('addTag returns the task object', function() {
		expect(task.addTag("fourth")).to.equal(task);
	});

	it('removeTag returns the task object if the tag is in the list', function() {
		task.addTag("first");
		expect(task.removeTag("first")).to.equal(task);
	});

	it('removeTag should return task object, if the tag was completed removed', function() {
		task.addTag("first").addTag("third");
		task.removeTag("third");
		expect(task.hasTag("third")).to.equal(false);
	});

	it('toggleTag should return task object, if the tag is not in the list, adds it', function() {
		task.addTag("first").addTag("second");
		task.toggleTag("third");
		expect(task.hasTag("third")).to.equal(true);
	});
	it('toggleTag should return task object, if the tag is in the list, removes it', function() {
		task.addTag("first").addTag("second");
		task.toggleTag("second");
		expect(task.hasTag("second")).to.equal(false);
	});
	it('clone returns true if the cloned task has the same title, completion status and tag list as the original task', function() {
		task.addTag("first").addTag("second").addTag("third");
		var t = task.clone();
		var status = t.title === task.title && t.completed === task.completed && t.tags === task.tags;
		expect(status).to.equal(true);
	});
});