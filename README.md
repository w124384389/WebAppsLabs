# Lab 6, Commands and History

In this lab we will work on creating a command history class that would allow one to implement undo/redo functionality in an application.

Remember that you should always lint your code, and you should NEVER commit something that does not pass the linter on your main code files. (You can choose whether to lint test files or not)

For your convenience, a MAKEFILE is provided:

- Doing `make lint` will run eslint on your code files.
- Doing `make lintall` will run eslint on code files and test files.
- Doing `make test` will run the tests in `dllist.spec.js` and `history.spec.js`.
- Doing `make all` will run lint on your code files, and if they pass it will then run the test files.

There are 4 files that you need to work with:

- `dllist.js`: Contains a "class" for double-linked lists.
- `dllist.spec.js`: Contains tests for the dllist class.
- `history.js`: Contains a "class" for managing the history.
- `history.spec.js`: Contains tests for the history class.

We will continue testing from the command line / terminal. You can do

```
mocha yourSpecFile
```
or
```
make test
```

## Commands

We first discuss the general idea of the command pattern. You will not need to implement commands in this lab, but these are the objects you will be managing in your collection.

Commands encapsulate an operation that needs to be performed. This way multiple UI elements could for instance trigger it. Deleting a word in a text for instance, or typing some new test, would all be encapsulated as "commands".

The commands we will imagine at our disposal have a simple form. They are objects with the following properties:

- **execute**. This is the method someone would call in order to perform the command's task.
- **unexecute**. This is the method someone would call to undo the command's task. We will assume all methods that land in our history are undoable in this way.
- **toString**. A textual description of what the command "does".

The interface is kept simple on purpose, to shield the elements that need to call the command from knowing too much about where it came from and what it entails.

## Command History

You will work on implementing a command history class.

- We will maintain the commands in the history as a double-linked list. A part of the assignment will be implementing this structure.
- Along with the list, we will maintain a reference "current" pointing to the "last executed command".
    - To "undo", you would unexecute the current command then shift the pointer back.
    - To "redo" you would shift the pointer forward and execute the command there.
    - To add a new command, you would add it as the next item on the list at the "current" pointer, and move the pointer there, and effectively eliminating all followup commands (you can't redo them any more if you've now taken a different direction).

## Double-Linked Lists

We will implement circular double-linked lists using a "sentinel" to indicate beginning and end. You will work with the `dllist.js` file for this part.

The constructor for list objects has been implemented for you. It creates a "sentinel" property. This is used to indicate both the beginning and ending of the list. It itself is not meant to be a list element, but it is a placeholder that makes a lot of the code implementation easier.

List elements all contain 3 properties:

- `value`: contains the actual value that was meant to be stored in the list (in our case these will turn out to be the command objects).
- `next`: contains a reference to the next item on the list. If this is the last item, it will point to the sentinel. The sentinel's "next" should always point to the first element in the list.
- `prev`: contains a reference to the previous item on the list. If this is the first item, it will point to the sentinel. The sentinel's "prev" should always point to the last element in the list.

When you create a new item and try to put it in its place, you will need to set its next and prev pointers, and you will also need to adjust the prev and next pointers of those elements to point back to your element.

These are the methods you will need to add to the prototype. They are listed in the order you should try to implement them in. In many cases, you can reuse previous methods to get your work done without having to rewrite too much code.

- `isEmpty`: Returns a boolean depending on whether the list is empty (only the sentinel there) or not.
- `length`: Returns the number of items in the list (not counting the sentinel).
- `first`: Returns the first item (not the value), if there is one. Throws an exception if the list is empty.
- `last`: Returns the last item (not the value), if there is one. Throws an exception if the list is empty.
- `insertAt`: This is the main workhorse for inserting a new item into the list. It takes two arguments: The `value` to be inserted, and an `element` to use as the "previous" item.

    This method needs to create a new item, set its value property, set its prev to the element, its next to that element's successor, and then adjust that element's next pointer and that successor's prev pointer. How to do this correctly will take some thinking if you have never done it before.

    The use of the sentinel element means that you do not need to worry about edge cases where the element is meant to be inserted at the beginning of the list or the end of the list. you can count on there always being a proper "next" pointer and a proper "prev" pointer, they just might happen to be the sentinel. Your algorithm should not need to handle those cases in any special way.

    Returns the newly created item.

    The next two methods should use this to do their work.
- `unshift`: Takes as argument the value to be inserted. Then adds a new element at the beginning of the list (right after the sentinel). Returns the newly created item.
- `push`: Takes as argument the value to be inserted. Then adds a new element at the end of the list (right "before" the sentinel). Returns the newly created item.
- `endAt`: Takes an item as argument. It will "end" the list at that item: That item should have the sentinel as its "next", and the sentinel should point back to that item. All elements "inbetween" that were just bypassed will be garbage-collected and you need not worry about them. Returns the list.
- `remove`: Takes an item as argument. Removes it from the list, fixing the prev/next links of the elements around it. Returns the value of the removed item. You can reuse it for the next two methods.
- `pop`: Removes the last item and returns its value. Should throw an exception if the list is empty.
- `shift`: Removes the first item and returns its value. Should throw an exception if the list is empty.
- `isFirst`: Given an item as argument, returns "true" if that item is the first item in the list.
- `isLast`: Given an item as argument, returns "true" if that item is the last item in the list.
- `iterator`: Returns an "iterator" of the kind we discussed in class. The "Iterator" class has been imported for your convenience. It should iterate over the values stored in the list, not the items themselves. Use it, and its convenience methods, to implement the following methods.
- `forEach`: Given a function `f`, applies the function to each *value* stored in the list (not the items, the values). Returns the list.
- `toArray`: Returns an array containing the values stored in the list, in the order they appear in the list.
- `iterateFrom`: Given a list item as argument, returns an iterator that would start from that item and move forwards till the end of the list.
- `reverseIterateFrom`: Given a list item as argument, returns an iterator that would start from that item and move backwards till the beginning of the list.

## Command History

A command history maintains a list of "commands" that have been "executed" and/or "unexecuted". A function "mockCommand" is provided in the `history.spec.js` file to help you make fake commands to use for testing.

All your command history needs to know about the "command" objects is that they have an `execute` method, an `unexecute` method, and a `toString` property containing a string value.

You will work with the `history.js` file for this part. The constructor has been implemented for you. A history object contains a DLList instance called "list", whose values are the command objects that have been created so far.

It also contains a "current" property that is meant to point to the item in the list containing the command that is the last to have been executed. The invariant that must be maintained is that the commands in the items from the beginning to the list up to and including "current" have been executed, in that order, while any items that follow "current" correspond to commands that have been "unexecuted" (and thus could in theory be "redone"). If there are no executed commands, "current" must be set to null.

Here are the methods that you need to implement in the history's prototype. It is imperative that in all those methods you only use the DLList interface that you implemented earlier, and never rely on implementation details of DLList.

- `add`: Adds a new command to the history, to immediately follow "current".All the commands that were following "current" must be removed, as they no longer are redoable. Also, the new command needs to be executed (by calling its execute method).
- `canRedo`: Returns true if there is an item following "current", that could be redone.
- `canUndo`: Returns true if there is a command that can be "undone".
- `redo`: Advances "current" to the next item, and executes the command there. Should throw an error if there is no next item.
- `undo`: Unexecutes the command at "current" and moves "current" back one step. Should throw an error if there is no current item to unexecute.
- `undoableIterator`: Returns an iterator that visits all the undoable commands, starting from "current" and moving backwards through the history.
- `redoableIterator`: Returns an iterator that visits all the redoable commands, starting from the one following "current" and moving forwards.
