import * as React from "react";
import 'C:/Users/ADMIN/Pictures/scraper-fe/src/index.css';

import { Button } from '@/components/ui/button'
import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart } from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"


export function SideBar() {
    return (
        <Sidebar id='sidebar-main' className="bg-red-900 border-r border-gray-200">
            <SidebarHeader className="p-2 border-b bg-gray-50 border-gray-200">

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <BugIcon className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-semibold">Strapee</span>
                                <span className="text-xs text-muted-foreground">v1.0.0</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            
            </SidebarHeader>
            
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel className='text-sm font-medium text-white'>Settings</SidebarGroupLabel>


                </SidebarGroup>



            </SidebarContent>

        </Sidebar>
    )
}


export default SideBar

{/* <div id='sidebar' className='w-52 bg-zinc-800 p-4 flex flex-col items-center border-r border-zinc-700'>
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
</main> */}