//import { appWindow } from '@tauri-apps/api/window';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { UseInterval } from '@mantine/hooks';
import windowIcon from "../../src-tauri/icons/32x32.png";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc';


export default function TitleBar(){

    const [ title, setTitle ] = useState("emerald")
    const [ windowFullScreen, setWindowFullScreen ] = useState(false)
    const [ maximizeScreen, setMaximizeScreen] = useState(false);

    const tauriAppWindow = async() => {
        const viewWindow = await import('@tauri-apps/api/window')

        const tauriWindow = UseInterval(() => {
            viewWindow.isFullscreen().then(setWindowFullScreen)
            viewWindow.setTitle().then(setTitle)
            viewWindow.isMaximized().then(setMaximizeScreen)
        }, 200)
        UseEffect(() => {
            tauriWindow.start()
            return tauriWindow.stop
        }, [])

    }

    return !windowFullScreen && <div data-tauri-drag-region className='h-[30px] bg-neutral-800 flex justify-between fixed select-none top-0 left-0 right-0 z-[1000px]'>
        <div>
            {/* app icon */}
            
            <Image className='cursor-default ml-5 align-bottom' height={16} alt='app icon' src={windowIcon}></Image>
        </div>
        <div data-tauri-drag-region inline="true" className='text-xs inline ml-5 leading-[30px]'>
            <p>{title}</p>
        </div>
        {/* //todo: add app dialog box*/}
        {/* window icons */}
        <div>
            <button title='minimize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => viewWindow.minimize()}>
                <VscChromeMinimize title='minimize' className='align-middle'/>
            </button>
            {maximizeScreen ? 
            <div title='restore down' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => viewWindow.toggleMaximize()}>
                <VscChromeRestore className='align-middle'/>
            </div> : 
            <button title='maximize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => viewWindow.toggleMaximize()}>
                <VscChromeMaximize className='align-middle'/>
            </button>
            }
            <button title='close' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' >
                <VscChromeClose className='align-middle'/>
            </button>
        </div>
    </div>
}