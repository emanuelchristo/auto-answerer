import { tryKeyword } from './try-keyword'

class Player {
	keywords = []
	authToken = ''
	delay = 0
	playing = false
	i = 0

	onChangeHandler = () => {}
	onAddKeywordsHandler = () => {}
	onPlayHandler = () => {}
	onPauseHandler = () => {}
	onStopHandler = () => {}
	onResetHandler = () => {}
	onDeleteHandler = () => {}
	onCorrectHandler = () => {}

	constructor() {}

	setKeywords = (keywords) => {
		this.keywords = keywords
		this.i = 0
		this.onAddKeywordsHandler()
	}
	setAuthToken = (authToken) => (this.authToken = authToken)
	setDelay = (delay) => (this.delay = delay)

	getCompleteCount = () => this.i
	getTotalCount = () => this.keywords.length
	getTryingKeyword = () => this.keywords[this.i] || { keyword: '' }
	getKeywords = () => this.keywords.filter((item) => true)

	onChange = (handler) => (this.onChangeHandler = handler)
	onAddKeywords = (handler) => (this.onAddKeywordsHandler = handler)
	onPlay = (handler) => (this.onPlayHandler = handler)
	onPause = (handler) => (this.onPauseHandler = handler)
	onStop = (handler) => (this.onStopHandler = handler)
	onReset = (handler) => (this.onResetHandler = handler)
	onDelete = (handler) => (this.onDeleteHandler = handler)
	onCorrect = (handler) => (this.onCorrectHandler = handler)

	stop = () => {
		this.playing = false
		for (let keyword of this.keywords) keyword.status = 'pending'
		this.i = 0
		this.onStopHandler()
	}
	pause = () => {
		this.playing = false
		this.onPauseHandler(this.i, this.getCompleteCount())
	}
	reset = () => {
		this.playing = false
		this.keywords = []
		this.i = 0
		this.onResetHandler()
	}
	delete = (id) => {
		this.keywords = this.keywords.filter((item) => item.id !== id)
		this.onDeleteHandler()
	}

	play = async () => {
		this.playing = true
		this.onPlayHandler()
		for (; this.i < this.keywords.length && this.playing; this.i++) {
			this.keywords[this.i].status = 'trying'
			let curr = this.keywords[this.i]
			this.onChangeHandler({ status: 'trying', index: this.i, keyword: curr })
			try {
				console.log(`Trying: ${curr.keyword}`)
				let res = await tryKeyword(curr.keyword, this.authToken, this.delay)
				if (this.playing) {
					this.keywords[this.i].status = 'tried'
					if (this.i === this.keywords.length - 1) this.i++
					this.onChangeHandler({ status: 'tried', index: this.i, keyword: curr })
					if (res.correct) {
						console.log(`CORRECT ANSWER: ${curr.keyword}`)
						this.onCorrectHandler(curr)
						this.playing = false
						this.onPauseHandler(this.i, this.getCompleteCount())
					}
				}
			} catch (err) {
				console.log(err)
				if (err.message === 'authToken') this.onChangeHandler({ error: 'authToken' })
				else this.onChangeHandler({ error: 'failed' })
				this.playing = false
				this.onPauseHandler(this.i, this.getCompleteCount())
			}
		}
	}
}

const player = new Player()

export { Player, player }
