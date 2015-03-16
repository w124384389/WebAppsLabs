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
	var cmdHist = CmdHistory.new();

	it('returns an object', function() {
		expect(cmdHist).to.be.a('object');
	});
	it('returns an object with methods add, canRedo, canUndo, redo, undo, undoableIterator, redoableIterator', function() {
		['add', 'canRedo', 'canUndo', 'redo', 'undo', 'undoableIterator', 'redoableIterator'].forEach(function(key) {
			expect(cmdHist[key]).to.be.a('function');
		});
	});
});
describe('CmdHistory methods', function(){
	var cmdHist;

	beforeEach(function() {
		cmdHist = CmdHistory.new();
	})

	it('add adds a new command to the history following by current, execute the new command', function() {
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		console.log(Log.get());
	});
	it('canRedo Returns true if there is an item following "current"', function() {
		cmdHist.add(mockCommand());
		expect(cmdHist.canRedo()).to.equal(false);
	});
	it('canUndo Returns true if there is a command that can be "undone"', function() {
		cmdHist.add(mockCommand());
		expect(cmdHist.canUndo()).to.equal(true);
	});
	it('redo Advances "current" to the next item, and executes the command there', function() {
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.undo();
		cmdHist.undo();
		cmdHist.redo();
		console.log(Log.get());
	});
	it('undo  Unexecutes the command at "current" and moves "current" back one step"', function() {
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.undo();
		cmdHist.current.value.execute()
		console.log(Log.get());
	});
	it('undoableIterator Returns an iterator that visits all the undoable commands, starting from "current" and moving backwards through the history.', function() {
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.undo();
		cmdHist.undo();
		expect(cmdHist.undoableIterator().toArray().length).to.equal(4);
	});
	it('redoableIterator Returns an iterator that visits all the redoable commands, starting from the one following "current" and moving forwards.', function() {
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.add(mockCommand());
		cmdHist.undo();
		cmdHist.undo();
		expect(cmdHist.redoableIterator().toArray().length).to.equal(3);
	});
});