import * as React from "react";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"

import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart, RotateCcw as Refresh } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"


// ------------------------------------------------------------------------------------------------


function SideBar(props) {
   const [fileList, setFileList] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [refreshClickable, setRefreshClickable] = useState(true);



   const clickFile = (file) => {
      props.chooseFile(file)
      console.log("[side-bar] Choose file:", file)
   }


   const chooseForm = () => { 
      props.renderForm() 
   }

   
   const chooseData = async () => { props.renderData() }


   const fetchFiles = async () => { 
      setFileList([])
      setIsLoading(true);
      setIsError(false);
      setRefreshClickable(false);

      try {
         const response = await fetch('http://127.0.0.1:8000/api/data/file-list')
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);  // this message stored in error.message
         }

         const data = await response.json()
         setFileList(data)
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
         setIsError(true)
      
      } finally {
         setIsLoading(false)
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

      <div id='sidebar-main' className="h-full w-72 border-r border-gray-300 grid grid-rows-[auto_1fr_auto] overflow-hidden">

         <div id='sidebar-header' className="w-full h-fit p-3 px-4 border-b border-gray-300 bg-gray-50 flex flex-row items-center flex-start gap-3">
            <div className="aspect-square size-11 flex items-center justify-center rounded-lg bg-zinc-900">
               <BugIcon className="size-6 text-white" />
            </div>
            <div className="flex flex-col justify-center gap-0.5">
               <span className="font-semibold text-md">Scrapi</span>
               <span className="text-xs text-muted-foreground">v.beta</span>
            </div>
         </div>


         <div id='sidebar-body' className='relative h-full w-full flex flex-col gap-2 bg-blue-200'>

            {/* Navigation section */}
            <div id='sidebar-navigation-group' className='w-full h-fit p-3 px-4 pt-5 flex flex-col gap-2'>
               
               <div id='group-label' className='text-sm font-medium text-gray-600'>Navigation</div>
               
               <div id='group-buttons' className='flex flex-col gap-1.5'>
                  <button
                     className='w-full h-fit pl-0 flex flex-row items-center gap-2 cursor-pointer'
                     onClick={chooseForm}
                  >
                     <SearchCode className="size-4" />
                     <span className='text-lg font-normal'>Run Scraper</span>
                  </button>
                  
                  <button
                     className='w-full h-fit pl-0 flex flex-row items-center gap-2 cursor-pointer'
                     onClick={chooseData}
                  >
                     <Database className="size-4" />
                     <span className='text-lg font-normal'>Database</span>
                  </button>
               </div>
            
            </div>

            {/* File section */}
            <div id='sidebar-file-group' className='w-full h-full p-3 px-4 flex flex-col gap-2 bg-red-50'>

               <div id='group-label' className='flex flex-row items-center justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Files</span>
                  <Refresh 
                     onClick={refreshClickable ? fetchFiles : null}
                     className={`!size-3 ${refreshClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  /> 
               </div>

               <div id='file-box' className='w-full h-full p-3 overflow-auto bg-yellow-50 border rounded-md border-gray-300 flex flex-col gap-2 items-center'>

                  {/* {isLoading && <p className="text-center text-sm text-gray-500">Fetching files...</p>}
                  {isError && <p className="text-center text-sm text-red-500">Error fetching files! <br /> Please check BE server.</p>}
                  {!isLoading &&
                  !isError &&
                  fileList.length === 0 &&
                  <p className="text-center text-sm text-gray-500">Database is empty.</p>} */}

                  {fileList.map( (file) => (
                     <button
                        key={file.id}
                        id='file-item'    
                        onClick={props.selectedFile?.id === file.id ? null : () => clickFile(file)}
                        className={cn(
                           'h-fit w-full p-2 flex border-2 rounded-md',
                           props.selectedFile?.id === file.id ? 'border-blue-500 cursor-not-allowed' : 'border-gray-300 cursor-pointer'
                        )}
                     >
                        <div id='file-content-layout' className="w-full flex flex-row items-center justify-between">
                           
                           <div id='left-content' className='flex flex-col items-start gap-0.5'>
                           
                              <div id='1st-line' className="flex items-center gap-2 w-full mb-1">
                                 <FileChart className="size-4" />
                                 <span className="text-xs font-medium truncate break-words">{file.file_name}</span>
                              </div>
                           
                              <span id='2nd-line' className="text-xs text-muted-foreground">{file.date_created}</span>
                           
                           </div>

                           <Badge id='item-count' variant="default" className="text-xs h-4 px-1">
                              {file.item_count}
                           </Badge>

                        </div>
                     </button>
                  ))}
               </div>
            </div>

         </div>


         <div id='sidebar-footer' className='w-full h-fit p-3 border-t border-gray-300 bg-gray-50 flex items-center justify-center gap-3'>
            <span className="text-xs text-muted-foreground text-center">Copyright © 2025 Strapee. <br /> All Rights Reserved.</span>
         </div>


      </div>








      
   )

}


export default SideBar
