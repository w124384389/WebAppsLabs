/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;
Task = require("./task");


/*
 *       Constructors
 */
function makeNewCollection(arr){
	"use strict";
	var col = Object.create(proto), tasks = [];
	Object.defineProperty(col, "values", {
	  enumerable: true,
	  configurable: true,
	  writeable: false,
	  value: tasks

	});

	return Object.preventExtensions(col);

}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
	length: function() {
		"use strict";
		return this.values.length;
	},
	isEmpty: function() {
		"use strict";
		return this.values.length === 0;
	}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, "prototype", {
   value: proto,
   writable: false
});

module.exports = TaskCollection;
