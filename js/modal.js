import { modal, noteName, noteCategory, noteContent, createNote, saveNoteBtn, cancelSaveNoteBtn } from "./variables.js";
import { saveNewNote } from "./createNote.js";

function visibileModal() {
	modal.classList.add('active');
}

export function clearVisibileModal() {
	noteName.value = '';
	noteCategory.value = '';
	noteContent.value = '';
	modal.classList.remove('active')
}

function checkFieldsAndToggleSaveBtn() {
	const isAllFieldsFilled =
		noteName.value.trim() !== "" &&
		noteCategory.value.trim() !== "" &&
		noteContent.value.trim() !== "";

	saveNoteBtn.disabled = !isAllFieldsFilled;

	// Підсвічуємо поля червоним коліром якщо вони не заповнені
	noteName.style.border = noteName.value.trim() === "" ? "1px solid red" : "1px solid #ccc";
	noteCategory.style.border = noteCategory.value.trim() === "" ? "1px solid red" : "1px solid #ccc";
	noteContent.style.border = noteContent.value.trim() === "" ? "1px solid red" : "1px solid #ccc";
}

export function initModalEventListeners() {

	createNote.addEventListener('click', visibileModal);

	noteName.addEventListener("input", checkFieldsAndToggleSaveBtn);
	noteCategory.addEventListener("change", checkFieldsAndToggleSaveBtn);
	noteContent.addEventListener("input", checkFieldsAndToggleSaveBtn);

	cancelSaveNoteBtn.addEventListener('click', clearVisibileModal);
	saveNoteBtn.addEventListener('click', saveNewNote);
}