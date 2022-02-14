import { IoMdAddCircle, IoMdRefresh } from 'react-icons/io'
import Empty from './Empty'
import styles from './keywords.module.css'

export default function Keywords() {
	return (
		<div className={styles['keywords']}>
			<div className='flex items-center mb-4'>
				<h2 className='mr-3'>Keywords</h2>
				<div className={styles['num-wrapper']}>0</div>
			</div>

			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center'>
					<input type='text' placeholder='Enter keyword' />
					<button className='ml-3'>Add</button>
				</div>

				<div className='flex items-center'>
					<button className='btn-pink mr-3'>
						<IoMdAddCircle className='text-lg mr-1' />
						<span>Queue</span>
					</button>
					<button className='btn-circle btn-grey'>
						<IoMdRefresh className='text-xl' />
					</button>
				</div>
			</div>

			<Empty />
		</div>
	)
}
