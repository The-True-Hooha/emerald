import { useEffect } from 'react';
import { currentMonitor, getCurrent } from '@tauri-apps/api/window'
import tauriConfJson from '../../src-tauri/tauri.conf.json'

export const WIN_CUSTOM_TITLE_BAR = true
export const TAURI_MODE = window.__TAURI__ !== undefined;
export const EMERALD = tauriConfJson.package.productName;
export const appTitle = "emerald"

export function useWindowMinimumWidth(minWidth){
    if(TAURI_MODE) {
        useEffect(() => {
            async function resizeWindow(){
                const screenSize = await getCurrent().innerSize(); //gets the physical screen sie of the monitor
                //get the current monitor scale that converts the size accurately to logical sie
                const scaleFactor = await currentMonitor()
                const logicalScale = screenSize.toLogical(scaleFactor);
                if(logicalScale.width < minWidth){
                    logicalScale.width = minWidth
                    await getCurrent().setSize(logicalScale)
                }
            }
            resizeWindow().catch(console.error);
        }, [])
    }
}