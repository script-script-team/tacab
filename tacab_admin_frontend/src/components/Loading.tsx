import { SyncLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center'>
      <SyncLoader color='#39C6F1' />
    </div>
  )
}

export default Loading
