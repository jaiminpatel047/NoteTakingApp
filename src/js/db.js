/**
 * @copyright jaimin patel 2023
 */

'use strict';

// Imoport modul 
import { generateID, findNotebook, findnotebookIndex, findNote, findnoteIndex } from "./utils.js"

//Db object
let notekeeperDB = {};

const intiDB = function(){
    const db = localStorage.getItem('notekeeperDB');

    if(db){
        notekeeperDB = JSON.parse(db);
    }else{
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

intiDB();

// Reads and loads the localStorage date in to the global variable `notekeerperDB`

const readDB = function(){
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'))
}

// Writes the current state of the global variable `notekeeperDB` to local storage 

const writeDB = function(){
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}



export const db = {

    post : {
        notebook(name){
            readDB();
            
            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);

            writeDB();

            return notebookData;
        },

        // Add new note to specify notebook 
        note(notebookId, object){
            debugger
           readDB();

           const notebook = findNotebook(notekeeperDB, notebookId);
           const noteData = {
            id : generateID(),
            notebookId,
            ...object,
            PostedOn : new Date().getTime()
           }

           console.log(noteData);
           notebook.notes.unshift(noteData);

           writeDB();
        }
    },

    get : {
       notebook(){
        readDB();

        return notekeeperDB.notebooks;
       },

       //  Retrieves all notes within a specified noteboks 
       note(activeNotebookId){
           readDB();

           const notebook = findNotebook(notekeeperDB, activeNotebookId);
           return notebook.notes;
       }
    },

    update: {

        notebook(notebookId, name){
           readDB();

           const notebook = findNotebook(notekeeperDB, notebookId);
           notebook.name = name;

        
           writeDB();

           return notebook;
        },

        note(noteID, obj){
            readDB();
            
            const oldNote = findNote(notekeeperDB, noteID);
            const newNote = Object.assign(oldNote, obj);
         
            writeDB();
            return newNote;
        }

    },

    delete : {

        // Deletes a Notebook from the database 
        notebook(notebookId){
            readDB();

            const notebookIndex = findnotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);


            writeDB();
        },

        note(notebookId, nodeId){
            readDB();

            const notebook = findNotebook(notekeeperDB, notebookId);
            console.log('Notebook:', notebook);
            const noteIndex = findnoteIndex(notebook, nodeId);
            console.log('noteIndex:', noteIndex);
            notebook.notes.splice(noteIndex, 1);

            writeDB();

            return notebook.notes;;
        }

    }

}