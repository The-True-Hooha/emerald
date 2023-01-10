import React, { useState, useEffect, useContext } from "react";
import { invoke } from "@tauri-apps/api";
import { TAURI_MODE } from "./tauriUtils";
import * as os from '@tauri-apps/api/os';


const Tauri = React.createContext({
    loading: true,
    downloads: undefined,
    documents: undefined,
    appDocuments: undefined,
    detectOsType: undefined,
    fileSep: '/'
});

export const useTauri = () => useContext(Tauri)
export function Provider({ children }){

    const [ osType, setOsType ] = useState();

    useEffect(() => {
        if( TAURI_MODE){
            const invokeTauri = async ()=> {
                const operatingSystem = await os.type();
                setOsType(operatingSystem);
            }
        }
    }, [])

    return <Tauri.Provider value={{ osType }}>
        {children}
    </Tauri.Provider>
}