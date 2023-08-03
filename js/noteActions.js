import { renderNotes } from "./createNote.js";
import { notesData } from "./data.js";
import { extractDatesFromString } from "./utils.js";

//видалення однієї нотатки(рядка)
export function deleteNote(event) {
	const rowToDelete = event.target.closest('.body-notes__row');
	const noteId = rowToDelete.dataset.id;

	const noteIndex = notesData.findIndex((note) => note.id === noteId);
	if (noteIndex !== -1) {
		notesData.splice(noteIndex, 1);
		rowToDelete.remove()
	};
};

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

	const saveButton = document.createElement('button');
	saveButton.textContent = 'Save';
	saveButton.classList.add('edit-saveBtn');
	row.appendChild(saveButton);

	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cancel';
	cancelButton.classList.add('edit-cancelBtn');
	row.appendChild(cancelButton);

	cancelButton.addEventListener('click', () => {
		Array.from(columns).forEach((column, index) => {
			column.innerHTML = origrinalValues[index]
		});

		row.removeChild(saveButton);
		row.removeChild(cancelButton);
	});

	let newValue = [];
	saveButton.addEventListener('click', () => {
		Array.from(document.getElementsByClassName('edit-input')).forEach((item, index) => {
			columns[index].innerHTML = item.value
			newValue.push(item.value);
		});

		let [name, category, content] = newValue;
		let icon = row.querySelector('.icon-image')
		icon.src = `./image/${category.toLowerCase()}.svg`;


		let dates = row.querySelector('.item-dates');
		dates.innerHTML = extractDatesFromString(content)

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
		}
		console.log(notesData);

		row.removeChild(saveButton);
		row.removeChild(cancelButton);

	})

}
