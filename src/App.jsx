import * as React from "react";
import { useEffect } from "react";
import './index.css';

import { SidebarProvider } from "@/components/ui/sidebar"

import ConfigForm from '@/components/main/config-form'
import DraftSideBar from './components/main/draft';
import SideBar from './components/main/side-bar';
import DataPage from './components/main/DataPage';


// ------------------------------------------------------------------------------------------------


function App() {

    const [currentTab, setCurrentTab] = React.useState('database');

    const [selectedFile, setSelectedFile] = React.useState(null);

    const [fileIsVisible, setFileIsVisible] = React.useState(
        currentTab === 'form' ? false : true
    )



    const renderTab = (selectedTab) => {
        switch (selectedTab) {
            case 'form':
                return <ConfigForm />
            case 'database':
                return <DataPage selectedFile={selectedFile} />
            default:
                return (<h1 className='text-zinc-900 text-2xl font-medium'>{`<No_page_found>`}</h1>)
        }
    }

    const renderForm = () => {
        setCurrentTab('form')
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
        <div id='layout' className="h-dvh w-dvw flex flex-row">

            {/* <DraftSideBar 
                renderForm={renderForm} 
                renderData={renderData} 
                fileIsVisible={fileIsVisible} 
                currentTab={currentTab}
                chooseFile={chooseFile} // onFileSelect
                selectedFile={selectedFile}
                className={`h-dvh w-fit ${currentTab === 'form' ? 'items-center justify-center' : ''}`}
            /> */}

            <SideBar 
                renderForm={renderForm}
                renderData={renderData}
                fileIsVisible={fileIsVisible}
                currentTab={currentTab}
                chooseFile={chooseFile}
                selectedFile={selectedFile}
            />

            {/* <main 
                id='main-container'
                className={`h-full flex-1 ${currentTab === 'form' ? 'items-center justify-center' : ''}`}
            >
                
                {renderTab(currentTab)}
                
            </main> */}
        </div>
    )
}

export default App
