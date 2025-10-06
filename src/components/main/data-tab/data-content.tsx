// import * as React from "react";
// import * as XLSX from "xlsx"

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

import { FileMetadata, PropertyDetail, API_Result, FileDetail_Response } from "@/types/api";
import { apiClient_JSON } from "@/lib/api-client";


// ------------------------------------------------------------------------------------------------


type DataContent_props = {
   app_selectedFile: FileMetadata
}


// ------------------------------------------------------------------------------------------------


function DataContent(props: DataContent_props) {

   const [fileDetail, setFileDetail] = useState<PropertyDetail[]>([])
   const [headers, setHeaders] = useState<string[]>([])
   const [selectedRow, setSelectedRow] = useState<PropertyDetail | null>(null)
   const [searchTerm, setSearchTerm] = useState<string>("")

   // fetch file detail
   useEffect( () => {
      const fetchDetail = async () => {

         // reset all state when new file is loaded
         setSelectedRow(null)
         setSearchTerm("")

         const api_result: API_Result<FileDetail_Response> = await apiClient_JSON(`/api/data/file-detail/${props.app_selectedFile.id}`)

         console.log(api_result)

         if (!api_result.data) {
            console.error(api_result.message)
         } else {
            const file_data = api_result.data.file_data
            setFileDetail(file_data)

            const allHeaders = Object.keys(file_data[0])
            const filteredHeaders = allHeaders.filter(h => h !== 'id')
            setHeaders(filteredHeaders)
         }
      }

      fetchDetail()

   }, [props.app_selectedFile])


   const filterdDetail = useMemo( () => {
      if (!searchTerm) {
         return fileDetail
      }

      return fileDetail.filter((item) =>
         item.prop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||

         String(item.guest_num)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.bed_num)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.bath_num)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.location).toLowerCase().includes(searchTerm.toLowerCase()) ||

         String(item.rating_title)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.rating_star)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.rating_num)?.toLowerCase().includes(searchTerm.toLowerCase()) ||

         String(item.host_name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.host_title)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.host_rating_star)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(item.host_rating_num)?.toLowerCase().includes(searchTerm.toLowerCase())
      )

   }, [searchTerm, fileDetail])





   return (
      <div id="data-content-main" className="min-w-0 min-h-0 flex-1 size-full flex flex-row" data-bg='need bg'>

         {/* Table section */}
         <div id="table-area" className="min-w-0 min-h-0 flex-1 size-full p-5 flex flex-col"  data-bg='need bg'>

            <div id="table-header" className="h-fit w-full p-5 border-2 rounded-tl-lg rounded-tr-lg flex flex-row flex-start items-center">
               <div id="search-bar" className="min-w-0 h-fit w-96 flex flex-row items-center relative">
                  <Search className="absolute ml-4 self-center size-5 text-gray-400" />
                  <input
                     type="search"
                     placeholder="Search data..."
                     className="w-full h-8 p-5 pl-12 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>

            <div id="table-body" className="min-w-0 min-h-0 flex-1 size-full p-5 border-2 border-t-0 rounded-bl-lg rounded-br-lg" data-bg='need bg'>
               <div id='table-scroll-area' className='min-w-0 min-h-0 size-full overflow-auto border-1 border-gray-400 rounded-lg scrollbar scrollbar-thumb-gray-300 scrollbar-track-white scrollbar-corner-white' data-bg='need bg'>
                  <table id="table-content" className="min-w-0 min-h-0 w-full h-fit text-sm border-collapse bg-white " data-bg='need bg'>

                     <thead className="w-full h-fit sticky top-0 z-20">
                        <tr>
                           {headers.map((header, index) => (
                              <th
                                 key={index}
                                 data-ori-idx = {index}
                                 data-par-idx = {headers.length - 1}
                                 className={cn(
                                    "relative text-left py-3 px-4 text-xs font-medium bg-gray-800 text-white border-b-1 border-r-0 border-gray-400 whitespace-nowrap min-w-[120px]",
                                    {
                                       "sticky left-0 z-10 !min-w-[100px]": index === 0,
                                       "sticky left-[100px] z-10": index === 1,
                                    }
                                 )}
                              >
                                 {header}
                                 <div
                                    id="header-divider"
                                    className={cn(
                                       "absolute right-1 top-1/2 -translate-y-1/2 h-2/5 w-0.5 rounded-md bg-gray-400",
                                       index === headers.length - 1 ? "hidden" : "",
                                       index === 1 ? "shadow-[-1px_0px_2px_rgba(0,0,0,0.25)]" : ""

                                    )}>
                                 </div>
                              </th>
                           ))}
                        </tr>
                     </thead>

                     <tbody>
                        {filterdDetail.map((row, rowIndex) => (
                           <tr
                              key={rowIndex}
                              className="size-full group cursor-pointer border-b border-gray-400 transition-colors"
                              onClick={() => setSelectedRow(row)}
                           >
                              {headers.map((header, colIndex) => (
                                 <td
                                    key={`${rowIndex}-${colIndex}`}
                                    id={`cell-${rowIndex}-${colIndex}`}
                                    title={colIndex === 1 ? String(row[header]) : undefined}
                                    className={cn(
                                       "relative py-3 px-4 bg-white text-gray-700 whitespace-nowrap group-hover:bg-blue-50 transition-colors",
                                       {
                                          "sticky left-0 z-10 !min-w-[100px]": colIndex === 0,
                                          "sticky left-[100px] z-10 max-w-[300px]": colIndex === 1,
                                       },
                                       selectedRow === row ? "bg-cyan-50" : ""
                                    )}
                                 >
                                    <div className="truncate">
                                       { (colIndex === 2 || colIndex === 8 || colIndex === 17) && 
                                          row[header] != null &&
                                          String(row[header]) !== 'null'
                                       ? (
                                          <a href={String(row[header])} target="_blank" rel="noopener noreferrer" className="text-blue-600 !underline">
                                             {String(row[header])}
                                          </a>
                                       ) : (
                                          row[header] === null || String(row[header]) === 'null' ? '-' : String(row[header])
                                       )}
                                    </div>

                                    <div
                                       id="cell-divider"
                                       className={colIndex === 1 ?
                                          "absolute right-1.5 top-1/2 -translate-y-1/2 h-full w-[1px] rounded-md bg-gray-400 shadow-[-1px_0px_2px_rgba(0,0,0,0.25)]" :
                                          "hidden"}
                                    >
                                    </div>
                                 </td>
                              ))}
                           </tr>
                        ))}
                     </tbody>

                  </table>
               </div>   
            </div>

         </div>

         {/* JSON section*/}
         <div id="json-area" className="min-w-0 min-h-0 w-96 h-full p-5 pl-0 flex flex-col">

            <div id="json-header" className="h-fit w-full p-5 border-2 rounded-tl-lg rounded-tr-lg flex flex-col">
               <h2 className="text-lg font-medium text-gray-800">JSON Detail</h2>
            </div>

            <div id="json-body" className="min-w-0 min-h-0 flex-1 size-full border-2 rounded-bl-lg border-t-0 rounded-br-lg p-5 gap-2" >
               {selectedRow ?
                  (
                     <pre id="json-content" className="min-w-0 min-h-0 size-full p-2 rounded-md border border-gray-400 text-sm bg-gray-100 text-gray-700 whitespace-pre-wrap break-words overflow-y-auto scrollbar scrollbar-thumb-gray-300 scrollbar-track-white">
                        {JSON.stringify(selectedRow, null, 2)}
                     </pre>
                  ) : (
                     <div className="flex items-center justify-center h-32 text-gray-500">
                        Select a row to view JSON
                     </div>
                  )
               }
            </div>
         </div>

      </div>
   )
}

export default DataContent;



