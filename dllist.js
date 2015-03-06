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
      value: null,
      next: sentinel,
      prev: sentinel
   };
   lst.sentinel = sentinel;
   return lst;
}


/*
 *       Prototype / Instance methods
 */

proto = {
   // Add instance methods here
   isEmpty : function() {

   },
   length : function() {

   },
   first : function() {

   },
   last : function() {

   },
   insertAt : function() {

   },
   unshift : function() {

   },
   push : function() {

   },
   endAt : function() {

   },
   remove : function() {

   },
   pop : function() {

   },
   shift : function() {

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
