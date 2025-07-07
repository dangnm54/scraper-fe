import * as React from "react";
import { useEffect } from "react";
import './index.css';

import { SidebarProvider } from "@/components/ui/sidebar"

import ConfigForm from '@/components/main/config-form'
import SideBar from './components/main/side-bar';
import DataPage from './components/main/DataPage';


// ------------------------------------------------------------------------------------------------


function App() {

    const [currentTab, setCurrentTab] = React.useState('database');

    const [selectedFile, setSelectedFile] = React.useState(null);

    const [fileIsVisible, setFileIsVisible] = React.useState(
        currentTab === 'settings' ? false : true
    )



    const renderTab = (selectedTab) => {
        switch (selectedTab) {
            case 'settings':
                return <ConfigForm />
            case 'database':
                return <DataPage selectedFile={selectedFile} />
            default:
                return (<h1 className='text-zinc-900 text-2xl font-medium'>{`<No_page_found>`}</h1>)
        }
    }

    const renderConfigForm = () => {
        setCurrentTab('settings')
        setFileIsVisible(false)
        // setSelectedFile(null)
    }

    const renderData = () => {
        setCurrentTab('database')
        setFileIsVisible(true)
    }


    const chooseFile = (file) => {
        setSelectedFile(file)
    }


    useEffect( () => {
        console.log("[App] Global selected file:", selectedFile?.id)
    }, [currentTab, selectedFile])



    return (
        <SidebarProvider id='sidebar-provider' defaultOpen={true}>

            <SideBar 
                renderConfigForm={renderConfigForm} 
                renderData={renderData} 
                fileIsVisible={fileIsVisible} 
                currentTab={currentTab}
                chooseFile={chooseFile} // onFileSelect
                selectedFile={selectedFile}
                className={`h-dvh w-fit min-w-0 flex flex-col ${currentTab === 'settings' ? 'items-center justify-center' : ''}`}
            />

            <main 
                id='main-container'
                className={`h-dvh w-dvw overflow-hidden ${currentTab === 'settings' ? 'items-center justify-center' : ''}`}
            >
                
                {renderTab(currentTab)}
                
            </main>
        </SidebarProvider>
    )
}

export default App
