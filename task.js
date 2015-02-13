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
         writeable: false,
         value: makeNewTask
      },
      "fromObject": {
         enumerable: true,
         configurable: false,
         writeable: false,
         value: makeTaskFromObject
      },
      "fromString": {
         enumerable: true,
         configurable: false,
         writeable: false,
         value: makeTaskFromString
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
   task.completedTime = null;

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

function makeTaskFromObject(o) {
   var t = Task.new();
   t.setTitle(o.title);
   //t.tags = o.tags.slice(0);
   t.addTags(o.tags);  
   return t;
}

function makeTaskFromString(str) {
   return Task.fromObject(processString(str));
}


/*
 *       Prototype / Instance methods
 */

proto = {
   //Add instance methods here
   setTitle: function(s) {
      this.title = s.trim();
      return this; 
   },
   isCompleted: function() {
      return this.completedTime != null;
   },
   toggleCompleted: function() {
      this.completedTime = this.isCompleted() ? null : new Date(Date.now());
      return this;
   },
   hasTag: function(tag) {
      var i;
      for (i = this.tags.length - 1; i >= 0; i -= 1) {
         if (this.tags [ i ] === tag) {
            return true;
         }
      }
      return false;
   },
   addTag: function(s) {
      if (!this.hasTag(s)) {
         this.tags.push(s);
         return this;
      }
   },
   removeTag: function(p) {
      var i;
      console.log("foi");
      for (i = this.tags.length - 1; i >= 0; i -= 1) {
         if (this.tags[ i ] === p) {

            this.tags.splice(i, 1);

            break;
         }
      }
      return this;
   },
   toggleTag: function(q) {
      var i, contain = false;
      for (i = this.tags.length - 1; i >= 0; i -= 1) {
         if (this.tags[ i ] === q) {
            this.tags.splice(i, 1);
            contain = true;
            break;
         }
      }

      if (!contain) {
         this.tags.push(q);
      }

      return this;
   },
   addTags: function(s) {
      var i;
      for (i = s.length - 1; i >= 0; i -= 1) {
         this.addTag(s[ i ]);
      }
      //s.forEach(function(value) {
      //   this.addTag(value);
      //});
      return this;
   },
   removeTags: function(s) {
      var i;
      for (i = s.length - 1; i >= 0; i -= 1) {
         this.removeTag(s[ i ]);
      }
      return this;
   },
   toggleTags: function(s) {
      var i;
      for (i = s.length - 1; i >= 0; i -= 1) {
         this.toggleTag(s[ i ]);
      }
      return this;
   },
   clone: function() {
      var clonedTask = Task.new();
      clonedTask.title = this.title;
      clonedTask.completedTime = this.completedTime;
      clonedTask.tags = this.tags.slice(0);
      return this;
   }
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