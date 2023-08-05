import { renderNotes } from "./createNote.js";
import { notesData } from "./data.js";
import { editButtons, deleteButtons } from "./variables.js";
import { extractDatesFromString } from "./utils.js";
import { updateSummaryTable } from "./createSummaryTable.js";

//видалення однієї нотатки(рядка)
function deleteNote(event) {
	const rowToDelete = event.target.closest('.body-notes__row');
	const noteId = rowToDelete.dataset.id;

	const noteIndex = notesData.findIndex((note) => note.id === noteId);
	if (noteIndex !== -1) {
		notesData.splice(noteIndex, 1);
		rowToDelete.remove()
	};

	renderNotes()
	updateSummaryTable()
};

export function addDeleteButtonListeners() {
	Array.from(deleteButtons).forEach((deleteBtn) => {
		deleteBtn.addEventListener('click', deleteNote);
	});
}

export function updateDeleteButtonListeners() {
	// Видаляємо всі старі слухачі
	Array.from(deleteButtons).forEach((deleteBtn) => {
		deleteBtn.removeEventListener('click', deleteNote);
	});

	// Додаємо нові слухачі для всіх editButtons
	addDeleteButtonListeners();
}


//редагування нотатки(рядка)
export function editNote(row) {
	const columns = row.getElementsByClassName('item-edit');

	const origrinalValues = Array.from(columns).map((column) => column.textContent.trim());

	const categoryOptions = ["Task", "Random Thought", "Idea", "Quote"];

	Array.from(columns).forEach((column, index) => {
		const value = origrinalValues[index];
		if (index === 1) {
			const selectOptions = categoryOptions.map((option) => {
				return `<option value="${option}" ${option === value ? "selected" : ""}>${option}</option>`;
			});
			column.innerHTML = `<select class="edit-input" name="Category">${selectOptions.join("")}</select>`;
		} else {
			column.innerHTML = `<input class="edit-input" type="text" value="${value}">`;
		}
	});

	const saveButton = createButton('Save', ['edit-saveBtn'], row, onSaveButtonClick);
	const cancelButton = createButton('Cancel', ['edit-cancelBtn'], row, onCancelButtonClick);

	function onCancelButtonClick() {
		Array.from(columns).forEach((column, index) => {
			column.innerHTML = origrinalValues[index]
		});

		row.removeChild(saveButton);
		row.removeChild(cancelButton);
	};

	function onSaveButtonClick() {
		let newValue = [];
		Array.from(document.getElementsByClassName('edit-input')).forEach((item, index) => {
			columns[index].innerHTML = item.value
			newValue.push(item.value);
		});

		let [name, category, content] = newValue;

		const noteId = row.dataset.id;
		const noteIndex = notesData.findIndex((note) => note.id === noteId);
		if (noteIndex !== -1) {
			const updatedNote = {
				...notesData[noteIndex],
				icon: `./image/${category.toLowerCase()}.svg`,
				name: name,
				category: category,
				content: content,
				dates: extractDatesFromString(content),
			};
			notesData[noteIndex] = updatedNote;
			renderNotes()
			updateSummaryTable()
		}

		row.removeChild(saveButton);
		row.removeChild(cancelButton);
	};

	updateSummaryTable()
};

function createButton(text, classes, parent, clickHandler) {
	const button = document.createElement('button');
	button.textContent = text;
	button.classList.add(...classes);
	parent.appendChild(button);
	button.addEventListener('click', clickHandler);
	return button;
};

export function addEditButtonListeners() {
	Array.from(editButtons).forEach((editBtn) => {
		editBtn.addEventListener('click', handleEditButtonClick);
	});
}

export function updateEditButtonListeners() {
	// Видаляємо всі старі слухачі
	Array.from(editButtons).forEach((editBtn) => {
		editBtn.removeEventListener('click', handleEditButtonClick);
	});

	// Додаємо нові слухачі для всіх editButtons
	addEditButtonListeners();
}

function handleEditButtonClick(event) {
	const row = event.target.closest('.body-notes__row');
	editNote(row);
}