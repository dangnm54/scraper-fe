// import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

import DataContent from './data-content';

import { FileMetadata, API_Result } from "@/types/api";
import { apiClient_Download } from "@/lib/api-client";

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

        if (!props.app_selectedFile) { return }

        const api_result: API_Result<string> = await apiClient_Download(
            `/api/data/file-download/${props.app_selectedFile.id}`,
            props.app_selectedFile?.file_name
        )

        console.log(api_result)

        if (!api_result.data) {
            console.error(api_result.message)
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
