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