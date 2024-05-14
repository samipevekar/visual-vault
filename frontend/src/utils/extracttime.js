export function extractTime(dateString) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	const amOrPm = hours >= 12 ? "pm" : "am";
	return `${hours}:${minutes}${" "}${amOrPm}`;

}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
	return number.toString().padStart(2, "0");
}
