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