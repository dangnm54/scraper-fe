import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils"

import { BugIcon, SearchCode, Database, RotateCcw as Refresh, BrushCleaning as Brush   } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

import { FileMetadata, API_Result, FileList_Response } from '@/types/api'
import { TabType } from '@/types/common'
import { apiClient_JSON } from "@/lib/api-client";


// ------------------------------------------------------------------------------------------------


type SideBar_props = {
   self_currentTab: TabType

   // common way to passed fx as props from parent to child
      // (tab: TabType) -> describe fx's input
      // => void -> fx not return anything
   self_chooseTab: (tab: TabType) => void
   self_chooseFile: (file: FileMetadata) => void
   self_selectedFile: FileMetadata | null
   app_runButtonClickable: boolean
}


// ------------------------------------------------------------------------------------------------


export default function SideBar(props: SideBar_props) {
   const [fileList, setFileList] = useState<FileMetadata[]>([])
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [isError, setIsError] = useState<boolean>(false)
   const [errorMessage, setErrorMessage] = useState<string>('')
   const [refreshClickable, setRefreshClickable] = useState<boolean>(true)
   
   
   const [showFile, setShowFile] = useState<boolean>(
      props.self_currentTab === 'database' ? true : false
   );


   const clickFile = (file: FileMetadata) => {
      props.self_chooseFile(file)
      console.log("[side-bar] Choose file:", file.id)
   }


   const fetchFiles = async () => { 
      setFileList([])
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      setRefreshClickable(false);

      const api_result: API_Result<FileList_Response> = await apiClient_JSON('/api/data/file-list')

      console.log(api_result)

      if (!api_result.data) {
         setErrorMessage(api_result.message)
         console.error(api_result.message)
         setIsError(true)
      } else {
         setFileList(api_result.data)
      }

      setIsLoading(false)
      setRefreshClickable(true)

   }


   // refresh file list when switch to data tab
   useEffect( () => {
      if (props.self_currentTab === 'database') {
         fetchFiles()
      }
   }, [props.self_currentTab])



   return (

      <div id='sidebar-main' className="h-full w-[250px] border-r border-gray-300 flex flex-col bg-gray-100">

         <div id='sidebar-header' className="w-full max-w-full h-fit p-3 px-4 border-b border-gray-300 flex flex-row items-center flex-start gap-3">
            <div className="aspect-square size-11 flex items-center justify-center rounded-lg bg-zinc-900">
               <BugIcon className="size-6 text-white" />
            </div>
            <div className="flex flex-col justify-center gap-0.5">
               <span className="font-semibold text-md">Scrapi</span>
               <span className="text-xs text-muted-foreground">v.beta</span>
            </div>
         </div>


         <div id='sidebar-body' className='min-h-0 relative flex-1 w-full flex flex-col gap-2'>

            {/* Navigation section */}
            <div id='sidebar-navigation-group' className='w-full h-fit p-3 px-4 pt-5 flex flex-col gap-3'>
               
               <div id='group-label-navigation' className='text-sm font-medium text-gray-600'>Navigation</div>
               
               <div id='group-buttons' className='flex flex-col gap-4'>
                  <button
                     onClick={() => { props.self_chooseTab('form'); setShowFile(false) }}
                     className={cn(
                        'w-full h-fit pl-0 flex flex-row items-center gap-3 cursor-pointer',
                        !showFile ? 'text-blue-800' : 'text-gray-900',
                     )}      
                  >
                     <SearchCode className="size-4" />
                     <span className='text-md font-normal'>Run Scraper</span>
                  </button>
                  
                  <button
                     onClick={ props.app_runButtonClickable ? () => { props.self_chooseTab('database'); setShowFile(true) } : undefined }
                     title={ props.app_runButtonClickable ? undefined : 'Database is locked while scraping'}
                     className={cn(
                        'w-full h-fit pl-0 flex flex-row items-center gap-3',
                        showFile ? 'text-blue-800' : 'text-gray-900',
                        props.app_runButtonClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                     )}  
                  >
                     <Database className="size-4" />
                     <span className='text-md font-normal'>Database</span>
                  </button>
               </div>
            
            </div>

            {/* File section */}
            {showFile && 
            <div id='sidebar-file-group' className='min-h-0 flex-1 w-full p-3 px-4 flex flex-col gap-2'>

               <div id='group-label-file' className='h-fit w-full flex flex-row items-center justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Files</span>
                  <div id='icon-group' className='flex flex-row flex-end gap-3'>
                     <Brush 
                        onClick={undefined}
                        className={`!size-4`}
                     /> 
                     <Refresh 
                        onClick={refreshClickable ? fetchFiles : undefined}
                        className={`!size-4 ${refreshClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                     /> 
                  </div>
               </div>

               <div id='file-box' className='min-h-0 flex-1 w-full p-3 overflow-auto bg-white scrollbar scrollbar-thumb-gray-300 scrollbar-track-white border rounded-lg border-gray-300 flex flex-col gap-2 items-center'>

                  {isLoading && <p className="text-center text-sm text-gray-500">Fetching files...</p>}
                  {isError && <p className="text-center text-sm text-red-500"> {errorMessage} </p>}

                  {fileList.map( (file) => (
                     <button
                        key={file.id}
                        id={`file-item-${file.id}`}
                        onClick={props.self_selectedFile?.id === file.id ? undefined : () => clickFile(file)}
                        className={cn(
                           'h-fit w-full p-2 flex border-1 rounded-md',
                           props.self_selectedFile?.id === file.id  
                              ? 'bg-blue-50 border-blue-200 cursor-not-allowed' 
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100 cursor-pointer'
                        )}
                     >
                        <div id='file-content-layout' className="w-full flex flex-row gap-3 items-center justify-between">
                           
                           <div id='left-content' className='w-full h-full overflow-hidden flex flex-col items-start gap-0.5'>
                           
                              <span 
                                 title={file.file_name} 
                                 className={cn(
                                    'text-xs font-medium max-w-full truncate',   // max-w-full is important to show truncate, on this specific level
                                    props.self_selectedFile?.id === file.id 
                                       ? 'text-blue-900 font-medium' 
                                       : 'text-gray-500 font-normal'
                                 )}
                              >
                                 {file.file_name.slice(0, -4)}
                              </span>
                           
                              <span id='2nd-line' className="text-xs text-muted-foreground">{file.date_created}</span>
                           
                           </div>

                           <Badge id='item-count' variant="default" className="w-fit text-xs h-4 px-1">
                              {file.item_count}
                           </Badge>

                        </div>
                        
                     </button>
                  ))}

               </div>
            </div>
            }

         </div>


         <div id='sidebar-footer' className='w-full max-w-full h-fit p-3 border-t border-gray-300 flex items-center justify-center gap-3'>
            <span className="text-xs text-muted-foreground text-center">Copyright © 2025 Scrapi. <br /> All Rights Reserved.</span>
         </div>

         {/* <div id='delete-all-overlay' className='fixed inset-0 z-50 bg-black/30 flex items-center justify-center'>
            <div id='delete-all-dialog' className='h-fit w-fit flex bg-white border border-gray-300 rounded-lg p-4'>
               hehe
            </div>
         </div> */}

      </div>

   )
}

