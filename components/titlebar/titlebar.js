import { appWindow } from '@tauri-apps/api/window';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
import windowIcon from "../../src-tauri/icons/32x32.png";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore } from 'react-icons/vsc'


export default function TitleBar(){
    const [ title, setTitle ] = useState("emerald")
    const [ windowFullScreen, setWindowFullScreen  ] = useState(false)
    const [ maximizeScreen, setMaximizeScreen] = useState(false);

    const tauriWindow = useInterval(() => {
        appWindow.isFullscreen().then(setWindowFullScreen)
        appWindow.setTitle().then(setTitle)
        appWindow.isMaximized().then(setMaximizeScreen)
    }, 200)

    useEffect(() => {
        tauriWindow.start()
        return tauriWindow.stop
    }, )

    return !windowFullScreen && <div data-tauri-drag-region className='h-[30px] bg-neutral-800 flex justify-between fixed select-none top-0 left-0 right-0 z-[1000px]'>
        <div>
            {/* app icon */}
            <Image className='cursor-default ml-5 align-bottom' height={16} alt='app icon' src={windowIcon}></Image>
        </div>
        <div data-tauri-drag-region inline className='text-xs inline ml-5 leading-[30px]'>
            <p>{title}</p>
        </div>
        {/* //todo: add app dialog box*/}
        {/* window icons */}
        <div>
            <div title='minimize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.minimize()}>
                <VscChromeMinimize title='minimize' className='align-middle'/>
            </div>
            {maximizeScreen ? 
            <div title='restore down' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.toggleMaximize()}>
                <VscChromeRestore className='align-middle'/>
            </div> : 
            <div title='maximize' className='duration-200 inline-flex justify-center align-middle w-[46px] h-[30px] hover:bg-gray-400 active:bg-slate-50' onClick={() => appWindow.toggleMaximize()}>
                <VscChromeMaximize className='align-middle'/>
                </div>}
        </div>
    </div>
}