
function padZero(str: string | number) {
	return String(str).padStart(2, '0')
}

// Date object => '2024-03-21 21:59:12'
export function toSimpleDateTime(date: Date) {
	const year = date.getFullYear()
	const month = padZero(date.getMonth() + 1)
	const day = padZero(date.getDate())
	const hour = padZero(date.getHours())
	const minute = padZero(date.getMinutes())
	const second = padZero(date.getSeconds())
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
