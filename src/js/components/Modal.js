/**
 * @copyright jaiminpatel 2023
 */

'use strict';

const $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');

// Create and Manage a modal for adding or editing notes
const NoteModal = function(title = 'Untitled', text = 'Add your note...', time = ''){
   const $modal = document.createElement('div');

   $modal.classList.add('model');

   $modal.innerHTML= `
   <button class="icon-btn large" aria-label="Close model" data-close-btn>
                <span class="material-symbols-rounded" aria-hidden="true" >close</span>

                <div class="state-layer"></div>
            </button>

            <input type="text" placeholder="Untitled" value="${title}" class="model-title text-title-medium" data-note-field>

            <textarea placeholder="Take a note..." class="model-text  text-body-larger custom-scrollbar" style="width: 100%;" data-note-field>${text}</textarea>

            <div class="model-footer">
                <span class="time text-label-large">${time}</span>

                <button class="btn text" data-submit-btn>
                    <span class="text-label-large">Save</span>

                    <div class="state-layer"></div>
                </button>
   `;

   const $submitBtn = $modal.querySelector('[data-submit-btn]');
   $submitBtn.disabled = true;

   const [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]');

   const enableSubmit = function(){
     $submitBtn.disabled = !$titleField.value && !$textField.value;
   }

   $textField.addEventListener('keyup', enableSubmit);
   $titleField.addEventListener('keyup', enableSubmit);

   //open the modal by appending it to the document body and setting focus on the title field 
   const open = function (){
      document.body.appendChild($modal);
      document.body.appendChild($overlay);
      $titleField.focus();
   }

   const close = function (){
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
   }

    const $closeBtn = $modal.querySelector('[data-close-btn]');
    $closeBtn.addEventListener('click', close);

    const onSubmit = function(callback){
         $submitBtn.addEventListener('click', function(){
            const noteDate = {
                title : $titleField.value,
                text : $textField.value
            }
            callback(noteDate);
         })
    }
   return { open, close, onSubmit }
}

const DeleteConfirmModal = function(title){
      const $modal = document.createElement('div');
      $modal.classList.add('model');
      $modal.innerHTML = `
      <h3 class="model-title text-title-medium">
            Are you sure you want to delete <strong>"${title}"</strong>?
          </h3>           
            <div class="model-footer">
                <button class="btn text">
                    <span class="text-label-large" data-action-btn="false">Cancel</span>
                    <div class="state-layer"></div>
                </button>

                <button class="btn fill">
                    <span class="text-label-large" data-action-btn="true">Delete</span>
                    <div class="state-layer"></div>
                </button>
      `;

    //  Open the delete confirmation modal by appending it to the document body 
    const Open = function (){
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    // Close the delete confirmation modal by removing it from the document body 
    const Close = function(){
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const $actionBtns = $modal.querySelectorAll('[data-action-btn]');

    const onSubmit = function(callback){
         $actionBtns.forEach($btn => $btn.addEventListener('click', function(){
            const isConfirm = this.dataset.actionBtn === 'true' ? true : false;

            callback(isConfirm)
         }))
    }

    return { Open, Close, onSubmit }
}

export { DeleteConfirmModal, NoteModal }