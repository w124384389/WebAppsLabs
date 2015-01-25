/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */

// Do not change the name of this function
var makeMap = function() {
// All your code will go inside this function
   // This object should contain the methods you want to expose:
   var o = {
      has: function(){
         
      },
      lookup: function(){

      },
      add: function(){

      },
      update: function(){

      },
      remove: function(){

      },

   };
   // Use this object to store the key-value pairs:
   var storedPairs;

   // Add initialization code here

   // Add local functions here

   // Prepare the object o before returning it

   return o;
}


// Do NOT change anything below this line.
/*
 * To allow node.js to run our tests. DO NOT CHANGE!
 */
try {
   module.exports = {
      makeMap: makeMap
   };
} catch (e) {}

// var makeStack = function() {
//    var stack = [];
//    return {
//       push: function(v) {
//          stack.push(v);
//          return this;
//       },
//       pop: function() {
//          if (this.isEmpty())
//             throw new Error("Attempt to pop from empty stack");
//          else
//             return stack.pop();
//       },
//       isEmpty: function() {
//          return stack.length === 0;
//       },
//    };
// }
