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

    useEffect( () => {
        console.log("[App] Global selected file:", selectedFile?.id)
    }, [currentTab, selectedFile])

    const Tab = {
        form: <RunPage />,
        database: <DataPage int_selectedFile={selectedFile} />
    }


    return (
        <div id='layout' className="h-dvh w-dvw flex flex-row">

            <SideBar 
                id = 'sidebar-component'
                int_currentTab={currentTab}
                int_selectedFile={selectedFile}
                int_chooseTab={(sidebar_tab) => { setCurrentTab(sidebar_tab) }}
                int_chooseFile={(file) => { setSelectedFile(file) }}

            />

            <main id='main-container' className='min-w-0 min-h-0 flex-1 size-full'> 
                {Tab[currentTab]}
            </main>
        </div>
    )
}

export default App
