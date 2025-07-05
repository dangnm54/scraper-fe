// import * as React from "react";
// import { useEffect, useState } from 'react';

// import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart, RotateCcw as Refresh } from 'lucide-react'
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Badge } from "@/components/ui/badge"
// import {
//    Sidebar,
//    SidebarContent,
//    SidebarGroup,
//    SidebarGroupContent,
//    SidebarGroupLabel,
//    SidebarHeader,
//    SidebarMenu,
//    SidebarMenuButton,
//    SidebarMenuItem,
//    SidebarRail,
//    SidebarFooter,
// } from "@/components/ui/sidebar"


// Add props: onFileSelect for passing selected file up, and selectedFile (from App.jsx) to manage active state
function SideBar({ renderConfigForm, renderData, fileIsVisible, currentTab, onFileSelect, selectedFile: propSelectedFile }) {
   const [fetchedFiles, setFetchedFiles] = useState([]);
   const [isLoadingFiles, setIsLoadingFiles] = useState(false);
   const [fileFetchError, setFileFetchError] = useState(false);
   const [refreshClickable, setRefreshClickable] = useState(true);

   // Internal state to manage the selected file within the sidebar,
   // useful for applying active styles. We'll use propSelectedFile
   // as the source of truth if available, otherwise fallback.
   const [internalSelectedFile, setInternalSelectedFile] = useState(null);

   const chooseConfigForm = () => {
      renderConfigForm();
      setInternalSelectedFile(null); // Clear selected file when switching tabs
      onFileSelect(null); // Inform parent to clear selected file
   }

   const chooseData = async () => {
      renderData();
      // When switching to data tab, attempt to fetch files and select the first one if available
      // The useEffect below will handle the initial fetch and selection.
   }



   
   // Function to handle file selection from the sidebar
   const handleFileClick = (file) => {
      setInternalSelectedFile(file); // Update internal state for styling
      onFileSelect(file); // Pass the selected file up to App.jsx
      renderData(); // Ensure we are on the Data tab
   };




   // Effect to fetch files when the 'database' tab is active
   useEffect(() => {
      if (currentTab === 'database') {
         fetchFiles();
      }
   }, [currentTab]); // Only re-run when currentTab changes

   // Effect to set the initial selected file or update it if propSelectedFile changes
   useEffect(() => {
      if (propSelectedFile) {
         setInternalSelectedFile(propSelectedFile);
      } else if (fetchedFiles.length > 0 && currentTab === 'database' && !internalSelectedFile) {
         // If no file is selected by prop, but we have files and are on the data tab, select the first one
         setInternalSelectedFile(fetchedFiles[0]);
         onFileSelect(fetchedFiles[0]); // Inform parent about this auto-selection
      }
   }, [fetchedFiles, propSelectedFile, currentTab, internalSelectedFile, onFileSelect]);


   const fetchFiles = async () => {
      setFetchedFiles([]);
      setIsLoadingFiles(true);
      setFileFetchError(false);
      setRefreshClickable(false);

      try {
         // CHANGE: Updated endpoint to '/api/data/files' as per previous guide.
         // Ensure your backend `main.py` has a route for this, and it returns
         // objects with `id`, `file_name`, `date_created`, `item_count`, and `path`.
         const response = await fetch('http://127.0.0.1:8000/api/data/files');
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         const data = await response.json();
         setFetchedFiles(data);
         console.log("Fetched files:", data);

         // Automatically select the first file if available and no file is currently selected
         if (data.length > 0 && !propSelectedFile) {
            onFileSelect(data[0]); // Pass the first file up to App.jsx
            setInternalSelectedFile(data[0]); // Set internal state for highlighting
         } else if (data.length > 0 && propSelectedFile && !data.find(f => f.id === propSelectedFile.id)) {
            // If propSelectedFile exists but is not in the new fetched list (e.g., file deleted), select the first one
            onFileSelect(data[0]);
            setInternalSelectedFile(data[0]);
         } else if (propSelectedFile && data.find(f => f.id === propSelectedFile.id)) {
            // If propSelectedFile exists and is in the new fetched list, keep it selected
            setInternalSelectedFile(propSelectedFile);
         } else {
            // If no files are fetched or the current selected file is no longer valid, clear selection
            onFileSelect(null);
            setInternalSelectedFile(null);
         }

      } catch (error) {
         console.error("Cannot connect to BE or fetch file list |", error);
         setFileFetchError(true);
         setFetchedFiles([]); // Clear files on error
         onFileSelect(null); // Clear selected file on error
         setInternalSelectedFile(null);
      } finally {
         setIsLoadingFiles(false);
         setRefreshClickable(true);
      }
   };

   return (
      <Sidebar id='sidebar-main' className="border-r border-gray-300">
         <SidebarHeader id='sidebar-header' className="p-2 border-b bg-gray-50 border-gray-300">
            <SidebarMenu id='sidebar-menu'>
               <SidebarMenuItem id='sidebar-menu-item'>
                  <SidebarMenuButton id='sidebar-menu-button' size="lg">
                     <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-zinc-900">
                        <BugIcon className="size-4 text-white" />
                     </div>
                     <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">Scrapi</span>
                        <span className="text-xs text-muted-foreground">v1.0.0</span>
                     </div>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>

         <SidebarContent id='sidebar-content' className="bg-gray-50 flex flex-col">
            {/* Navigation section */}
            <SidebarGroup id='navigation-group'>
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
            {fileIsVisible &&
               <SidebarGroup id='data-group' className="flex flex-col flex-1 min-h-0 pb-0">
                  <SidebarGroupLabel id='data-group-label' className='flex flex-row items-center justify-between'>
                     <div className='text-xs font-medium text-gray-600'>Data files</div>
                     <Refresh
                        onClick={refreshClickable ? fetchFiles : null}
                        className={`!size-3 ${refreshClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                     />
                  </SidebarGroupLabel>

                  <SidebarGroupContent id='file-group-content' className="flex-1">
                     <div className="border border-gray-200 rounded-md bg-white h-full p-2">
                        <ScrollArea id='scroll-area' className="h-full">
                           <SidebarMenu id='sidebar-menu-file' className="flex w-full min-w-0 flex-col gap-2">
                              {isLoadingFiles && <p className="text-center text-sm text-gray-500">Fetching files...</p>}
                              {fileFetchError && <p className="text-center text-sm text-red-500">Error fetching files! <br /> Please check BE server.</p>}
                              {!isLoadingFiles &&
                                 !fileFetchError &&
                                 fetchedFiles.length === 0 &&
                                 <p className="text-center text-sm text-gray-500">Database is empty.</p>}

                              {fetchedFiles.map((file) => (
                                 <SidebarMenuItem id='sidebar-menu-item' key={file.id}>
                                    <SidebarMenuButton
                                       id='sidebar-menu-button'
                                       // Add the onClick handler to select the file
                                       onClick={() => handleFileClick(file)}
                                       // Apply active class if this file is the currently selected one
                                       className={`h-auto p-3 flex-col items-start gap-2 border-1 border-gray-300 ${internalSelectedFile && internalSelectedFile.id === file.id ? 'bg-blue-100' : 'bg-gray-100'}`}
                                    >
                                       <div className="w-full flex items-center justify-between">
                                          <div>
                                             <div className="flex items-center gap-2 w-full mb-1">
                                                <FileChart className="size-4" />
                                                <span className="text-xs font-medium truncate">{file.file_name}</span>
                                             </div>
                                             <span className="text-xs text-muted-foreground">{file.date_created}</span>
                                          </div>
                                          <Badge variant="default" className="text-xs h-4 px-1">
                                             {file.item_count}
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

         <SidebarFooter id='sidebar-footer'>
            <div className="px-3 py-1 text-center">
               <span className="text-xs text-muted-foreground">Copyright © 2025 Strapee. <br /> All Rights Reserved.</span>
            </div>
         </SidebarFooter>
      </Sidebar>
   )
}

export default SideBar