import React from 'react'
import './index.css';

import { Button } from '@/components/ui/button'
import ConfigForm from '@/components/main/config_form'
import { SearchCode, Database } from 'lucide-react'


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
        <div id='main-container' className='min-h-screen w-full bg-zinc-900 flex'>
            
            <div id='sidebar' className='w-50 bg-zinc-800 p-4 flex flex-col items-center border-r border-zinc-700'>
                <h1 className='text-xl font-medium text-white mb-8'>Scrapee</h1>
                <div className='flex flex-col w-full space-y-2'>
                    <Button
                        variant={selectedTab === 'settings' ? 'secondary' : 'default'}
                        onClick={() => setSelectedTab('settings')}
                        className='justify-start gap-2 cursor-pointer'>
                        <SearchCode className='h-4 w-4' />
                        <span className='text-xs font-medium'>Run Scraper</span>
                    </Button>

                    <Button
                        variant={selectedTab === 'database' ? 'secondary' : 'default'}
                        onClick={() => setSelectedTab('database')}
                        className='justify-start gap-2 cursor-pointer'>
                        <Database className='h-4 w-4' />
                        <span className='text-xs font-medium'>Data</span>
                    </Button>
                </div>
            </div>

            <main className='flex-1 p-4 flex justify-center items-center overflow-auto'>
                {renderTab(selectedTab)}
            </main>
        </div>
    )
}

export default App
