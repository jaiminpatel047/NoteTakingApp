/**
 * @copyright jaiminpatel 2023
 */

'use strict';

const addEventOnElements = function($elements, eventType, callback){
  $elements.forEach($element => $element.addEventListener(eventType, callback));
}

const getGreetingMsg = function(currentHour){
   const greeting = currentHour  < 5 ? 'Night' : 
   currentHour < 12 ? 'Morning' :
   currentHour < 15 ? 'Noon' :
   currentHour < 17 ? 'Afternoon' :
   currentHour < 20 ? 'Evening' : 'Night';
   
   return `Good ${greeting}`
}

let $lastActiveNavItem;

// Activetes a navigation item by adding the 'active' class and deactivaties the previously active item. 

const activeNotebook = function(){
  $lastActiveNavItem?.classList.remove('active');
  this.classList.add('active')
  $lastActiveNavItem = this;
}

const makeElemEditable = function($element){
   $element.setAttribute('contenteditable', true);
   $element.focus();
}

// Generates a unique ID based on the current timeStamp
const generateID = function(){
   return new Date().getTime().toString();
} 

// Finds a notebook in database by its  ID.
const findNotebook = function (db, notebookId){
   return db.notebooks.find(notebook => notebook.id === notebookId);
}

// Find the index of a notebook in an array of notebooks based on its Id 
const findnotebookIndex = function(db, notebookId){
   return db.notebooks.findIndex(item => item.id === notebookId)
}

const getRelativeTime = function (milliseconds) {
   const currentTime = new Date().getTime();
   const minute = Math.floor(
       (currentTime - milliseconds) / 1000 / 60
     );
   const hour = Math.floor(minute / 60);
   const day = Math.floor(hour / 24);
   return minute < 1
     ? "Just now"
     : minute < 60
     ? `${minute} min ago`
     : hour < 24
     ? `${hour} hour ago`
     : `${day} day ago`;
 };

// Find noteID
const findNote = (db, noteID) => {
   let note;
   for(const notebook of db.notebooks){
      note = notebook.notes.find(note => note.id === noteID);
      if(note) break
   }

   return note;
}

const findnoteIndex = function(notebook, noteId){
   return notebook.notes.findIndex(note => note.id === noteId);
}

export{ 
  addEventOnElements, 
  getGreetingMsg, 
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findnotebookIndex,
  getRelativeTime,
  findNote,
  findnoteIndex
}