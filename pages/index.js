import Keywords from '../components/Keywords'
import Navbar from '../components/Navbar'
import Queue from '../components/Queue'
import Setup from '../components/Setup'

export default function Home() {
	return (
		<div className='flex flex-col h-screen min-h-fit'>
			<Navbar />
			<div className='flex flex-1'>
				<div className={`flex flex-col flex-1 border-right`}>
					<Setup />
					<Keywords />
				</div>
				<div className='flex flex-1'>
					<Queue />
				</div>
			</div>
		</div>
	)
}
