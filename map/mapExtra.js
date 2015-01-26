/*
 * Name 1: Douglas Puppio
 * Name 2: YourNameHere
 */

// Do not change the name of this function
var makeMap = function() {
// All your code will go inside this function
   // Use this object to store the key-value pairs:
   var storedPairs = {};

   // This object should contain the methods you want to expose:
   var o = {
      has: function (key) {
         return storedPairs.hasOwnProperty(key);
      },
      lookup: function(key) {
         if (!this.has(key)) throw new Error("The Key" + key + "does not exists. Method: lookup.");
         
         return storedPairs[key];
      },
      add: function(key, val) {
         if (this.has(key)) throw new Error("The Key" + key + "already exists. Method: add.");
         
         storedPairs[key] = val;
         return this;
      },
      update: function(key, val) {
         if (!this.has(key)) throw new Error("The Key" + key + "does not exists. Method: update.");
         
         storedPairs[key] = val;
         return this;
      },
      remove: function(key){
         if (!this.has(key)) throw new Error("The Key" + key + "does not exists. Method: remove.");
         
         delete storedPairs[key];
      },
      forEach: function(callback[, thisArg]) {
         if (typeof callback === 'function') return ;
      },
      map: function() {

      },
      filter: function() {

      },
      reduce: function() {

      }
   };

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
