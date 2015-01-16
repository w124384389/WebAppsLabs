# Web Applications Course, lab 1

In this lab you will have to write 3 functions.

- Starting code for the functions can be found in [yourCode.js](yourCode.js). This is the only file that you should edit.
- The tests that will be run are in the file [tests.spec.js](tests.spec.js). You may look at this file for ideas on what tests are being run. Do NOT modify this file.
- In order to see how your tests are doing, open the [index.html](index.html) file in your browser. It should show you a listing of each test and which ones succeeded, as well as information on the ones that failed. Do NOT modify this file.

## General Advice

- Think about what your function should be doing! Write it out, perhaps in a GitHub issue.
- Use `console.log` whenever you want to see what the output of something would be. Then loading the `index.html` file should show you this information on the console. Basically, use this as "print" statements. It is a very valuable debugging tool. Sprinkling `console.log` statements all over your function is a great first step.
- Work in small increments, step by step. Use those `console.log`s to make sure that you get what you would expect at each step.
- Most solutions fit within 10-15 lines of code. You can have longer code of course, but think about whether you are doing redundant steps.

## The functions

Here are descriptions for the functions you have to write:

### binarySearch

The function `binarySearch` is meant to perform binary search.

You may assume your function will be called with two arguments:

- An array `arr` that you may assume is a possibly empty array of numbers that are in ascending order and don't include NaN or Infinity.
- You may further assume there are no gaps/missing values in the array.
- A number `val` which again you may assume is not NaN or Infinity.
- Your function must return a boolean value. If `val` is equal to one of
the numbers in the array, then it should return `true`, otherwise `false`.
- Your function must perform boolean search. Boolean search utilizes the fact
that the array is sorted in order to find an element in logarithmic time. It
proceeds as follows:

    - You will need to maintain two variables, `lo` and `hi`, corresponding to indices into the array. Those variables must have the property that at any given time we have `arr[lo] <= val <= arr[hi]`, so because the array is sorted then the value, if it exists, must appear somewhere from index `lo` to index `hi`.
    - Start with indices at the exteme ends of the array.
    - Establish a `while` loop that at each step examines the element at index halfway between the indices `lo` and `hi` and compares it to `val`. If that element is less than `val`, then `val`, if it exists, must exist between that midpoint index and `hi`. Otherwise it must exist between `lo` and the midpoint index. In the first case your code would update `lo` to be at the midpoint, in the second it would update `hi` to be at the midpoint. Then it would repeat the loop. This way the interval between `lo` and `hi` is cut in half each time.
    - You will need an appropriate stopping condition on your `while` loop.

- You may find it useful to have `return` statements at various places in your
code, depending on at which point you discover whether `val` is in the array or
not. You can use a `return` from within your `while` loop if that is appropriate
for example.
- You should not use `Array`'s `indexOf` and `lastIndexOf` methods. They perform a linear search and will fail the timing tests.

### countTags

The function countTags will later on become part of our todo-list application.

- The argument `items` is a, possibly empty, Javascript array whose entries are objects with many properties of which we only care about a property `tags`.
- For every object `o` in the `items` array, `o.tag` is an array of "tags". For instance, `o.tags` might be `["work", "urgent", "car"]`, indicating that the corresponding task is work-related, time-sensitive, and requires a car.
- You may assume that `o.tags` has no duplicates in it.
- It is possible that the array of tasks `o.tags` is in fact empty.
- It is possible that `o.tags` is not actually an array. Your function should simply ignore it in that case, and move on to the next item. If you look through MDN's documentation for Array, you should find a method you can use to test if a given value is an array.

Your function should do the following: Given such an array of items, it should return an object `tagCounts`. This object should have one key for each tag encountered. The value for that key should be the number of items that has that tag in their `o.tags`.

So your code will need to iterate over the array `items`, and for each item look into its `tags` property, and increase the counts for the tags encountered there in the `tagCounts` object, initializing any tags not previously encountered.

Do not forget to declare any local variables you need to use in your function.

### extractHashTags

The function `extractHashTags` attempts to extract hash-tags out of a string.

It takes as input a string `str`. A "hashtag" would be the hash character `#` immediately followed by a sequence of one or more letters (a-z, A-Z).

The function should return a (possibly empty) array of the hashtags present in the string `str`. For example the string `"Such a nice day! #goSwimming #sunny"` should return the array `["goSwimming", "sunny"]`.

Your code should take care to avoid duplicates: If a hashtag appears twice, it should only be included once in the return value.

