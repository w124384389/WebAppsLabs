/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator");

/*
 *       Constructors
 */

function makeNewList() {
   var lst, sentinel;

   lst = Object.create(proto);
   sentinel = { 
      value: null
   };
   sentinel.next = sentinel;
   sentinel.prev = sentinel;
   lst.sentinel = sentinel;
   lst.len = 0;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty : function() {
      return this.sentinel.next == this.sentinel.prev;
   },
   length : function() {
      return this.len;
   },
   first : function() {

   },
   last : function() {

   },
   insertAt : function(value, element) {
      var item = {};
      
      //Set the new item prev and next
      item.value = value;
      item.next = element.next;
      item.prev = element;
      //set the next element prev to the item
      item.next.prev = item;
      //set the previous element next to the item
      element.next = item;

      this.len += 1;

      return item;
   },
   unshift : function(value) {
      return this.insertAt(value, this.sentinel);
   },
   push : function(value) {
      return this.insertAt(value, this.sentinel.prev);
   },
   endAt : function() {

   },
   remove : function(item) {
      item.prev.next = item.next;
      item.next.prev = item.prev;
      this.len -= 1;
      return item.value;
   },
   pop : function() {
      if (this.length() === 0) throw new Error('The element couldn`t being removed. List is empty.');
      return this.remove(this.sentinel.prev);
   },
   shift : function() {
      if (this.length() === 0) throw new Error('The element couldn`t being removed. List is empty.');
      return this.remove(this.sentinel.next);
   },
   isFirst : function() {

   },
   isLast : function() {

   },
   iterator : function() {

   },
   forEach : function() {

   },
   toArray : function() {

   },
   iterateFrom : function() {

   },
   reverseIterateFrom : function() {

   },
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
DLList = {
   new: makeNewList
};

Object.defineProperty(DLList, "prototype", {
   value: proto,
   writable: false
});

module.exports = DLList;
