/*
 * dllist.js
 *
 * Contains implementation for a double-linked list "class"
 */

var Iterator, DLList, proto;

Iterator = require("./iterator.js");

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
      var count = 0, item = this.sentinel;

      while (item.next !== this.sentinel) {
         count += 1;
         item = item.next;
      }
      return count;
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
      return item;
   },
   unshift : function(value) {
      return this.insertAt(value, this.sentinel);
   },
   push : function(value) {
      return this.insertAt(value, this.sentinel.prev);
   },
   endAt : function(item) {
      item.next = this.sentinel;
      this.sentinel.prev = item;
      return this;
   },
   remove : function(item) {
      item.prev.next = item.next;
      item.next.prev = item.prev;
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
   isFirst : function(item) {
      return this.sentinel.next === item;
   },
   isLast : function(item) {
      return this.sentinel.prev === item;
   },
   iterator : function() {
      var item = this.sentinel, that = this;
      return Iterator.new(
         function (){ item = item.next; return item; },
         function (){ return item.next !== that.sentinel; }
      );
   },
   forEach : function(f) {
      this.iterator().forEach(f);
      return this;
   },
   toArray : function() {
      var arr = [];
      this.forEach(function (item) { arr.push(item.value); });
      return arr;
   },
   iterateFrom : function(item) {
      item = item.prev, that = this;
      return Iterator.new(
         function (){ item = item.next; return item; },
         function (){ return item.next !== that.sentinel; }
      );
   },
   reverseIterateFrom : function(item) {
      item = item.next, that = this;
      return Iterator.new(
         function (){ item = item.prev; return item; },
         function (){ return item.prev !== that.sentinel; }
      );
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
