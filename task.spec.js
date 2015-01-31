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