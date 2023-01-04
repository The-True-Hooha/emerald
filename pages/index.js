import Link from 'next/link'
import TitleBar from '../components/titlebar/titlebar'

export default function Home() {
  return (
    <div>
      <TitleBar/>
      <div className='w-full flex justify-center'>
        <div className='py-[25%]'>
          <h2 className='justify-center flex text-lg font-semibold '>welcome</h2>
          <p className='mt-4 font-light font-mono text-[10px]'>evaluate is a text-editor with markdown capabilities, great for researchers and all..</p>

          <div className='flex justify-center pt-4'>
            <Link href="/file">
            <button className='border py-1 rounded-md px-4 bg-cyan-800 text-black hover:bg-cyan-900'>
              menu
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}