# Lab 3, Collections, sets, Linting

In this lab we will start building our TODO / TaskList application. In addition to testing that the previous lab introduced, this lab will introduce linting.

You should start by inspecting the file `.eslintrc`, and learning what the rules listed there do by [looking them up](http://eslint.org/docs/rules/).

To practice these rules, the initial version of `task.js` has a number of style errors in it. Run

```
eslint task.js
```

see the errors and fix them, before moving on. Make a commit encompassing all those fixes.

From this point on, make sure to do `eslint` on your files before making a commit. You should NEVER commit something that does not pass the linter on your main code files. (You can choose whether to lint test files or not)

For your convenience, a MAKEFILE is provided:

- Doing `make lint` will run eslint on your two code files.
- Doing `make lintall` will run eslint on code files and test files.
- Doing `make testTask` will run the tests in `task.spec.js`.
- Doing `make testCollection` will run the tests in `collection.spec.js`.
- Doing `make all` will run lint on your code files, and if they pass it will then run the test files.

There are 4 files in total that you need to work with:

- `task.js`: Contains a "class" for creating tasks and setting task properties.
- `collection.js`: Contains a "class" for managing a "collection of tasks".
- `task.spec.js`: Contains tests for the tasks class.
- `collection.spec.js`: Contains tests for the collection class.

We will do testing a bit differently this time around. Instead of opening a web-page to view the tests, you will run them from the command line / terminal. For instance to run the tests for the task class, you would do:

```
mocha task.spec.js
```

You can choose different "reporters". Have a look at [the mocha documentation](http://mochajs.org/#reporters) for how each reporter behaves, and try some out.

We will now describe the two code files you need to work on.

## task.js

This file "exports" a Task object. The object's definition and export are provided at the end of the file and you should not change them.

### Properties and construction

An instance of a task object will have the following properties. You must initialize these properties in your method that creates objects.

- **id**: This should be an ever-increasing integer, uniquely identifying each task. The first created task should get an id of 1, the second should get an id of 2 and so on. You should define this property so that the ids of tasks are visible properties but cannot be changed. (so enumerable, but not configurable and not writable)
- **title**: The "text" of the task. A newly created task should have a title equal to an empty string.
- **completedTime**: The value of this task should be either `null` if the task is not yet "completed" (this should be the default for new tasks), or a Date object (typically created via `new Date()`) marking when the task was completed.
- **tags**: This should be an array, starting as empty, meant to contain a list of the string "tags" attached to this task. This variable should be not configurable, not writeable and not enumerable. We will create specific methods to interface with it instead.

After initializing your object, you should use `Object.preventExtensions` on it before returning it in order to make sure that noone can add other properties to it later on.

There are three "class methods" provided for creating new objects. You will need to implement them. You should create and run tests, lint and commit after each function you write.

- **makeNewTask**: This should initialize a new task. You should use `Object.create` to create it and assign it properties as described above. While "title" and "completedTime" can be created via simple assignment, "id" and "tags" will require the use of `Object.defineProperty`. You must also use `Object.preventExtensions` before returning the object.

    This function is exported to the world as `Task.new`.

    This method is the main constructor. After implementing it, you should implement the instance/prototype methods before proceeding to the two "convenience constructors" below, as they will require the use of the prototype methods.
- **makeTaskFromObject**: This method takes as argument an object `o`. It MUST use `Task.new` to initialize a new task, then use the `title` and `tags` properties of `o` to populate the title and tags of the newly created task before returning it to the caller. Before implementing this function, you will need to have implemented the prototype methods that allow you to add to the tags list. Also make sure to use `setTitle` to set the title, as it does some cleanup.

    This function must call `Task.new` and hence effectively call `makeNewTask` instead of creating a new object directly.

    This function is exported as `Task.fromObject` to the outside world.
- **makeTaskFromString**: This method takes as argument a string `s`. The string can be assumed to have a specific form:
    - It may have some whitespace characters at the beginning. They should be removed.
    - It will be followed by an alphabet character, followed by a sequence of alphanumeric characters and whitespaces. These will form the title, and must not end in whitespace. They terminate when the next part is encountered:
    - The end of the string might have the following form: `"   #tag1 #tag2#tag3  "`. So possibly a sequence of spaces after the last alphanumeric character, optinally followed by a sequence of "tags", each preceded by the pound sign. The tags are all alphabet characters.

    For example, the string `" hi there! #hottopic "` should result in a title of `"hi there!"` and a tag of `"hottopic"` added to the tags list.

    To help you in this task, a function `processString` has been provided, which will break the string apart for you and return to you an object with a title property and a tags property. Your `makeTaskFromString` simply has to call `Task.fromObject` appropriately. The implementation can comfortably fit in one line, but you can expand it to 3-4 lines if you like. This method should be fairly short though, as it reuses other methods for the heavy lifting.

    This method is exported to the world as `Task.fromString`.

### Prototype methods

Prototype methods must go in the provided `proto` object. Here are the prototype methods you must implement. Your proto object should contain exactly these properties. You can add whatever local methods you want to use in your file, but your proto object should not contain anything other than the methods in this list. In all these methods, you do not need to check that the arguments are of the types suggested, unless you are explicitly told so. For instance in the `hasTag` method, you can assume that the first argument is a string, you do not have to check for it in your code. Your code is allowed to fail spectacularly if it is provided a non-string argument. Similarly for other methods.

Here are the methods:

- **setTitle**: Expects one string argument `s`. It should then set the object's title to equal the string after you have trimmed whitespace from both ends. It should return the object (`this`). If you look at the [String object's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) you will find a string method that can help you trim whitespace easily.
- **isCompleted**: No arguments. Returns a boolean value that indicates whether the object/task is "completed" or not, as indicated by the setting of `completedTime`.
- **toggleCompleted**: No arguments. If the task is completed, it "uncompletes" it by setting the `completedTime` back to `null`. If the task is not completed, it "completes" it by setting the `completedTime` to equal the current time. Returns the object (`this`).
- **hasTag**: One string argument, to be interpreted as a tag. Returns a boolean depending on whether the tag appears in the tags list.
- **addTag**: One string argument, to be interpreted as a tag. Adds the tag to the `tags` list, if it is not already there.
- **removeTag**: One string argument, to be interpreted as a tag. Removes the tag from the `tags` list, if it is there. Returns `this`.
- **toggleTag**: One string argument, to be interpreted as a tag. Toggles the status of the tag: If it isn't there, adds it. If it is there, removes it. Returns `this`.
- **addTags**: One array argument, whose entries are strings (tags). Adds those tags from the list that are not already present. Returns `this`.
- **removeTags**: One array argument, whose entries are strings (tags). Removes those tags from the list that are present. Returns `this`.
- **toggleTags**: One array argument, whose entries are strings (tags). Toggles the presence of the tags in the list. Returns `this`.
- **clone**: Returns a new task, with the same title, completion status and tag list as the original (`this`).

## collection.js

This file exports a TaskCollection "class", that implements collections of tasks. This is little more than a wrapper around Javascript arrays, with a more specific interface.

As before, make sure to create issues and make individual commits for each function, and never commit without passing the linter first.

### Properties and construction

A task collection has a single property, `values`, which must be not writable and initialized to equal an empty array. This array will hold the task objects.

The TaskCollection object must implement the following constructor:

- **TaskCollection.new**: This will be implemented in the function `makeNewCollection`. It must use `Object.create` and possibly `Object.defineProperty` to create a new object with the appropriate properties. It must use `Object.preventExtensions` to prevent later additions to this object, before returning it.

    This constructor takes an optional first parameter, `arr`. If that parameter is provided and is an array, then its elements (and not the array itself) must be used to initialize the `values` property. You will likely want to use one of the prototype methods to add those elements.

### Prototype / Instance methods

These will all go into the `proto` object. It should contain no other properties.

- **length**: Returns the number of tasks currently stored.
- **isEmpty**: Returns a boolean indicating whether the collection is empty.
- **get**: Returns a task, given some condition prescribed by the first argument, as described below. It should return `null` if no task satisfies the condition.

    Takes one argument, which may take several forms (you can assume the argument will be there and will have one of these forms):
    - It could be a function `f(task)`. `f` should expect to receive a task as the first argument, and it should return a boolean as to whether this task is "acceptable". This method `get` should then return the first task for which the function is `true`.
    - It could be a number. In this case if there is a task with an `id` equal to that number, then *it* will be returned. (Careful, the number must match the task's id, not its position in the `values` array)
    - It could be a string. In this case you return the first task, if any, for which the title contains the string.
    - It could be a regular expression. In this case you return the first task, if any, for which the title matches the regular expression.

    You may find it helpful to create a private helper function that takes arguments in the same format at `get`, but returns instead the index of the `values` array in which the matched task resides, or `-1` if there isn't any matching task.
- **has**: Behaves exactly like `get`, but returns a boolean indicating whether a task was found, rather than returning the task. This should be very short.
- **add**: Expects as argument a Task object (no need to check for this). It will add the object to the list, if it does not already exist (don't forget that id's are unique for each task).

    It may also instead be given as argument an array of task objects. In that case, it should add all the task objects, if they do not already exist in the list. You may find it helpful to use some sort of private "addOneTask" function.

    Returns `this` (the collection).
- **new**: Not to be confused with the class-level method new, nor the Task class's new. Takes no arguments. Creates a new task object (by calling `Task.new`), adds it to the collection, then returns it.
- **remove**: Expects as argument a single number or array of numbers. It interprets those numbers as the id's of the tasks you want to have removed. Then removes those tasks from the list, if they were present. Returns `this` (the collection).
- **filter**: Expects its argument in the same formats as `get`, except that in the case of a single number it expects to be provided an array of numbers instead. It returns a *new* TaskCollection containing those tasks that match the criteria.
- **forEach**: Takes as argument a function `f(task)`. It will call the function on each element in its `values` array, passing it the task as the single argument. Returns `this`.
