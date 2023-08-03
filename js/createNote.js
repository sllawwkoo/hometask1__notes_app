import { notesData } from "./data.js";
import { bodyNotes, noteName, noteCategory, noteContent, deleteButtons, editButtons, saveNoteBtn } from "./variables.js";
import { getCurrentFormattedDate, generateRandomId, extractDatesFromString } from "./utils.js";
import { clearVisibileModal } from "./modal.js";
import { deleteNote } from "./noteActions.js";
import { editNote } from "./noteActions.js";

function createNoteRow(noteData) {
	const { id, icon, name, created, category, content, dates } = noteData;

	return `
    <div class="body-notes__row row-notes" data-id="${id}">
      <div class="row-notes__item item-icon">
        <img class="icon-image" src="${icon}" alt="icon">
      </div>
      <div class="row-notes__item item-edit item-name">${name}</div>
      <div class="row-notes__item item-created">${created}</div>
      <div class="row-notes__item item-edit item-category">${category}</div>
      <div class="row-notes__item item-edit item-content">${content}</div>
      <div class="row-notes__item item-dates">${dates}</div>
      <div class="row-notes__item item-icons">
         <div class="item-icons__edit">
            <img src="./image/edit.svg" alt="edit">
         </div>
         <div class="item-icons__archive">
            <img src="./image/archive.svg" alt="archive">
         </div>
         <div class="item-icons__delete">
            <img src="./image/delete.svg" alt="delete">
         </div>
      </div>
    </div>
  `;
};

export function renderNotes(dataArray = notesData) {
	dataArray.forEach((noteData) => {
		const noteRow = createNoteRow(noteData);
		bodyNotes.insertAdjacentHTML('beforeend', noteRow)
	});
}

export function saveNewNote() {

	const newNoteData = {
		id: generateRandomId(),
		icon: `./image/${noteCategory.value.toLowerCase()}.svg`,
		name: noteName.value,
		created: getCurrentFormattedDate(),
		category: noteCategory.value,
		content: noteContent.value,
		dates: extractDatesFromString(noteContent.value),
	};

	notesData.push(newNoteData);
	renderNotes([newNoteData]);
	clearVisibileModal()
	console.log(notesData);

	Array.from(deleteButtons).forEach((deleteBtn) => {
		deleteBtn.addEventListener('click', deleteNote);
	});

	Array.from(editButtons).forEach((editBtn) => {
		editBtn.addEventListener('click', (event) => {
			const row = event.target.closest('.body-notes__row');
			editNote(row);
		});
	});

	saveNoteBtn.disabled = true;
}