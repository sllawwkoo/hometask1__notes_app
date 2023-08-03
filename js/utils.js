export function getCurrentFormattedDate() {
	const months = [
	  "January", "February", "March", "April", "May", "June", "July",
	  "August", "September", "October", "November", "December"
	];
 
	const currentDate = new Date();
	const month = months[currentDate.getMonth()];
	const day = currentDate.getDate();
	const year = currentDate.getFullYear();
 
	return `${month} ${day.toString().padStart(2, '0')},${year}`;
 };

export function generateRandomId() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let id = '';
 
	for (let i = 0; i < 6; i++) {
	  const randomIndex = Math.floor(Math.random() * characters.length);
	  id += characters[randomIndex];
	}
 
	return id;
 };

export function extractDatesFromString(sentence) {
	const dateRegex = /(\d{1,2}(\.|\/)\d{1,2}(\.|\/)\d{2,4})/g;
	const datesArray = sentence.match(dateRegex);
	const datesString = datesArray ? datesArray.join(", ") : ""; // Об'єднуємо знайдені дати через кому, якщо є, або повертаємо пустий рядок
 
	return datesString;
 }