import * as React from "react";
import './index.css';

import { SidebarProvider } from "@/components/ui/sidebar"

import ConfigForm from '@/components/main/config-form'
import SideBar from './components/main/side-bar';
import DataView from './components/main/DataPage';

function App() {

    const [selectedTab, setSelectedTab] = React.useState('database');

    const [fileIsVisible, setFileIsVisible] = React.useState(
        selectedTab === 'settings' ? false : true
    )

    const renderTab = (selectedTab) => {
        switch (selectedTab) {
            case 'settings':
                return <ConfigForm />
            case 'database':
                return <DataView />
            default:
                return (<h1 className='text-zinc-900 text-2xl font-medium'>{`<No_page_found>`}</h1>)
        }
    }

    const renderConfigForm = () => {
        setSelectedTab('settings')
        setFileIsVisible(false)
    }

    const renderData = () => {
        setSelectedTab('database')
        setFileIsVisible(true)
    }

    return (
        <SidebarProvider id='sidebar-provider' defaultOpen={true}>

            <SideBar renderConfigForm={renderConfigForm} renderData={renderData} fileIsVisible={fileIsVisible} className />

            <main 
                id='main-container'  bg-red-200
                className={`flex-1 min-w-0 flex flex-col ${selectedTab === 'settings' ? 'items-center justify-center' : ''}`}
            >
                
                {renderTab(selectedTab)}
                
            </main>
        </SidebarProvider>
    )
}

export default App
