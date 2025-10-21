const Badge = ({ text }: { text: string }) => {
  return (
    <div className='bg-gray-100 dark:bg-gray-800 w-fit px-3 py-[3px] rounded-full'>
      {text}
    </div>
  )
}

export default Badge
