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

function makeNewCollection(arr) {
	var col = Object.create(proto);
	var tasks = [];

	// if (Array.isArray(arr)) {
	// 	for (var i = arr.length - 1; i >= 0; i -= 1) {
	// 		col.add(arr[ i ]);
	// 	};
	// }

   Object.defineProperty(col, 'values', {
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
	//Add instance methods here
	length: function() {
		return this.values.length;
	},
	isEmpty: function() {
		return this.values.length === 0;
	},
	get: function(arg) {
		var i = searchInTasks(arg, this.values);
		return i === -1 ? null : this.values[ i ];
	},
	has: function(arg) {
		return !(searchInTasks(arg, this.values) === -1);
	},
	add: function(t) {
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
		var t = Task.new();
		this.add(t);
		return t;
	},
	remove: function(id) {
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
		var i;
		for (i = f.length - 1; i >= 0; i -= 1) {
			f(this.values[ i ]);
		}
		return this;
   }
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
TaskCollection = {
   new: makeNewCollection
};

Object.defineProperty(TaskCollection, proto, {
   value: proto,
   writable: false
});

module.exports = TaskCollection;
