import * as React from "react";
// Remove XLSX import for data parsing, as backend provides JSON directly
// import * as XLSX from "xlsx"

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Remove sampleFiles and sampleData as they will be fetched from the backend
// const sampleFiles = [...]
// const sampleData = [...]
// const mockFilePath = "D:\software\other\cursor\python\airbnb_proj\file\D3_full_03_06_final.csv"


function DataContent({ selectedFile }) { // Receive selectedFile as prop
   const [csvData, setCsvData] = useState([]); // State for fetched CSV data (list of objects)
   const [headers, setHeaders] = useState([]); // State for CSV headers (array of strings)
   const [selectedRow, setSelectedRow] = useState(null); // State for the currently selected row in the table
   const [searchTerm, setSearchTerm] = useState(""); // State for the search input
   const [isLoadingData, setIsLoadingData] = useState(false); // Loading indicator for file content
   const [dataFetchError, setDataFetchError] = useState(false); // Error indicator for file content

   // useEffect to fetch data when selectedFile changes
   useEffect(() => {
      const fetchFileContent = async () => {
         // If no file is selected (e.g., initial load or switched to 'Run Scraper' tab)
         if (!selectedFile) {
            setCsvData([]);
            setHeaders([]);
            setSelectedRow(null); // Clear selected row
            setSearchTerm(""); // Clear search term
            return; // Do nothing if no file is selected
         }

         setIsLoadingData(true);
         setDataFetchError(false);
         setSelectedRow(null); // Clear selected row when a new file is loaded
         setSearchTerm(""); // Clear search term when a new file is loaded

         try {
            // Construct the API URL using the selectedFile's ID
            const response = await fetch(`http://127.0.0.1:8000/api/scraped-files/${selectedFile.id}`);

            // Check if the response was successful (status code 2xx)
            if (!response.ok) {
               // If not successful, throw an error with the status
               const errorData = await response.json(); // Try to parse error message from backend
               throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.detail || 'Unknown error.'}`);
            }

            // Parse the JSON response from the backend
            const result = await response.json();

            // Assuming the backend returns { "status": "success", "data": [...] }
            if (result.status === "success" && Array.isArray(result.data)) {
               setCsvData(result.data); // Update csvData with the fetched array of objects
               // Dynamically get headers from the keys of the first object if data exists
               if (result.data.length > 0) {
                  setHeaders(Object.keys(result.data[0]));
               } else {
                  setHeaders([]); // No data, no headers
               }
               console.log(`Fetched content for file ${selectedFile.file_name}:`, result.data);
            } else {
               // Handle cases where backend returns success but data is not an array or status is not success
               throw new Error(result.message || "Invalid data format from backend.");
            }

         } catch (error) {
            console.error(`Error fetching file content for ${selectedFile.file_name}:`, error);
            setDataFetchError(true); // Set error state
            setCsvData([]); // Clear data on error
            setHeaders([]); // Clear headers on error
         } finally {
            setIsLoadingData(false); // Always set loading to false
         }
      };

      fetchFileContent(); // Call the fetch function
   }, [selectedFile]); // Re-run this effect whenever selectedFile object changes

   // Memoize filtered data based on searchTerm and csvData
   const filteredCsvData = useMemo(() => {
      if (!searchTerm) {
         return csvData; // Return all data if no search term
      }
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return csvData.filter((item) =>
         // Check if any value in the row (item object) includes the search term
         Object.values(item).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
         )
      );
   }, [searchTerm, csvData]); // Re-calculate when searchTerm or csvData changes

   return (
      <div id="content" className="flex-1 flex flex-row">
         {/* Table section */}
         <div id="table-area" className="flex-1 !min-w-0 p-5 flex flex-col">
            <div id="table-box" className="flex-1 border-2 rounded-lg flex flex-col overflow-hidden">
               <div id="table-header" className="h-fit w-full p-5 border-b-2 flex flex-row flex-start items-center">
                  <div id="search-bar" className="flex-shrink-0 h-fit w-96 flex flex-row items-center relative">
                     <Search className="absolute ml-4 self-center size-5 text-gray-400" />
                     <input
                        type="search"
                        placeholder="Search data..."
                        className="w-full h-8 p-5 pl-12 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // Disable search if no file is selected, data is loading, or there's an error
                        disabled={!selectedFile || isLoadingData || dataFetchError}
                     />
                  </div>
               </div>

               <div id="table-body" className="flex-1 p-5 flex flex-col">
                  <div id="table-border-to-clean-scrollbar" className="size-full border-1 border-gray-400 rounded-xl overflow-hidden flex">
                     <div id='table-scroll-area' className='flex-1 overflow-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-corner-white flex flex-col'>
                        {/* Conditional rendering for loading, error, and empty states */}
                        {isLoadingData && <p className="text-center text-sm text-gray-500 p-4">Loading data...</p>}
                        {dataFetchError && <p className="text-center text-sm text-red-500 p-4">Error loading data for this file. <br /> Please check the backend server and file existence.</p>}
                        {!selectedFile && !isLoadingData && !dataFetchError && <p className="text-center text-sm text-gray-500 p-4">Select a file from the sidebar to view its content.</p>}
                        {selectedFile && !isLoadingData && !dataFetchError && filteredCsvData.length === 0 && (searchTerm ? <p className="text-center text-sm text-gray-500 p-4">No matching search results.</p> : <p className="text-center text-sm text-gray-500 p-4">This file is empty or contains no data.</p>)}

                        {/* Render table only if a file is selected, not loading, no error, and there's data */}
                        {selectedFile && !isLoadingData && !dataFetchError && filteredCsvData.length > 0 && (
                           <table id="table-content" className="w-full h-fit text-sm border-collapse">
                              <thead className="w-full sticky top-0 z-10">
                                 <tr>
                                    {headers.map((header, index) => (
                                       <th
                                          key={index}
                                          className={cn(
                                             "relative text-left py-3 px-4 text-xs font-medium text-gray-800 border-b border-r-0 bg-gray-100 border-gray-400 whitespace-nowrap min-w-[120px]",
                                             {
                                                "sticky left-0 z-20 !min-w-[50px]": index === 0,
                                                "sticky left-[50px] z-10 !min-w-[200px]": index === 1,
                                             }
                                          )}
                                       >
                                          {header}
                                          <div
                                             id="header-divider"
                                             className={cn(
                                                "absolute right-1.5 top-1/2 -translate-y-1/2 h-2/5 w-0.5 rounded-md bg-gray-400",
                                                index === 0 ? "hidden" : "",
                                                index === headers.length - 1 ? "hidden" : "",
                                                index === 1 ? "shadow-[-1px_0px_2px_rgba(0,0,0,0.25)]" : ""
                                             )}>
                                          </div>
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              <tbody>
                                 {filteredCsvData.map((row, rowIndex) => (
                                    <tr
                                       key={rowIndex} // Use rowIndex as key for rows
                                       className={cn(
                                          "group cursor-pointer border-b border-gray-400 transition-colors",
                                          selectedRow === row ? "bg-cyan-50" : "bg-white" // Highlight selected row
                                       )}
                                       onClick={() => setSelectedRow(row)} // Set the selected row
                                    >
                                       {headers.map((header, colIndex) => (
                                          <td
                                             key={`${rowIndex}-${colIndex}`} // Unique key for cells
                                             className={cn(
                                                "relative py-3 px-4 text-gray-700 whitespace-nowrap group-hover:bg-blue-50 transition-colors",
                                                selectedRow === row ? "bg-cyan-50" : "bg-white",
                                                {
                                                   "sticky left-0 z-20": colIndex === 0,
                                                   "sticky left-[50px] z-10": colIndex === 1,
                                                }
                                             )}
                                          >
                                             <div className="truncate">
                                                {/* Display boolean as "Yes" or "No" */}
                                                {typeof row[header] === "boolean"
                                                   ? row[header] ? "Yes" : "No"
                                                   : String(row[header] || "")} {/* Convert all values to string */}
                                             </div>
                                             <div
                                                id="cell-divider"
                                                className={colIndex === 1 ?
                                                   "absolute right-1.5 top-1/2 -translate-y-1/2 h-2/5 w-0.5 rounded-md bg-gray-400 shadow-[-1px_0px_2px_rgba(0,0,0,0.25)]" :
                                                   "hidden"}
                                             >
                                             </div>
                                          </td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* JSON section*/}
         <div id="json-area" className="w-96 h-full p-5 pl-0">
            <div id="json-box" className="h-full border-2 rounded-lg flex flex-col">
               <div id="json-header" className="h-fit p-5 border-b-2 flex flex-col">
                  <h2 className="text-lg font-medium text-gray-800">JSON Detail</h2>
               </div>
               <div id="json-body" className="flex-1 min-w-0 min-h-0 p-5 flex flex-col gap-2" >
                  {selectedRow ?
                     (
                        <pre id="json-content" className="p-2 rounded-md border border-gray-400 text-sm bg-gray-100 text-gray-700 whitespace-pre-wrap overflow-y-auto h-full">
                           {JSON.stringify(selectedRow, null, 2)} {/* Pretty-print JSON */}
                        </pre>
                     ) : (
                        <div className="flex items-center justify-center h-32 text-gray-500">
                           {selectedFile ? "Select a row to view JSON" : "Select a file and then a row to view JSON"}
                        </div>
                     )
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default DataContent;