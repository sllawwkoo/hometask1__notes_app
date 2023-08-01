import { bodyNotes } from "./variables.js";

export const notesData = [
	{
		id: 1,
		icon: './image/task.svg',
		name: 'Shopping list',
		created: 'April 20,2021',
		category: 'Task',
		content: 'Tomatoes, bread',
		dates: ''
	},
	{
		id: 2,
		icon: './image/random thought.svg',
		name: 'The theory of evolution',
		created: 'April 27,2021',
		category: 'Randon Thought',
		content: 'The evolution is great',
		dates: ''
	},
	{
		id: 3,
		icon: './image/idea.svg',
		name: 'New Feature',
		created: 'May 05,2021',
		category: 'Idea',
		content: 'Im gonna have a dentist appointment on the 3/5/2021,I moved it from 5/5/2021',
		dates: '3/5/2021, 5/5/2021'
	},
	{
		id: 4,
		icon: './image/quote.svg',
		name: 'William Gaddis',
		created: 'May 07,2021',
		category: 'Quote',
		content: 'Power doesnt corrupt people; people corrupt power',
		dates: ''
	},
	{
		id: 5,
		icon: './image/task.svg',
		name: 'Books',
		created: 'May 15,2021',
		category: 'Task',
		content: 'The Lean Startup',
		dates: ''
	},
];

function createNoteRow(noteData) {
   const{ icon, name, created, category, content, dates } = noteData;

   return `
    <div class="body-notes__row row-notes">
      <div class="row-notes__item item-icon">
        <img src="${icon}" alt="icon">
      </div>
      <div class="row-notes__item item-name">${name}</div>
      <div class="row-notes__item item-created">${created}</div>
      <div class="row-notes__item item-category">${category}</div>
      <div class="row-notes__item item-content">${content}</div>
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

export function renderNotes() {
	notesData.forEach((noteData) => {
		const noteRow = createNoteRow(noteData);
		bodyNotes.insertAdjacentHTML('beforeend', noteRow)
	});
}

