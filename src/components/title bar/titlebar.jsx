import { useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc'
import appIcon from '../../../src-tauri/icons/32x32.png'


export default function customTitleBar(){

    const [fullscreen, setFullScreen] = useState(false)
    const minimizeWindow = () => appWindow.minimize()
    const screenMaximize = () => {
        appWindow.toggleMaximize();
        setFullScreen(true)
    }

    const screenMinimize = () => {
        appWindow.toggleMaximize()
        setFullScreen(false)
    }

    const closeWindow = () => appWindow.close()

    return <div id='titlebar' data-tauri-drag-region className='h-[30px] bg-black flex justify-between fixed select-none top-0 left-0 text-white right-0 z-[1000px]'>
        <div className='flex items-center gap-1 pl-2'>
            <img src={appIcon} className="cursor-default ml-5 mt-1 w-[23px] align-bottom" width={10} alt="tauri app icon"/>
            <span className='text-xs inline ml-5 leading-[30px]'>emerald</span>
        </div>
        <div className='h-full items-center'>
            <div title='minimize' onClick={minimizeWindow} className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50'>
                <VscChromeMinimize className='align-middle cursor-pointer'/>
            </div>
            {fullscreen ? 
            <div title='restore down' onClick={screenMinimize} className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50'>
                <VscChromeRestore className='align-middle cursor-pointer'/> 
            </div>
            : 
            <div title='maximize' onClick={screenMaximize} className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-gray-400 active:bg-slate-50'>
                <VscChromeMaximize className='align-middle cursor-pointer'/>
            </div>
            }            
            <div title='close' onClick={closeWindow} className='duration-200 inline-flex justify-center align-middle w-[46px] h-[28px] hover:bg-red-600 active:bg-slate-50'>
                <VscChromeClose className='align-middle cursor-pointer'/>
            </div>
        </div>
    </div>
}