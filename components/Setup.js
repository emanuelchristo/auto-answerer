import styles from './setup.module.css'

export default function Setup() {
	return (
		<div className={styles['setup']}>
			<h2 className=' mb-4'>Setup</h2>
			<div className='flex items-end'>
				<div className='flex flex-col flex-1 mr-3'>
					<span className='label mb-2'>Webpage URL</span>
					<input type='text' placeholder='Enter webpage URL' />
				</div>
				<div className='flex flex-col flex-1 mr-3'>
					<span className='label mb-2'>CSS selectors</span>
					<input type='text' placeholder='Enter CSS selectors' />
				</div>
				<button>Submit</button>
			</div>
		</div>
	)
}
