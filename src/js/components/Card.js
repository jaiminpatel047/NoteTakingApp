/**
 * @copyright jaimin patel 2023
 */

'use strict';

// Import Module 
import { Tooltip } from "./Tooltip.js";
import { getRelativeTime } from "../utils.js";
import { DeleteConfirmModal, NoteModal } from "./Modal.js";
import { db } from "../db.js";
import { client } from "../client.js";

// Create card in html representing a modal based on provide note data 
const Card = function(noteData){
    
    const {id, notebookId, title, text, PostedOn } = noteData;

    const $card = document.createElement('div');
    $card.classList.add('card');
    $card.setAttribute('data-note', id);

    $card.innerHTML = `
    <h3 class="card-title text-title-medium">${title}</h3>

                <p class="card-text text-body-larger">
                ${text}
                </p>

                <div class="wrapper">
                    <span class="card-time text-label-large">${getRelativeTime(PostedOn)}</span>

                    <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete Note" data-delete-btn>
                        <span class="material-symbols-rounded" aria-hidden="true">delete</span>
                         
                        <div class="state-layer"></div>
                    </button>
                </div>
                <div class="state-layer"></div>
    `;

    Tooltip($card.querySelector('[data-tooltip]'));

    $card.addEventListener('click', function(){
        const modal = NoteModal(title, text, getRelativeTime(PostedOn));
        modal.open();

        modal.onSubmit(function(noteData){
            const updatedData = db.update.note(id, noteData);
            
            // Update UI
            client.note.update(id, updatedData);
            modal.close();
        })
    })

    // Note Delete Functionality

    const $deleteBtn = $card.querySelector('[data-delete-btn]');
    $deleteBtn.addEventListener('click', function(event){
            event.stopImmediatePropagation();
           const modal = DeleteConfirmModal(title);
           modal.Open();

           modal.onSubmit(function(isConfirm){
              if(isConfirm){
                  const existedNotes = db.delete.note(notebookId, id);
                   client.note.delete(id, existedNotes.lenght);
              }

              modal.Close();
           })
    })

    return $card;
}

export { Card };