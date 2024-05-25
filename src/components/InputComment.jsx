export default function InputComment () {
  return (
    <div className='flex mb-[55%]'>
      <div className='flex items-end text-start mb-0 py-2 px-0'>
        <div className='flex-1'>
          <div className='relative flex flex-row items-end bg-[rgba(22,24,35,.12)] rounded-lg px-[9px]'>
            <input
              placeholder='Add comment...'
              className='flex-1 h-auto mt-2.5 mr-2 mb-2.5 ml-0 bg-transparent placeholder:text-[rgba(22,24,35,.75)] placeholder:text-sm leading-[17px] placeholder:absolute border-none outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
