import * as React from "react";
import { useEffect } from "react";
import DataContent from './data-content';
import DashboardPage from './dr-data-page';


import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

function DataPage(props) {

    // useEffect( () => {
    //     console.log("[DataPage] Global selected file:", props.selectedFile)
    // }, [props.selectedFile])

    return (
        <div id="main-dataview" className="h-full w-full p-2 py-4 flex flex-col gap-2 bg-yellow-50">    {/* need bg */}
            {props.selectedFile ? (
                <>
                    {/* Header */}
                    <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center bg-red-100">    {/* need bg */}
                        <h1 className="text-lg font-medium text-gray-900">{`File: ${props.selectedFile.file_name}`}</h1>  
                        <Button variant="default" className="cursor-pointer gap-3">
                            <Download className="size-4" />
                            <span>CSV</span>
                        </Button>
                    </div>
                    
                    {/* <DashboardPage /> */}
                    <DataContent selectedFile={props.selectedFile}/>
                </>

            ) : (

                <div 
                    id="header" 
                    className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center text-sm"
                > 
                Select file to view detail.
                </div>
            )}
        
        </div>
    )
}

export default DataPage;