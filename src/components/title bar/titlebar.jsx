import { appWindow } from '@tauri-apps/api/window'
import { useState, useEffect } from 'react'
import { useInterval } from '@mantine/hooks'
import appIcon from '../../../src-tauri/icons/32x32.png'
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc'

export default function CustomTitleBar(){
    const [ title, setTitle] = useState("emerald")
    const [ windowFullscreen, setWindowFullscreen ] = useState(false)
    const [maximizeScreen, setMaximizeScreen ] = useState(false)

    const tauriWindow = useInterval(() => {
        appWindow.isFullscreen().then(setWindowFullscreen)
        appWindow.setTitle().then(setTitle)
        appWindow.isMaximized().then(setMaximizeScreen)
    }, 200)

    useEffect(() => {
        tauriWindow.start()
        return tauriWindow.stop
    }, [])

    return !windowFullscreen && <div data-tauri-drag-region className='h-[30px] bg-black flex justify-between fixed select-none top-0 left-0 text-white right-0 z-[1000px]'>
        <div>
            {/* app icon */}
            <img className='cursor-default ml-5 mt-1 w-[23px] align-bottom' height={15} src={appIcon} alt="tauri app icon"/>
        </div>
        <div data-tauri-drag-region inline className='text-xs inline ml-5 leading-[30px]'>
            {title}
        </div>
        {/* //todo: add app dialog boc */}
        {/* window icons */}
        <div data-tauri-drag-region className='h-full items-center'>
            <div title='minimize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.minimize()}>
                <VscChromeMinimize title='minimize' className='align-middle cursor-pointer'/>
            </div>
            {maximizeScreen ? 
            <div title='restore down' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.maximize()}>
                <VscChromeRestore className='align-middle cursor-pointer'/>
            </div> : 
            <div title='maximize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.toggleMaximize()}>
                <VscChromeMaximize className='align-middle cursor-pointer'/>
            </div>    
        }
            <div title='close' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-red-600 active:bg-slate-50' onClick={() => appWindow.close()}>
                <VscChromeClose className='align-middle cursor-pointer'/>
            </div>
        </div>
    </div>
}