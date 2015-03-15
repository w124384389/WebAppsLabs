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
   add: function(){
		var item = {};

		this.current.next = item;
		item.prev = this.current;
		item.next = null;
		item.execute();
   },
   canRedo: function(){
		if (this.current.next !== null){
			return true;
		}
		return false;
	},
   canUndo: function(){
		if (this.current == null){
			return false;
		}
		return true;
   },
   redo: function(){
		if (!this.canRedo()){
			throw new Error("There is no next item");
		}
		this.current = this.current.next;
		this.current.execute();
   },
   undo: function(){
		if (this.current == null){
			throw new Error("no current item to unexecute");
		}
		this.current.unexecute();
		this.current = this.current.prev;
   },
   undoableIterator: function(){
		var it = this.current.next;
		return Iterator.new(
				function(){
					it = it.prev;
					return it;
				},
				function(){
					return it.prev !== null;
				}
			);
	},
   redoableIterator: function(){
		var it = this.current.prev;
		return Iterator.new(
			function(){
				it = it.next;
				return it;
			},
			function(){
				return it.next !== null;
			}
			);
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
