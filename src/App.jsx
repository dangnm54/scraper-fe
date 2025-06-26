import * as React from "react";
import './index.css';

import { SidebarProvider} from "@/components/ui/sidebar"

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
        <main id='main-container' className='flex flex-row h-dvh w-d'>
            <SidebarProvider 
                id='sidebar-provider' 
                defaultOpen={true} 
                className="max-w-fit"
            >
                <SideBar 
                    renderConfigForm={renderConfigForm} 
                    renderData={renderData} 
                    fileIsVisible={fileIsVisible}
                />
            </SidebarProvider>

            <div 
                id='main-content' 
                className={`flex-1 flex ${selectedTab === 'settings' ? 'items-center justify-center' : ''}`}
            >
                {renderTab(selectedTab)}
            </div>

        </main>
    )
}

export default App
