import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Keywords from '../components/Keywords'
import Navbar from '../components/Navbar'
import Queue from '../components/Queue'
import Setup from '../components/Setup'

export default function Home() {
	const [queueKeywords, setQueueKeywords] = useState([
		{ id: uuidv4(), keyword: 'hola', status: 'tried' },
		{ id: uuidv4(), keyword: 'bonjur', status: 'trying' },
		{ id: uuidv4(), keyword: 'oi', status: 'pending' },
	])

	const [setupKeywords, setSetupKeywords] = useState([
		{ id: uuidv4(), keyword: 'hello' },
		{ id: uuidv4(), keyword: 'hola' },
		{ id: uuidv4(), keyword: 'bonjur' },
		{ id: uuidv4(), keyword: 'oi' },
	])

	const [playing, setPlaying] = useState(false)
	const [trying, setTrying] = useState('')
	const [elapsed, setElapsed] = useState(5)
	const [remaining, setRemaining] = useState(1160)

	function handleQueueDelete(id) {
		const temp = queueKeywords.filter((item) => item.id !== id)
		setQueueKeywords(temp)
	}
	function handleSetupDelete(id) {
		const temp = setupKeywords.filter((item) => item.id !== id)
		setSetupKeywords(temp)
	}
	function handleAdd(keyword) {
		if (!keyword) return
		const temp = [{ id: uuidv4(), keyword: keyword }, ...setupKeywords]
		setSetupKeywords(temp)
	}
	function handleAddToQueue() {
		const temp = setupKeywords.map((item) => {
			return { id: item.id, keyword: item.keyword, status: 'pending' }
		})
		setQueueKeywords([...queueKeywords, ...temp])
		setSetupKeywords([])
	}

	function handlePlayPause() {
		setPlaying((playing) => !playing)
	}
	function handleStop() {
		setPlaying(false)
	}
	function handleQueueReset() {
		setQueueKeywords([])
	}

	return (
		<div className='flex flex-col h-screen min-h-fit'>
			<Navbar />
			<div className='flex flex-1'>
				<div className={`flex flex-col flex-1 border-right`}>
					<Setup />
					<Keywords
						keywords={setupKeywords}
						onAdd={handleAdd}
						onAddToQueue={handleAddToQueue}
						onReset={() => setSetupKeywords([])}
						onDelete={handleSetupDelete}
					/>
				</div>
				<div className='flex flex-1'>
					<Queue
						keywords={queueKeywords}
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
		</div>
	)
}
