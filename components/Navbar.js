import styles from './navbar.module.css'

export default function Navbar() {
	return (
		<nav className={styles['navbar']}>
			<h1>Auto Answerer</h1>
			<div className='flex items-center'>
				<span className='label mr-2'>Auth token</span>
				<input type='text' placeholder='Enter auth token' />
			</div>
		</nav>
	)
}
