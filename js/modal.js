import { modal, noteName, noteCategory, noteContent, saveNoteBtn } from "./variables.js";

export function visibileModal() {
	modal.classList.add('active');
}

export function clearVisibileModal() {
	noteName.value = '';
	noteCategory.value = '';
	noteContent.value = '';
	modal.classList.remove('active')
}

export function checkFieldsAndToggleSaveBtn() {
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