import { notesData } from "./data.js";
import { bodySummaryTable } from "./variables.js";

function createSumRow(iconSrc, category, activeCount, archivedCount) {
	return `
	<div class="body-sum__row row-sum">
		 <div class="row-sum__item sum-icon">
			  <img src="${iconSrc}" alt="icon">
		 </div>
		 <div class="row-sum__item sum-category">${category}</div>
		 <div class="row-sum__item sum-active">${activeCount}</div>
		 <div class="row-sum__item sum-archived">${archivedCount}</div>
	</div>
`;
};

export function updateSummaryTable() {
	// Очистити таблицю перед оновленням
	bodySummaryTable.innerHTML = "";

	const categoryOptions = ["Task", "Random Thought", "Idea", "Quote"];

	// Пройтися по кожній категорії і додати відповідний рядок до таблиці
	categoryOptions.forEach((category) => {
		 const iconSrc = `./image/${category.toLowerCase()}.svg`;

		 // Підрахувати кількість активних та архівованих нотаток для цієї категорії
		 const activeCount = notesData.filter((note) => note.category === category && !note.isArchived).length;
		 const archivedCount = notesData.filter((note) => note.category === category && note.isArchived).length;

		 // Створити рядок для категорії та додати його до таблиці якщо хоть одна умова не дорівнює нулю
		 if(activeCount !== 0 || archivedCount !== 0 ) {
			const row = createSumRow(iconSrc, category, activeCount, archivedCount);
			bodySummaryTable.insertAdjacentHTML('beforeend', row);
		 }
	});
};

