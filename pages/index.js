import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { scrapeKeywords } from '../lib/scrape-keywords'
import { ToastContainer, toast } from 'react-toastify'
import { player } from '../lib/player'
import Head from 'next/head'
import Keywords from '../components/Keywords'
import Navbar from '../components/Navbar'
import Queue from '../components/Queue'
import Setup from '../components/Setup'
import Correct from '../components/Correct'

export default function Home() {
	const [reRender, setReRender] = useState(false)

	const [queueKeywords, setQueueKeywords] = useState([])
	const [setupKeywords, setSetupKeywords] = useState([])

	const [authToken, setAuthToken] = useState('')
	const [url, setUrl] = useState('')
	const [cssSelectors, setCssSelectors] = useState('')

	const [delay, setDelay] = useState(0)
	const [correct, setCorrect] = useState('')
	const [playing, setPlaying] = useState(false)
	const [trying, setTrying] = useState('')
	const [elapsed, setElapsed] = useState(0)
	const [remaining, setRemaining] = useState(0)

	useEffect(() => {
		let aTkn = window?.localStorage?.getItem('authToken')
		setAuthToken(aTkn || '')

		player.onChange(onPlayerChange)
		player.onAddKeywords(onPlayerAddKeyword)
		player.onCorrect(onPlayerCorrect)
		player.onPlay(onPlayerPlay)
		player.onPause(onPlayerPause)
		player.onStop(onPlayerStop)
		player.onReset(onPlayerReset)
		player.onDelete(onPlayerDelete)
	}, [])
	useEffect(() => {
		player.setAuthToken(authToken)
		if (window) window.localStorage.setItem('authToken', authToken)
	}, [authToken])
	useEffect(() => {
		player.setDelay(delay)
	}, [delay])
	useEffect(() => {
		if (correct) toast.success(`Correct: ${correct}`)
	}, [correct])

	// Setup handlers
	function handleScrapeKeywords() {
		let scrape = scrapeKeywords(url, cssSelectors).then((keywords) => {
			let temp = keywords.map((item) => ({
				id: uuidv4(),
				keyword: item,
			}))
			setSetupKeywords(temp)
		})
		toast.promise(scrape, {
			pending: 'Scrapping keywords 🛠',
			success: 'Keywords scraped',
			error: 'Failed to scrape webpage ❗️',
		})
	}
	function handleAdd(keyword) {
		if (!keyword) return
		setSetupKeywords((setupKeywords) => [{ id: uuidv4(), keyword: keyword }, ...setupKeywords])
	}
	function handleSetupReset() {
		setSetupKeywords([])
	}
	function handleSetupDelete(id) {
		setSetupKeywords((setupKeywords) => setupKeywords.filter((item) => item.id !== id))
	}

	function handleAddToQueue() {
		const temp = setupKeywords.map((item) => {
			return { ...item, status: 'pending' }
		})
		player.setKeywords(temp)
		setSetupKeywords([])
	}

	// player handlers
	function onPlayerChange({ status, index, keyword }) {
		// setQueueKeywords(player.getKeywords())
		setTrying(player.getTryingKeyword().keyword)
	}
	function onPlayerAddKeyword() {
		// setQueueKeywords(player.getKeywords())
	}
	function onPlayerPlay() {
		setPlaying(true)
	}
	function onPlayerPause() {
		setPlaying(false)
	}
	function onPlayerStop() {
		setPlaying(false)
		setTrying('')
		// setQueueKeywords(player.getKeywords())
	}
	function onPlayerReset() {
		setTrying('')
		setReRender((reRender) => !reRender)
		// setQueueKeywords(player.getKeywords())
	}
	function onPlayerDelete() {
		// setQueueKeywords(player.getKeywords())
	}
	function onPlayerCorrect() {}

	// Queue Handlers
	function handlePlayPause() {
		if (playing) player.pause()
		else player.play()
	}
	function handleStop() {
		player.stop()
	}
	function handleQueueReset() {
		player.reset()
	}
	function handleQueueDelete(id) {
		player.delete(id)
	}

	function pageTitle() {
		if (correct) return `Correct: ${correct}`
		// if (queueKeywords.length != 0) return `Auto Answerer  ${triedCount()}/${queueKeywords.length}`
		// if (queueAllTried()) return `Auto Answerer - All tried`
		return 'Auto Answerer'
	}

	return (
		<div className='flex flex-col h-screen min-h-fit'>
			<Head>
				<title>{pageTitle()}</title>
			</Head>
			<Navbar authToken={authToken} onAuthToken={setAuthToken} />
			<div className='flex flex-1'>
				<div className={`flex flex-col flex-1 border-right`}>
					<Setup
						url={url}
						cssSelectors={cssSelectors}
						onUrl={setUrl}
						onCssSelectors={setCssSelectors}
						onSubmit={handleScrapeKeywords}
					/>
					<Keywords
						keywords={setupKeywords}
						onAdd={handleAdd}
						onAddToQueue={handleAddToQueue}
						onReset={handleSetupReset}
						onDelete={handleSetupDelete}
					/>
				</div>
				<div className='flex flex-col flex-1'>
					{correct && <Correct keyword={correct} onClose={() => setCorrect('')} />}
					<Queue
						keywords={queueKeywords}
						triedCount={player.getCompleteCount()}
						totalCount={player.getTotalCount()}
						playing={playing}
						trying={trying}
						elapsed={elapsed}
						remaining={remaining}
						onPlayPause={handlePlayPause}
						onStop={handleStop}
						onReset={handleQueueReset}
						onDelete={handleQueueDelete}
					/>
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}
