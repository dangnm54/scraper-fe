import * as React from "react";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"

import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart, RotateCcw as Refresh } from 'lucide-react'
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


// ------------------------------------------------------------------------------------------------


function SideBar(props) {
   const [fetchedFiles, setFetchedFiles] = useState([]);
   const [isLoadingFiles, setIsLoadingFiles] = useState(false);
   const [fileFetchError, setFileFetchError] = useState(false);
   const [refreshClickable, setRefreshClickable] = useState(true);



   const clickFile = (file) => {
      props.chooseFile(file)
      console.log("[side-bar] Choose file:", file)
   }


   const chooseConfigForm = () => { 
      props.renderConfigForm() 
   }

   
   const chooseData = async () => { props.renderData() }


   const fetchFiles = async () => { 
      setFetchedFiles([])
      setIsLoadingFiles(true);
      setFileFetchError(false);
      setRefreshClickable(false);

      try {
         const response = await fetch('http://127.0.0.1:8000/api/data/file-list')
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  // this message stored in error.message
         }

         const data = await response.json()
         setFetchedFiles(data)
         console.log("[side-bar] Fetched files:", data)

         if (data.length > 0 && !props.selectedFile) {
            props.chooseFile(data[0])
         } 
         else if (data.length > 0 && props.selectedFile && !data.find(file => file.id === props.selectedFile.id)) {
            props.chooseFile(data[0])
         }
         else if (data.length > 0 && props.selectedFile && data.find(file => file.id === props.selectedFile.id)) {
            props.chooseFile(props.selectedFile)
         }
         else {
            props.chooseFile(null)
         }


      } catch (error) {
         console.error("[side-bar] Cannot connect to BE |", error);
         setFileFetchError(true)
      
      } finally {
         setIsLoadingFiles(false)
         setRefreshClickable(true);
      }
   }


   // refresh file list when switch to data tab
   useEffect( () => {
      if (props.currentTab === 'database') {
      fetchFiles();
      }
   }, [props.currentTab])



   return (
      <Sidebar id='sidebar-main' className="h-full w-fit border-r border-gray-300">

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
            {props.fileIsVisible &&
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
                                    id = 'sidebar-menu-button' 
                                    onClick = {props.selectedFile?.id === file.id ? null : () => clickFile(file)}
                                    className={cn(
                                       'h-auto p-3 flex-col items-start gap-2 bg-gray-100 border-1 border-gray-300',
                                       props.selectedFile?.id === file.id ? 'border-2 border-blue-500 cursor-not-allowed' : 'cursor-pointer'
                                    )}
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
            </SidebarGroup> }

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
