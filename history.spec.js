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
describe('CmdHistory methods', function(){
	var list;

	beforeEach(function() {
		list = CmdHistory.new();
	})

	it('add adds a new command to the history following by current, execute the new command', function() {
		expect(list.add()).to.equal();
	});



	// it('canRedo Returns true if there is an item following "current"', function() {
	// 	expect(list.canRedo).to.equal(true);
	// });

	// it('canUndo Returns true if there is a command that can be "undone"', function() {
	// 	expect(list.add()).to.equal();
	// });
	// it('redo Advances "current" to the next item, and executes the command there', function() {
	// 	expect(list.add()).to.equal();
	// });

	// it('undo  Unexecutes the command at "current" and moves "current" back one step"', function() {
	// 	expect(list.add()).to.equal();
	// });
	// it('undoableIterator Returns an iterator that visits all the undoable commands, starting from "current" and moving backwards through the history.', function() {
	// 	expect(list.add()).to.equal();
	// });
	// it('redoableIterator Returns an iterator that visits all the redoable commands, starting from the one following "current" and moving forwards.', function() {
	// 	expect(list.add()).to.equal();
	// });
});