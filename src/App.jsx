import React from 'react'
import './index.css';

import { Button } from '@/components/ui/button'
import { SearchCode, Database } from 'lucide-react'
import ConfigForm from '@/components/main/config-form'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from './components/main/side-bar';
import { AppSidebar2 } from './components/main/dr-sb2';
import { AppSidebar3 } from './components/main/dr-sb3';


function App() {

    const [selectedTab, setSelectedTab] = React.useState('settings');

    const renderTab = (selectedTab) => {
        switch (selectedTab) {
            case 'settings':
                return <ConfigForm />
            case 'database':
                return (<h1 className='text-white text-2xl font-medium'>{`<Results page> building...`}</h1>)
            default:
                return (<h1 className='text-white text-2xl font-medium'>{`<No_page_found>`}</h1>)
        }
    }

    return (
        <div id='main-container' className='min-h-screen w-full flex'>
            <SidebarProvider id='dfd' defaultOpen={true}>
                <SideBar />
            </SidebarProvider>

        </div>
    )
}

export default App
