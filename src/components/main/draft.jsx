// frontend/src/components/main/side-bar.jsx
import * as React from "react";
import { useEffect, useState } from 'react'; // Import useState and useEffect

import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
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


// Remove or comment out this sample data as you'll fetch real data
// const sampleFiles = [
//    {
//       id: 1,
//       name: "products_scrape_001.json",
//       date: "2025-04-29",
//       itemCount: 150,
//    },
//    // ... rest of your sample data ...
// ]


function SideBar(props) {
    const [fetchedFiles, setFetchedFiles] = useState([]); // New state for fetched files
    const [isLoadingFiles, setIsLoadingFiles] = useState(false); // New state for loading indicator
    const [fileFetchError, setFileFetchError] = useState(null); // New state for error handling


    const chooseConfigForm = () => { props.renderConfigForm() }

    const chooseData = async () => { // Make this function async
        props.renderData(); // First, switch to the data tab

        // Only fetch if currently on the 'Data' tab and not already loading
        // This condition prevents fetching if the tab isn't meant to be 'database' or if it's already fetching
        if (props.selectedTab !== 'database') { // Assuming props.selectedTab is passed down (see App.jsx changes below)
            // If the user just clicked 'Data', the tab will switch, and useEffect will handle the fetch.
            // This 'chooseData' function just needs to trigger the tab change.
            return; 
        }
        // If the tab is already 'database' (e.g., initial load or refresh), manually trigger fetch
        fetchFiles();
    }

    const fetchFiles = async () => {
        setIsLoadingFiles(true);
        setFileFetchError(null); // Clear previous errors

        try {
            const response = await fetch('http://127.0.0.1:8000/api/data/files');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFetchedFiles(data);
            console.log("Fetched files:", data);
        } catch (error) {
            console.error("Error fetching files:", error);
            setFileFetchError("Failed to load files. Please check the backend.");
        } finally {
            setIsLoadingFiles(false);
        }
    };

    // Use useEffect to fetch files when the 'Data' tab is selected
    // and when the component mounts if the 'Data' tab is the initial one.
    useEffect(() => {
        if (props.selectedTab === 'database') {
            fetchFiles();
        }
    }, [props.selectedTab]); // Re-run when selectedTab changes

    return (
        <Sidebar id='sidebar-main' className="border-r border-gray-300">
            {/* ... (SidebarHeader remains the same) ... */}

            <SidebarContent id='sidebar-content' className="bg-gray-50 flex flex-col">

                {/* Navigation section */}
                <SidebarGroup id='sidebar-group'>
                    <SidebarGroupLabel id='sidebar-group-label' className='text-xs font-medium text-gray-600'>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent id='sidebar-group-content'>
                        <SidebarMenu id='sidebar-menu'>

                            <SidebarMenuItem id='sidebar-menu-item'>
                                <SidebarMenuButton
                                    id='sidebar-menu-button'
                                    onClick={chooseConfigForm}
                                    className='justify-start gap-2 cursor-pointer items-center'
                                >
                                    <SearchCode className="size-4" />
                                    <span className='text-sm font-normal'>Run Scraper</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem id='sidebar-menu-item'>
                                <SidebarMenuButton
                                    id='sidebar-menu-button'
                                    onClick={chooseData}
                                    className='justify-start gap-2 cursor-pointer items-center'
                                >
                                    <Database className="size-4" />
                                    <span className='text-sm font-normal'>Data</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* File section */}
                {props.fileIsVisible &&
                    <SidebarGroup id='sidebar-group' className="flex flex-col flex-1 min-h-0 pb-0">
                        <SidebarGroupLabel id='sidebar-group-label' className='text-xs font-medium text-gray-600'>Data files</SidebarGroupLabel>
                        <SidebarGroupContent id='sidebar-group-content' className="flex-1">
                            <div className="border border-gray-200 rounded-md bg-white h-full p-2">
                                <ScrollArea id='scroll-area' className="h-full">
                                    <SidebarMenu id='sidebar-menu' className="flex w-full min-w-0 flex-col gap-2">

                                        {isLoadingFiles && <p className="text-center text-sm text-gray-500">Loading files...</p>}
                                        {fileFetchError && <p className="text-center text-sm text-red-500">{fileFetchError}</p>}
                                        {!isLoadingFiles && fetchedFiles.length === 0 && !fileFetchError && (
                                            <p className="text-center text-sm text-gray-500">No data files found.</p>
                                        )}

                                        {fetchedFiles.map((file) => (
                                            <SidebarMenuItem id='sidebar-menu-item' key={file.id}>
                                                <SidebarMenuButton id='sidebar-menu-button' className='h-auto p-3 flex-col items-start gap-2 bg-gray-100 border-1 border-gray-300'>
                                                    <div className="w-full flex items-center justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2 w-full mb-1">
                                                                <FileChart className="size-4" />
                                                                <span className="text-xs font-medium truncate">{file.name}</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">{file.date}</span>
                                                        </div>
                                                        <Badge variant="default" className="text-xs h-4 px-1">
                                                            {file.itemCount}
                                                        </Badge>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}

                                    </SidebarMenu>
                                </ScrollArea>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>}

            </SidebarContent>

            {/* ... (SidebarFooter remains the same) ... */}

        </Sidebar>
    )
}

export default SideBar