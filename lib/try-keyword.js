export function tryKeyword(keyword, authToken, delay) {
	return new Promise((resolve, reject) => {
		console.log('TRYING: ' + keyword)
		setTimeout(() => {
			fetch('https://excelplay-backend-kryptos-7lwulr4nvq-el.a.run.app/api/submit', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: authToken,
				},
				method: 'POST',
				body: JSON.stringify({
					answer: keyword,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					if (data.error) throw new Error('authToken')
					if (data.answer === 'wrong') resolve({ correct: false })
					else resolve({ correct: true })
				})
				.catch((err) => {
					console.error(err)
					reject(err)
				})
		}, delay)
	})
}
