import * as React from "react";
import { useEffect } from "react";
import './index.css';

import SideBar from './components/main/side-bar';
import DataPage from './components/main/data-tab/data-page';
import RunPage from './components/main/form-tab/run-page';

import { FileMetadata } from './types/api';
import { TabType } from './types/common';


// ------------------------------------------------------------------------------------------------


function App() {

    const [currentTab, setCurrentTab] = React.useState<TabType>('database');
    const [selectedFile, setSelectedFile] = React.useState<FileMetadata | null>(null);
    const [runButtonClickable, setRunButtonClickable] = React.useState<boolean>(true);

    useEffect( () => {
        console.log("[App] Global selected file:", selectedFile?.id)
    }, [currentTab, selectedFile])

    const Tab = {
        form: <RunPage
            app_currentTab={currentTab} 
            app_runButtonClickable={runButtonClickable}
            form_setRunButtonClickable={(button_state: boolean) => { setRunButtonClickable(button_state) }}
        />,
        database: <DataPage app_selectedFile={selectedFile} />
    }

    

    return (
        <div id='layout' className="h-dvh w-dvw flex flex-row">

            <SideBar 
                self_currentTab={currentTab}
                self_selectedFile={selectedFile}
                self_chooseTab={(sidebar_tab) => { setCurrentTab(sidebar_tab) }}
                self_chooseFile={(file) => { setSelectedFile(file) }}
                app_runButtonClickable={runButtonClickable}

            />

            <main id='main-container' className='min-w-0 min-h-0 flex-1 size-full'> 
                {Tab[currentTab]}
            </main>
        </div>
    )
}

export default App
