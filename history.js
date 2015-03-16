/*
 * history.js
 *
 * Contains implementation for a CmdHistory "class"
 */

var Iterator, DLList, CmdHistory, proto;

DLList = require("./dllist");
Iterator = require("./iterator.js");

/*
 *       Constructors
 */

function makeNewHistory() {
   var hist = Object.create(proto);
   hist.list = DLList.new();
   hist.current = null;
   return hist;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
	add: function(command){
		var item;

		item = this.list.insertAt(command, this.current !== null ? this.current : this.list.sentinel);		
   		this.current = item;
   		this.list.endAt(this.current);
   		eval(this.current);
   		this.current.value.execute();
   },
	canRedo: function(){
		return this.current.next !== this.list.sentinel;
	},
   canUndo: function(){
		return this.current !== null;
   },
	redo: function(){
		if (!this.canRedo()){
			throw new Error("There is no next item.");
		}
		this.current = this.current.next;
		eval(this.current);
		this.current.value.execute();
   },
   undo: function(){
		if (!this.canUndo()){
			throw new Error("No current item to unexecute.");
		}
		this.current.value.unexecute();
		this.current = this.current.prev;
   },
   undoableIterator: function(){
   	return this.list.reverseIterateFrom(this.current);
	},
   redoableIterator: function(){
   	return this.list.iterateFrom(this.current);
	}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
CmdHistory = {
   new: makeNewHistory
};

Object.defineProperty(CmdHistory, "prototype", {
   value: proto,
   writable: false
});

module.exports = CmdHistory;
