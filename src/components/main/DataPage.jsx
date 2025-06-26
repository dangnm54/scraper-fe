import * as React from "react";
import DataContent from './data-content';
import DashboardPage from './draft';

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

function DataView(props) {

    return (
        <div id="main-dataview" className="flex flex-col p-2 bg-red-300 w-full h-dvh gap-2">
            
            {/* Header */}
            <div id="header" className="flex bg-white p-5 justify-between items-center h-fit">
                <h1 className="text-lg font-medium text-gray-900">{`File <mock_name>`}</h1>
                <Button variant="default" className="cursor-pointer">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Export CSV</span>
                </Button>
            </div>
            
            
            <DashboardPage />
            {/* <DataContent /> */}
        
        </div>
    )
}

export default DataView;