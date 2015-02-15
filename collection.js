/*
 * collection.js
 *
 * Contains implementation for a "TaskCollection" "class"
 */

var TaskCollection, Task, proto;
Task = require("./task");

// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function searchInTasks(t, arr) {
	"use strict";
	var i, found = -1;
	for (i = arr.length - 1; i >= 0; i -= 1) {
		if (t instanceof RegExp) {
			if (arr[ i ].title.match(t) != null) {
				found = i;
				break;
			}
		} else {
			switch (typeof t) {
				case "string":
					if (arr[ i ].title === t) {
						found = i;
						break;
					}
					break;
				case "function":
					if (t(arr[ i ])) {
						found = i;
						break;
					}
					break;
				case "number":
					if (arr[ i ].id === t) {
						found = i;
						break;
					}
					break;
			}
		}
	}
	return found;
}

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
	},
	get: function(arg) {
		"use strict";
		var i = searchInTasks(arg, this.values);
		return i === -1 ? null : this.values[ i ];
	},
	has: function(arg) {
		"use strict";
		return !(searchInTasks(arg, this.values) === -1);
	},
	add: function(t) {
		"use strict";
		var i;
		if (Array.isArray(t)) {
			for (i = t.length - 1; i >= 0; i -= 1) {
				this.values.push(t[ i ]);
			}
		} else {
			this.values.push(t);
		}

		return this;
	},
	new: function() {
		"use strict";
		var t = Task.new();
		this.add(t);
		return t;
	},
	remove: function(id) {
		"use strict";
		var i;
		if (Array.isArray(id)) {
			for (i = id.length - 1; i >= 0; i -= 1) {
				if (searchInTasks(id[ i ], this.values) !== -1) {
					this.values.splice(i, 1);
				}
			}
		} else {
			i = searchInTasks(id, this.values);
			this.values.splice(i, 1);
		}
		return this;
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
