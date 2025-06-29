import * as React from "react";
import DataContent from './data-content';
import DashboardPage from './draft';

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

function DataPage(props) {

    return (
        <div id="main-dataview" className="flex-1 p-2 flex flex-col gap-2">    {/* need bg */}
            
            {/* Header */}
            <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center">    {/* need bg */}
                <h1 className="text-lg font-medium text-gray-900">{`File <mock_name>`}</h1>
                <Button variant="default" className="cursor-pointer gap-3">
                    <Download className="size-4" />
                    <span>CSV</span>
                </Button>
            </div>
            
            
            {/* <DashboardPage /> */}
            <DataContent />
        
        </div>
    )
}

export default DataPage;