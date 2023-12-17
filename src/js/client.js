/**
 * @copyright jaiminpatel 2023
 */

'use strict';

// Import module

import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";


const $sidebarList = document.querySelector('[data-sidebar-list]');
const $notePanelTitle = document.querySelector('[data-note-panel-title]');
const $notePanel = document.querySelector('[data-note-panel]');
const $notebookCreateBtns = document.querySelectorAll('[data-note-create-btn]');
const $emptyNotepanel = `
<div class="empty-notes">
  <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>
  <div class="text-headline-small">No notes</div>
</div>
`;


const disabledNoteCreateBts = function (isThereAnyNotebook){
   $notebookCreateBtns.forEach($item => {
    $item[isThereAnyNotebook ? 'removeAttribute' : 'setAttribute']('disabled', '')
   })
};



export const client = {
    notebook : {
        create(notebookData){
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = $emptyNotepanel;
            disabledNoteCreateBts(true);
        },

        read(notebookList){
            disabledNoteCreateBts(notebookList.length);
           notebookList.forEach((notebookData, index) => {
            const $navItem = NavItem(notebookData.id, notebookData.name)

            if(index === 0){
                activeNotebook.call($navItem);
                $notePanelTitle.textContent = notebookData.name;
            }

            $sidebarList.appendChild($navItem);
           });
        },

        update(notebookId, notebookDate){
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
             
            const $newNotebook = NavItem(notebookDate.id, notebookDate.name);
            
            $notePanelTitle.textContent = notebookDate.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        // Delete a notebook from the UI 
        delete(notebookId){
           const $deleteNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
           const $actionNavItem = $deleteNotebook.nextElementSibling ?? $deleteNotebook.previousElementSibling;
           
           if($actionNavItem){
            $actionNavItem.click();
           }else{
             $notePanelTitle.innerHTML = '';
             $notePanel.innerHTML = '';
             disabledNoteCreateBts(false);
           }

           $deleteNotebook.remove();
        }  
    },

    note : {

        // Create note card on ui side 
        create(noteData){
            const $card = Card(noteData);
            if(!$notePanel.querySelector('[data-note]')) $notePanel.innerHTML = '';
            $notePanel.appendChild($card);
        },

        read(noteList){
           
            if(noteList.length){
                $notePanel.innerHTML = '';

                noteList.forEach(noteData => {
                    const $card = Card(noteData);
                    $notePanel.appendChild($card);
                })
            }else{
                $notePanel.innerHTML = $emptyNotepanel;
            }
        },

        update(noteId, noteDate){
            const $oldCard = document.querySelector(`[data-note="${noteId}"]`);

            const $newCard = Card(noteDate);
            $notePanel.replaceChild($newCard, $oldCard);
        },

        delete(noteId, isNotExitedNotes){
            document.querySelector(`[data-note="${noteId}"]`).remove();
            if(!isNotExitedNotes) $notePanel.innerHTML = $emptyNotepanel;
        }
    }
}