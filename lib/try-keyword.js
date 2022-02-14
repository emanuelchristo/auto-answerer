export async function tryKeyword() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ correct: false })
		}, 500)
	})
}
