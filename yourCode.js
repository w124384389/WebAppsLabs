/*
 * Name 1: YourNameHere
 * Name 2: YourNameHere
 */

/*
 * The function binSearch is meant to perform binary search
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
var binSearch = function(arr, val) {
   var lo, hi, mid;

   // You may need to add things here

   while (false) {     // You should change this with a proper condition
      // You will need to add things here
   }

   // You may need to add things here

};

