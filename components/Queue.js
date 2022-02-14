import { IoMdPlay, IoMdRefresh } from 'react-icons/io'
import { MdStop } from 'react-icons/md'
import List from './List'
import styles from './queue.module.css'

export default function Queue({ keywords, onDelete }) {
	return (
		<div className={styles['queue']}>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center'>
					<h2 className='mr-3'>Queue</h2>
					<div className='num-wrapper'>{keywords.length}</div>
				</div>

				<div className='flex items-center'>
					<div className='flex flex-col items-end mr-8'>
						<span className='label'>~ Remaining</span>
						<p className=' tracking-wider'>
							{/* <span className='font-semibold ml-1'>3</span>
							<span className='text-grey'>min</span> */}
							<span className='font-semibold ml-1'>25</span>
							<span className='text-grey'>s</span>
						</p>
					</div>
					<div className='flex flex-col items-end'>
						<span className='label'>Time elapsed</span>
						<p className=' tracking-wider'>
							<span className='font-semibold ml-1'>3</span>
							<span className='text-grey'>min</span>
							<span className='font-semibold ml-1'>5</span>
							<span className='text-grey'>s</span>
						</p>
					</div>
				</div>
			</div>

			<div className='flex items-center justify-between mb-4'>
				<div className={styles['trying']}>
					<div className={styles['trying-keyword']}>
						<span className={styles['trying-placeholder']}>Trying...</span>
					</div>
					<div className={styles['trying-count-wrapper']}>{`${
						keywords.filter((item) => item.status === 'tried').length
					} / ${keywords.length}`}</div>
				</div>
				<div className='flex items-center'>
					<button className='btn-circle btn-blue mr-2'>
						<IoMdPlay className='text-lg ml-[0.2rem]' />
					</button>
					<button className='btn-circle btn-grey mr-2'>
						<MdStop className='text-2xl' />
					</button>
					<button className='btn-circle btn-grey'>
						<IoMdRefresh className='text-xl' />
					</button>
				</div>
			</div>

			<List keywords={keywords} onDelete={onDelete} />
		</div>
	)
}
