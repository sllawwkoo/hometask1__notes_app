import { notesData } from "./data.js";
import { bodyNotes, noteName, noteCategory, noteContent, saveNoteBtn, archiveButton } from "./variables.js";
import { getCurrentFormattedDate, generateRandomId, extractDatesFromString } from "./utils.js";
import { clearVisibileModal } from "./modal.js";
import { updateEditButtonListeners, updateDeleteButtonListeners } from "./noteActions.js";
import { updateSummaryTable } from "./createSummaryTable.js";
import { updateArchiveButtonListeners, updateRestoreButtonListeners } from "./eventsArchive.js";

function createNoteRow(noteData) {
	const { id, icon, name, created, category, content, dates, isArchived } = noteData;

	return `
    <div class="body-notes__row row-notes ${isArchived ? 'archived' : ''}" data-id="${id}">
      <div class="row-notes__item item-icon">
        <img class="icon-image" src="${icon}" alt="icon">
      </div>
      <div class="row-notes__item item-edit item-name">${name}</div>
      <div class="row-notes__item item-created">${created}</div>
      <div class="row-notes__item item-edit item-category">${category}</div>
      <div class="row-notes__item item-edit item-content">${content}</div>
      <div class="row-notes__item item-dates">${dates}</div>
		${!isArchived ? (
			`<div class="row-notes__item item-icons">
         <div class="item-icons__edit">
            <img src="./image/edit.svg" alt="edit">
         </div>
         <div class="item-icons__archive">
            <img src="./image/archive.svg" alt="archive">
         </div>
         <div class="item-icons__delete">
            <img src="./image/delete.svg" alt="delete">
         </div>
      </div>`
		) : (
			`<button type="button" class='btn-restore'>Restore</button>`
		)}
    </div>
		
  `;
};

// Змінна, яка вказує на те, чи відображаються заархівовані нотатки чи ні
let showArchivedNotes = false;

export function addToggleShowArchivedListener() {
	archiveButton.addEventListener('click', toggleShowArchivedNotes)
}

function toggleShowArchivedNotes() {
	// Переключаємо змінну при кожному кліку на кнопку "Архів"
	showArchivedNotes = !showArchivedNotes;
	// Викликаємо функцію рендерингу нотаток, щоб оновити відображення
	renderNotes();
}

export function renderNotes() {
	bodyNotes.innerHTML = '';

	if (!showArchivedNotes) {
		const nonArchivedNotes = notesData.filter((noteData) => noteData.isArchived === false);
		nonArchivedNotes.forEach((noteData) => {
			const noteRow = createNoteRow(noteData);
			bodyNotes.insertAdjacentHTML('beforeend', noteRow)
		});
	} else {
		notesData.forEach((noteData) => {
			const noteRow = createNoteRow(noteData);
			bodyNotes.insertAdjacentHTML('beforeend', noteRow)
		});
	}

	updateEditButtonListeners()
	updateDeleteButtonListeners()
	updateArchiveButtonListeners()
	updateRestoreButtonListeners()
}



export function saveNewNote() {

	const newNoteData = {
		id: generateRandomId(),
		isArchived: false,
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

	updateEditButtonListeners()
	updateDeleteButtonListeners()
	updateArchiveButtonListeners()

	updateSummaryTable()

	saveNoteBtn.disabled = true;
};

