import * as React from "react";
import './index.css';

import { SidebarProvider} from "@/components/ui/sidebar"

import ConfigForm from '@/components/main/config-form'
import SideBar from './components/main/side-bar';
import DataView from './components/main/DataPage';

function App() {

    const [selectedTab, setSelectedTab] = React.useState('settings');

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

    const renderConfigForm = () => {setSelectedTab('settings')}

    const renderData = () => {setSelectedTab('database')}

    return (
        <main id='main-container' className='flex flex-row'>
            <SidebarProvider 
                id='sidebar-provider' 
                defaultOpen={true} 
                className="max-w-fit"
            >
                <SideBar 
                    renderConfigForm={renderConfigForm} 
                    renderData={renderData} 
                />
            </SidebarProvider>

            <div id='main-content' className='flex-1 flex items-center justify-center'>
                {renderTab(selectedTab)}
            </div>


        </main>
    )
}

export default App
