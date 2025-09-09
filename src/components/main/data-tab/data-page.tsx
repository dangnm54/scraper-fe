// import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

import DataContent from './data-content';

import { FileMetadata } from "@/types/api";


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
            const response = await fetch(`http://127.0.0.1:8000/api/data/file-download/${props.app_selectedFile.id}`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        
            // using received data, create a blob object in browser's temporary memory space
                // blob (binary large object) is file-like object of immutable data
            const blob = await response.blob()

            // create DOMString (piece of text) of a URL pointing to blob's address in browser's memory space            
            const url = window.URL.createObjectURL(blob)

            // create <a> element 
            const a_element = document.createElement('a')

            a_element.href = url

            // when element has 'download' attribute, browser treat: 
                // 'href' as download link
                // 'file_name' as name for downloadble file
            a_element.setAttribute('download', props.app_selectedFile?.file_name || '')

            // add <a> to <body>
            document.body.appendChild(a_element)

            // click the hidden <a> -> trigger download
            a_element.click()

            // after download, the temporary <a> is removed to clean up DOM
            a_element.remove()

            // release temporary URL created earlier -> free up memory
            window.URL.revokeObjectURL(url)


        } catch (error) {
            console.error("[data-page] Cannot connect to BE |", error)
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
