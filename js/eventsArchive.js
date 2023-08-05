import { notesData } from "./data.js";
import { updateSummaryTable } from "./createSummaryTable.js";
import { archiveButtons, restoreButtons } from "./variables.js";
import { renderNotes } from "./createNote.js";

function addToArchive(event) {
	
	const rowToArchive = event.target.closest('.body-notes__row');
	const noteId = rowToArchive.dataset.id;

	const noteIndex = notesData.findIndex((note) => note.id === noteId);
	if (noteIndex !== -1) {
		const updatedNote = {
			...notesData[noteIndex],
			isArchived: true,
		};
		notesData[noteIndex] = updatedNote;
		rowToArchive.remove()
	};

	renderNotes()
	updateSummaryTable()
}

export function addArchiveButtonListeners() {
	Array.from(archiveButtons).forEach((archiveBtn) => {
		archiveBtn.addEventListener('click', addToArchive);
	});
}

export function updateArchiveButtonListeners() {
	// Видаляємо всі старі слухачі
	Array.from(archiveButtons).forEach((archiveBtn) => {
		archiveBtn.removeEventListener('click', addToArchive);
	});

	// Додаємо нові слухачі для всіх editButtons
	addArchiveButtonListeners();
}

function restoreFromArchive(event) {
	
	const rowToArchive = event.target.closest('.body-notes__row');
	const noteId = rowToArchive.dataset.id;

	const noteIndex = notesData.findIndex((note) => note.id === noteId);
	if (noteIndex !== -1) {
		const updatedNote = {
			...notesData[noteIndex],
			isArchived: false,
		};
		notesData[noteIndex] = updatedNote;
		rowToArchive.remove()
	};

	renderNotes()
	updateSummaryTable()
}

export function addRestoreButtonListeners() {
	Array.from(restoreButtons).forEach((restoreBtn) => {
		restoreBtn.addEventListener('click', restoreFromArchive);
	});
}

export function updateRestoreButtonListeners() {
	// Видаляємо всі старі слухачі
	Array.from(restoreButtons).forEach((restoreBtn) => {
		restoreBtn.removeEventListener('click', restoreFromArchive);
	});

	// Додаємо нові слухачі для всіх editButtons
	addRestoreButtonListeners();
}




