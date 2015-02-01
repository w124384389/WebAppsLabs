/*
 * controller.js
 *
 * Controls the interaction between the page and an array of values
 */

/*
 * Used to create a new "controller".
 * "element" needs to be a DOM or jQuery "ul" element.
 * "tasks" is an array of strings. This array will be used "as is",
 *    i.e. a reference to it is stored and used, rather than cloning.
 *    Defaults to [] if not provided.
 */
var makeController = function(element, tasks) {
   "use strict";

   // element and tasks are local variables representing the UI elements
   // We will ensure "element" is a jQuery object and that tasks exists.
   var el = $(element);
   tasks = typeof tasks == 'undefined' ? [] : tasks;

   // add an "add" button right after the element
   addAddButton();
   // Bind events to controller functions
   bindEvents();

   return {
      el: element,
      tasks: tasks
   };

   /*
    * Everything below here is the functions you need to implement.
    */

   /*
    * Adds an input tag as a sibling immediately after the element.
    * Input tag should be a button, saying "New" on it.
    * You need to bind the button's click event to the "addNewTask"
    * function.
    */
   function addAddButton() {
      var button;   // Should be a reference to the newly created button
      // Use jQuery syntax to create a new html element
      // Use appropriate append-type jQuery method to add it right after
      // element

      // Bind clicking of the button to calling the addNewTask function.

      return this;
   }

   /*
    * Adds a new "Task". In this method you should:
    * - Push a new string with the text "New Task" at the end of the tasks array.
    * - Create a new "li" item that contains:
    *     - A "span" whose contents is the string.
    *     - An "input" of type "button", class "remove" and value "Remove".
    * - Put that "li" at the end of the element.
    * - Return true to not prevent propagation.
    */
   function addNewTask(ev) {
      return true;
   };

   /*
    * This method triggers in response to clicking the button with class
    * remove. It should:
    * - Identify the "li" element containing the button.
    * - Identify the index of this element by figuring out how many
    *    sibling "li"'s are before it.
    * - Remove the correspondingly-indexed element from the tasks array.
    * - Remove the "li" element. from the list.
    * - return true to not prevent propagation.
    */
   function removeElement(ev) {
      return true;
   };


   /*
    * This method is meant to allow editing of an item. It does this by
    * inserting an input element and hiding the existing elements.
    * It should do the following:
    * - Identify the "li" element that was clicked
    * - Add the class "hidden" to the "span" element and the remove button.
    *    Together with our CSS specification, this will hide them.
    * - Create and insert into "li" an "input" element with type "text",
    *       class "edit" and value equal to the string corresponding to
    *       this "li" element.
    * - Set the focus to this new input element.
    * - Return true to allow propagation.
    */
   function editElement(ev) {
      return true;
   };

   /*
    * This method happens when the text input where the user was editing a
    * text is registering a change, typically associated with tabbing out
    * or pressing "return". This should commit the change. So you need to
    * do the following:
    * - Get the value of the edit element
    * - Find the "li" element containing this edit element
    * - Delete the class "hidden" from the "span" and "button" that are
    *    in that "li" element
    * - Remove the edit element
    * - Set the contents of the "span" to the value you read from the edit
    *     element.
    * - Find what index in the whole list of "li"'s this particular element is
    *      This particular task is needed in multiple function, think of
    *      separating it into a function of its own
    * - Set the corresponding string in the "tasks" array to the new value
    * - Return true to allow propagation
    */
   function commitEditing(ev) {
      return true;
   };

   /*
    * This method is meant to react to the case where the user has pressed
    * the "esc" button to aknowledge that they did not mean to edit the
    * item. You should do the following:
    * - Read the keyboard code of the event, and if it is not escape return.
    *       That part is done for you.
    * - If it was an escape, we need to cancel the current editing field.
    * - Find the "li" element containing the text input element
    * - Delete the class "hidden" from the "span" and "button" that are
    *    in that "li" element
    * - Remove the edit element. Note that these last two steps are common
    *    for multiple functions, maybe separate them into their own function.
    * - Return "false" to prevent propagation in the case of an escape.
    */
   function checkForCancel(ev) {
      if (ev.keyCode !== 0x1B) { return true; }

      return false;
   };

   /* You do not need to change anything below this line */

   /*
    * Binds UI events to specific object methods.
    * You do not need to change this method.
    */
   function bindEvents() {
      el.on('dblclick', 'li', editElement);
      el.on('change', '.edit', commitEditing);
      el.on('click', '.remove', removeElement);
      el.on('keypress', '.edit', checkForCancel);
   };
};


// jQuery with function. This function runs when the page has finished
// loading.
// We will use this function as the local scope in which to define things.
//
// Normally this would have been on a different file.
$(function() {
   "use strict";

   var controller; // a specific controller object initialized to work
                   // with our page

   // Create the controller
   controller = makeController($('#main ul'), []);

});
