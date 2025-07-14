import * as React from "react";
import { useEffect, useState } from "react";
import DataContent from './data-content';


import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

function DataPage(props) {


    // useEffect( () => {
    //     console.log("[DataPage] Global selected file:", props.int_selectedFile)
    // }, [props.int_selectedFile])


    const downloadFile = async () => {

        `
        - received file data from BE
        - create an file-like object in browser's temporary memory space
        - create temporary download link (point to the file-like object's address in browser memory)
        - click the link to download file
        - clean up temporary resource
        `

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/data/file-download/${props.int_selectedFile.id}`)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        
            // using received data, create a blob object in browser's temporary memory space
                // blob (binary large object) is file-like object of immutable data
            const blob = await response.blob()

            // create DOMString (piece of text) of a URL pointing to blob's address in browser's memory space            
            const url = window.URL.createObjectURL(blob)

            // create <a> element 
            const link = document.createElement('a')

            link.href = url

            // when element has 'download' attribute, browser treat: 
                // 'href' as download link
                // 'file_name' as name for downloadble file
            link.setAttribute('download', props.int_selectedFile.file_name)

            // add <a> to <body>
            document.body.appendChild(link)

            // click the hidden <a> -> trigger download
            link.click()

            // after download, the temporary <a> is removed to clean up DOM
            link.parentNode.removeChild(link)

            // release temporary URL created earlier -> free up memory
            window.URL.revokeObjectURL(url)


        } catch (error) {
            console.error("[data-page] Cannot connect to BE |", error)
        }    
    
    }


    
    return (
        <div id="data-page-main" className="min-w-0 min-h-0 size-full p-2 py-4 flex flex-col gap-2">    {/* need bg */}
            {props.int_selectedFile ? (
                
                <>
                    {/* Header */}
                    <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center">    {/* need bg */}
                        <h1 className="text-lg font-medium text-gray-900">{`File: ${props.int_selectedFile.file_name}`}</h1>  
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
                    <DataContent int2_selectedFile={props.int_selectedFile}/>
                </>

            ) : (

                <div id="header" className="size-full p-5 pb-0 text-md"> Select file to view detail.</div>
            )}
        </div>
    )
}

export default DataPage;