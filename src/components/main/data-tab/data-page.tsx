// import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

import DataContent from './data-content';

import { FileMetadata, API_Response } from "@/types/api";


// ------------------------------------------------------------------------------------------------


type DataPage_props = {
    app_selectedFile: FileMetadata | null
}


// ------------------------------------------------------------------------------------------------


export default function DataPage(props: DataPage_props) {

    // useEffect( () => {
    //     console.log("[DataPage] Global selected file:", props.app_selectedFile)
    // }, [props.app_selectedFile])

    const downloadFile = async () => {
        `
        - received file data from BE
        - create an file-like object in browser's temporary memory space
        - create temporary download link (point to the file-like object's address in browser memory)
        - click the link to download file
        - clean up temporary resource
        `

        if (!props.app_selectedFile) { return }

        try {
            // in this app
                // if success -> always return stream
                // if fail -> always return JSON
            const response: Response = await fetch(`http://127.0.0.1:8000/api/data/file-download/${props.app_selectedFile.id}`)

            const content_type: string = response.headers.get('content-type') || ''
            
            if (content_type.includes('text/csv')) {
                
                const content: Blob = await response.blob()           
                const url: string = window.URL.createObjectURL(content)

                const a_element: HTMLAnchorElement = document.createElement('a')
                a_element.href = url
                a_element.setAttribute('download', props.app_selectedFile?.file_name || '')

                document.body.appendChild(a_element)
                a_element.click()
                a_element.remove()
                window.URL.revokeObjectURL(url)

            } else {

                let content: API_Response<null>

                try {
                    content = await response.json()
                } catch (jsonError) {
                    throw new Error(`HTTP error | BE crash while handling request: ${jsonError}`)
                }

                if (typeof content.success !== 'boolean') {
                    throw new Error(`Data contract error | BE return wrong data type`)
                }

                throw new Error(`Application error | BE return un-desired data: ${content.message}`)
            }

        } catch (error: Error | unknown) {
            if (error instanceof Error && error.message === 'Failed to fetch') {
                console.error(`Network error | Cannot connect to BE`) 
            }

            // other error
            console.error(error instanceof Error ? error.message : 'Unknown error')
        }
    }


    
    return (
        <div id="data-page-main" className="min-w-0 min-h-0 size-full p-2 py-4 flex flex-col gap-2">    {/* need bg */}
            {props.app_selectedFile ? (
                
                <>
                    {/* Header */}
                    <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center">    {/* need bg */}
                        <h1 className="text-lg font-medium text-gray-900">{`File: ${props.app_selectedFile.file_name}`}</h1>  
                        <Button 
                            onClick = {downloadFile}
                            variant = "default" 
                            className="cursor-pointer gap-3"
                        >
                            <Download className="size-4" />
                            <span>CSV</span>
                        </Button>
                    </div>
                    
                    {/* <DashboardPage /> */}
                    <DataContent app_selectedFile={props.app_selectedFile}/>
                </>

            ) : (

                <div id="header" className="size-full p-5 pb-0 text-md"> Select file to view detail.</div>
            )}
        </div>
    )
}
