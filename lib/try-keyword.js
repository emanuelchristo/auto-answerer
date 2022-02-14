export function tryKeyword(keyword, authToken, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/try-keyword`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					keyword,
					authToken,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) reject(new Error('authToken'))
					else resolve(data)
				})
				.catch(reject)
		}, delay)
	})
}
