import React from 'react'
import './index.css';

import { SidebarProvider} from "@/components/ui/sidebar"

import ConfigForm from '@/components/main/config-form'
import SideBar from './components/main/side-bar';

function App() {

    // const [selectedTab, setSelectedTab] = React.useState('settings');

    // const renderTab = (selectedTab) => {
    //     switch (selectedTab) {
    //         case 'settings':
    //             return <ConfigForm />
    //         case 'database':
    //             return (<h1 className='text-white text-2xl font-medium'>{`<Results page> building...`}</h1>)
    //         default:
    //             return (<h1 className='text-white text-2xl font-medium'>{`<No_page_found>`}</h1>)
    //     }
    // }

    return (
        <div id='main-container' className='min-h-screen w-full flex'>
            <SidebarProvider id='dfd' defaultOpen={true}>
                <SideBar />
            </SidebarProvider>

        </div>
    )
}

export default App
