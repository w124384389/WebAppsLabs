/*
 * history.spec.js
 *
 * Test file for your history class
 */
var expect, DLList, CmdHistory;

expect = require('./chai.js').expect;

DLList = require('./dllist.js');
CmdHistory = require('./history.js');

var LogEntries = [];
var Log = {
   add: function(s) { LogEntries.push(s); return this; },
   get: function() { return LogEntries; },
   clear: function() { LogEntries = []; return this; }
};
var id = 0;
function mockExecute() { Log.add(this.toString + " executed"); }
function mockUnexecute() { Log.add(this.toString + " unexecuted"); }
function mockCommand() {
   id += 1;
   return {
      execute: mockExecute,
      unexecute: mockUnexecute,
      toString: "command " + id
   };
}

// ADD YOUR TESTS HERE
describe('Your code for history', function(){
	it('defines a variable CmdHistory', function(){
		expect(function(){CmdHistory;}).to.not.throw(Error);
	});
})

describe('Your makeNewHistory function', function(){
	var list = CmdHistory.new();

	it('returns an object', function() {
		expect(list).to.be.a('object');
	});
	it('returns an object with methods add, canRedo, canUndo, redo, undo, undoableIterator, redoableIterator', function() {
		['add', 'canRedo', 'canUndo', 'redo', 'undo', 'undoableIterator', 'redoableIterator'].forEach(function(key) {
			expect(list[key]).to.be.a('function');
		});
	});
});