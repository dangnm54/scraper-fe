import * as React from "react";
import { useEffect, useState } from "react";
import DataContent from './data-content';
import DashboardPage from './dr-data-page';


import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

function DataPage(props) {


    // useEffect( () => {
    //     console.log("[DataPage] Global selected file:", props.int_selectedFile)
    // }, [props.int_selectedFile])

    
    return (
        <div id="dataview-main" className="min-w-0 min-h-0 size-full p-2 py-4 flex flex-col gap-2 bg-yellow-50">    {/* need bg */}
            {props.int_selectedFile ? (
                
                <>
                    {/* Header */}
                    <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center bg-red-100">    {/* need bg */}
                        <h1 className="text-lg font-medium text-gray-900">{`File: ${props.int_selectedFile.file_name}`}</h1>  
                        <Button variant="default" className="cursor-pointer gap-3">
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