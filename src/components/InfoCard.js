function InfoCard(props) {
  

  return (
    <div className='bg-white p-3 mb-4 rounded-md flex justify-between items-center flex-1 lg:mx-2 shadow-sm'>
        <div className='text-left pr-4'>
            <h3 className='font-medium text-sm'>{props.headingText}</h3>
            <p className='font-medium text-2xl'>{props.stat}</p>
        </div>
        <div className='h-full flex justify-center items-center'>
            <i className={`${props.iconClass} px-2 py-1 bg-primary-gradient text-xl text-white rounded`}></i>
        </div>
    </div>
  )
}

export default InfoCard;