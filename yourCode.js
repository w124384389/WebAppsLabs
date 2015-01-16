/*
 * Name 1: Chen Wang
 * Name 2: Douglas Puppio
 */

/*
 * BINARY SEARCH
 */
var binarySearch = function binarySearch(arr, val) {
   var lo, hi, mid;

   // You may need to add things here

   while (false) {     // You should change this with a proper condition
      // You will need to add things here
   }

   // You may need to add things here

};

/*
 * COUNTING TAGS
 */
var countTags = function countTags(items) {
   // Declare your local variables here. One was done for you.
   var tagCounts = {};
   var i, j;
   var o;

   // Add your code here
   // console.log("started");
   for (i = 0; i < items.length; i++) {
      // console.log(items[i]);
      o = items[i];

      if (!o.hasOwnProperty("tags") || !Array.isArray(o.tags)) continue;
      
      for (j = 0; j < o.tags.length; j++) {
         // console.log(o.tags);
         if (!tagCounts.hasOwnProperty(o.tags[j])) {
            tagCounts[o.tags[j]] = 1;
         } else {
            tagCounts[o.tags[j]] += 1;
         }
      }
      // console.log(tagCounts);
   }

   return tagCounts;
};

/*
 * EXTRACT HASHTAGS
 */
var extractHashTags = function extractHashTags(str) {

};

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
