/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */

/*
 * BINARY SEARCH
 *
 * The function `binarySearch` is meant to perform binary search
 *
 * You may assume your function will be called with two arguments:
 *    - An array `arr` that you may assume is a possibly empty array of numbers
 *      that are in ascending order and don't include NaN or Infinity. You
 *      may further assume there are no gaps/missing values in the array.
 *    - A number `val` which again you may assume is not NaN or Infinity.
 * Your function must return a boolean value. If `val` is equal to one of
 * the numbers in the array, then it should return `true`, otherwise `false`.
 *
 * Your function must perform boolean search. Boolean search utilizes the fact
 * that the array is sorted in order to find an element in logarithmic time. It
 * proceeds as follows:
 *    - You will need to maintain two variables, `lo` and `hi`, corresponding to
 *      indices into the array. Those variables must have the property that at any
 *      given time we have `arr[lo] <= val <= arr[hi]`, so because the array is
 *      sorted then the value, if it exists, must appear somewhere from index `lo`
 *      to index `hi`.
 *    - Start with indices at the exteme ends of the array.
 *    - Establish a `while` loop that at each step examines the element at index
 *      halfway between the indices `lo` and `hi` and compares it to `val`. If
 *      that element is less than `val`, then `val`, if it exists, must exist
 *      between that midpoint index and `hi`. Otherwise it must exist between
 *      `lo` and the midpoint index. In the first case your code would update
 *      `lo` to be at the midpoint, in the second it would update `hi` to be at
 *      the midpoint. Then it would repeat the loop. This way the interval between
 *      `lo` and `hi` is cut in half each time.
 *    - You will need an appropriate stopping condition on your `while` loop.
 * You may find it useful to have `return` statements at various places in your
 * code, depending on at which point you discover whether `val` is in the array or
 * not. You can use a `return` from within your `while` loop if that is appropriate
 * for example.
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
 *
 * The function countTags will later on become part of our todo-list application.
 * - The argument `items` is a, possibly empty, Javascript array whose entries are
 * objects with many properties of which we only care about a property `tags`.
 * - For every object `o` in the `items` array, `o.tag` is an array of "tags". For
 * instance, `o.tags` might be `["work", "urgent", "car"]`, indicating that the
 * corresponding task is work-related, time-sensitive, and requires a car.
 * - You may assume that `o.tags` has no duplicates in it.
 * - It is possible that the array of tasks `o.tags` is in fact empty.
 * - It is possible that `o.tags` is not actually an array. Your function should
 *   simply ignore it in that case, and move on to the next item. If you look
 *   through MDN's documentation for Array, you should find a method you can use
 *   to test if a given value is an array.
 *
 * Your function should do the following: Given such an array of items, it should
 * return an object `tagCounts`. This object should have one key for each tag
 * encountered. The value for that key should be the number of items that has that
 * tag in their `o.tags`.
 *
 * So your code will need to iterate over the array `items`, and for each item
 * look into its `tags` property, and increase the counts for the tags encountered
 * there in the `tagCounts` object, initializing any tags not previously encountered.
 *
 * Do not forget to declare any local variables you need to use in your function.
 */
var countTags = function countTags(items) {
   // Declare your local variables here. One was done for you.
   var tagCounts;

   // Add your code here


   return tagCounts;
};

/*
 * EXTRACT HASHTAGS
 *
 * The function `extractHashTags` attempts to extract hash-tags out of a string.
 *
 * It takes as input a string `str`. A "hashtag" would be the hash character `#`
 * immediately followed by a sequence of one or more letters (a-z, A-Z).
 *
 * The function should return a (possibly empty) array of the hashtags present in
 * the string `str`. For example the string `"Such a nice day! #goSwimming #sunny"`
 * should return the array `["goSwimming", "sunny"]`.
 * Your code should take care to avoid duplicates: If a hashtag appears twice, it
 * should only be included once in the return value.
 */
var extractHashTags = function extractHashTags(str) {

};
