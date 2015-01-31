/*
 * task.js
 *
 * Contains implementation for a "task" "class"
 */

var Task = (function() {
   return Object.freeze(Object.create(null, {
      "new": {
         enumerable: true,
         configurable: false,
         writable: false,
         value: makeNewTask
      }
   }));
}());

var proto;
var uniqueId = 0;

// Helper method. You should not need to change it.
// Use it in makeTaskFromString
function processString(s) {
   "use strict";
   var tags, title;

   tags = [];
   title = s.replace(/\s*#([a-zA-Z]+)/g, function(m, tag) {
      tags.push(tag);
      return "";
   });

   return { title: title, tags: tags };
}

/*
 *       Constructors
 */

function makeNewTask() {
   var task = Object.create(proto);

   uniqueId += 1;
   task.title = "";
   task.completedTime = new Date();

   Object.defineProperty(task, 'id', {
      enumerable: true,
      configurable: false,
      writeable: false,
      value: uniqueId
   });

   Object.defineProperty(task, 'tags', {
      enumerable: false,
      configurable: false,
      writeable: false,
      value: []
   });

   return Object.preventExtensions(task);
}

function makeTaskFromObject(o)
{

}

function makeTaskFromString(str)
{}


/*
 *       Prototype / Instance methods
 */

proto = {
   //Add instance methods here
   setTitle: function() {},
   isCompleted: function() {},
   toggleCompleted: function() {},
   hasTag: function() {},
   addTag: function() {},
   removeTag: function() {},
   toggleTag: function() {},
   addTags: function() {},
   removeTags: function() {},
   toggleTags: function() {},
   clone: function() {}
};



// DO NOT MODIFY ANYTHING BELOW THIS LINE
Task = {
   new: makeNewTask,
   fromObject: makeTaskFromObject,
   fromString: makeTaskFromString
};

Object.defineProperty(Task, proto, {
   value: proto,
   writable: false
});

module.exports = Task;
