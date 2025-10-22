const CustomAvatar = ({ name }: { name: string }) => {
  return (
    <div className='w-full h-full bg-[#39C6F1] rounded-full flex justify-center items-center'>
      <span className='font-bold'>
        {name ? name[0].toLocaleUpperCase() : '?'.toLocaleUpperCase()}
      </span>
    </div>
  )
}

export default CustomAvatar
