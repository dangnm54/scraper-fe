import React from "react";
import DataContent from './data-content';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function DataPage({ selectedFile }) {

    const handleDownload = async () => {
        if (!selectedFile) {
            console.warn("No file selected for download.");
            return;
        }

        const fileId = selectedFile.id;
        const fileName = selectedFile.file_name;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/data/file-download/${fileId}`); // Updated API endpoint for download

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            console.log(`File ${fileName} downloaded successfully.`);
        } catch (error) {
            console.error("Error during file download:", error);
            alert(`Failed to download file: ${error.message}`);
        }
    };

    return (
        <div id="datapage-main" className="min-w-0 min-h-0 size-full p-2 py-4 flex flex-col gap-2">
            {selectedFile ? (
                <>
                    <div id="header" className="h-fit w-full p-5 pb-0 flex flex-row justify-between items-center">
                        <h1 className="text-lg font-medium text-gray-900">{`File: ${selectedFile.file_name}`}</h1>
                        <Button variant="default" className="cursor-pointer gap-3" onClick={handleDownload}>
                            <Download className="size-4" />
                            <span>CSV</span>
                        </Button>
                    </div>
                    <DataContent selectedFile={selectedFile}/>
                </>
            ) : (
                <div id="header" className="size-full p-5 pb-0 text-md"> Select file to view detail.</div>
            )}
        </div>
    );
}

export default DataPage;