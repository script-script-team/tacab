import Logo from './ui/Logo'

function Footer() {
  return (
    <div className='w-full p-6 text-white bg-gray-900 backdrop-blur-3xl'>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='flex gap-2 items-center space-y-2'>
          <Logo />
          <h2 className='text-sm'>Tacab collage</h2>
        </div>
        <h2 className='hover:text-gray-300 text-sm sm:text-right'>
          Developed by:{' '}
          <a href='https://wa.me/+252634541983' target='_blank'>
            <span className='text-blue-500 dark:text-blue-400'>
              Script Squad
            </span>
          </a>
        </h2>
        <h2 className='text-sm'>
          Tacab © {new Date().getFullYear()} All rights reserved.
        </h2>
        <h2 className='hover:text-gray-300 text-sm sm:text-right'>
          Call center:{' '}
          <a href='https://wa.me/+252634541983' target='_blank'>
            <span className='text-blue-500 dark:text-blue-400'>
              +252 63 4541983
            </span>
          </a>{' '}
          /{' '}
          <a href='https://wa.me/+252637287178' target='_blank'>
            {' '}
            <span className='text-blue-500 dark:text-blue-400'>
              +252 63 7287178
            </span>
          </a>
        </h2>
      </div>
    </div>
  )
}

export default Footer
