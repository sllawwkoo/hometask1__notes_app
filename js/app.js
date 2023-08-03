import { deleteNote, editNote } from "./noteActions.js";
import { createNote, cancelSaveNoteBtn, saveNoteBtn, deleteButtons, editButtons } from "./variables.js";
import { renderNotes, saveNewNote } from "./createNote.js";
import { visibileModal, clearVisibileModal, checkFieldsAndToggleSaveBtn } from "./modal.js";
import { notesData } from "./data.js";

renderNotes();

createNote.addEventListener('click', visibileModal);

cancelSaveNoteBtn.addEventListener('click', clearVisibileModal);

noteName.addEventListener("input", checkFieldsAndToggleSaveBtn);
noteCategory.addEventListener("change", checkFieldsAndToggleSaveBtn);
noteContent.addEventListener("input", checkFieldsAndToggleSaveBtn);


saveNoteBtn.addEventListener('click', saveNewNote);

Array.from(deleteButtons).forEach((deleteBtn) => {
	deleteBtn.addEventListener('click', deleteNote);
});

Array.from(editButtons).forEach((editBtn) => {
	editBtn.addEventListener('click', (event) => {
		const row = event.target.closest('.body-notes__row');
		editNote(row);
	});
});

