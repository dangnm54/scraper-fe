import * as React from "react";
import { useEffect } from "react";
import './index.css';

import ConfigForm from '@/components/main/config-form'
import SideBar from './components/main/side-bar';
import DataPage from './components/main/data-page';
import RunPage from './components/main/run-page';


// ------------------------------------------------------------------------------------------------


function App() {

    const [currentTab, setCurrentTab] = React.useState('form');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [runButtonClickable, setRunButtonClickable] = React.useState(true);

    useEffect( () => {
        console.log("[App] Global selected file:", selectedFile?.id)
    }, [currentTab, selectedFile])

    const Tab = {
        form: <RunPage 
            app_currentTab={currentTab} 
            app_runButtonClickable={runButtonClickable}
            form_setRunButtonClickable={(button_state) => { setRunButtonClickable(button_state) }}
        />,
        database: <DataPage int_selectedFile={selectedFile} />
    }

    

    return (
        <div id='layout' className="h-dvh w-dvw flex flex-row">

            <SideBar 
                id = 'sidebar-component'
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
