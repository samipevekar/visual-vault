const ConversationSkeleton = () => {
  return (
    <>
      	<div className='flex gap-3 items-center my-3'>
			<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
		</div>
    </>
  )
}

export default ConversationSkeleton;
