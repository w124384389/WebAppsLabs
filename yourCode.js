/*
 * Name 1: Douglas Puppio
 * Name 2: YourNameHere
 */
// All your code will go here

var makeStack = function() {
	var stack = [];
	return {
		push: function(v) {
			stack.push(v);
			return this;
		},
		pop: function() {
			if (this.isEmpty())
				throw new Error("Attempt to pop from empty stack");
			else
				return stack.pop();
		},
		isEmpty: function() {
			return stack.length === 0;
		},
	};
}

// Do NOT change anything below this line.
/*
 * To allow node.js to run our tests. DO NOT CHANGE!
 */
try {
   module.exports = {
      binarySearch: binarySearch,
      countTags: countTags,
      extractHashTags: extractHashTags
   };
} catch (e) {}
