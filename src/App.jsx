import './App.css'
import { TAURI_MODE, appTitle, WIN_CUSTOM_TITLE_BAR } from './utils/tauriUtils'
import CustomTitleBar from './components/title bar/titlebar'
import { appWindow } from '@tauri-apps/api/window'
import { useTauri } from './utils/providers'
import { useEffect, useState } from 'react'
import { useInterval } from '@mantine/hooks'
//import { tauri } from '@tauri-apps/api'



export default function App() {

  const { osType } = useTauri();
  useEffect(() => {
    if(osType === 'Windows_NT') appWindow.setDecorations(!WIN_CUSTOM_TITLE_BAR);
  }, [osType])

  // maximize and minimize functionality
  const [ fullscreen, setFullScreen] = useState(false)
  const tauriInterval = useInterval(() => {
    appWindow.isFullscreen().then(setFullScreen);
  }, 200)
  useEffect(() => {
    tauriInterval.start();
    return tauriInterval.stop
  }, []);

  //use the specified custom title bar

const useCustomTitleBar = !fullscreen && osType === 'Windows_NT' && WIN_CUSTOM_TITLE_BAR;

  return <div>
    <CustomTitleBar/>
  </div>
}