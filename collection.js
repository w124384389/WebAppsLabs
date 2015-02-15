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
	var i, func;
	func = turnArgIntoFunc(t);

	for (i = arr.length - 1; i >= 0; i -= 1) {
		if (func(arr[ i ])) {
			break;
		}
	}

	return i === arr.length ? -1 : i;
}

function turnArgIntoFunc(t) {
	"use strict";
	if (t instanceof RegExp) {
		return function(item) {
			return item.title.match(t) != null;
		};
	}

	switch (typeof t) {
	case "string":
		return function(item) {
			return item.title === t;
		};
	case "function":
		return t;
	case "number":
		return function(item) {
			return item.id === t;
		};
	}
}

/*
 *       Constructors
 */
 function makeNewCollection(arr) {
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
	},
	filter: function(id) {
		"use strict";
		var i, newCol = TaskCollection.new();
		if (Array.isArray(id)) {
			for (i = id.length - 1; i >= 0; i -= 1) {
				if (searchInTasks(id[ i ], this.values) !== -1) {
					newCol.add(this.values[ i ]);
					continue;
				}
			}
		}
		return newCol;
	},
	forEach: function(f) {
		"use strict";
		var i;
		for (i = this.values.length - 1; i >= 0; i -= 1) {
			f(this.values[ i ]);
		}
		return this;
	},
	print: function() {
		"use strict";
		var str = "";

		if (this.values.length === 0) {
			return "";
		}

		this.forEach(function(task) {
			var i;
			str += task.title;
			for (i = task.tags.length - 1; i >= 0; i -= 1) {
				str += " #" + task.tags[ i ];
			}
			if (task.isCompleted()) {
				str += " (" + task.completedTime.toISOString().slice(0, 10).replace(/-/g, "/") + ")";
			}
			str += "\n";
		});

		return str;
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
