import * as React from "react";
import * as XLSX from "xlsx"

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"


// ------------------------------------------------------------------------------------------------


function DataContent(props) {

   const [fileDetail, setFileDetail] = useState([])
   const [header, setHeader] = useState([])
   const [selectedRow, setSelectedRow] = useState(null)
   const [searchTerm, setSearchTerm] = useState("")

   // fetch file detail
   // useEffect( () => {
   //    const fetchDetail = async () => {

   //       // reset all state when new file is loaded
   //       setSelectedRow(null)
   //       setSearchTerm('')

   //       try {
   //          const response = await fetch(`http://127.0.0.1:8000/api/data/file-detail/${props.int2_selectedFile.id}`)

   //          if (!response.ok) {
   //             throw new Error(`HTTP error! status: ${response.status}`);
   //          }

   //          const result = await response.json()

   //          if (result.status === 'success' && Array.isArray(result.data)) {
   //             setFileDetail(result.data)

   //             if (result.data.length > 0) {
   //                setHeader(Object.keys(result.data[0]))
   //             } 
   //             else {
   //                setHeader([])
   //             }

   //             // console.log('[data-content] File detail: ', result.data)
            
   //          }
   //          else {
   //             throw new Error(result.message || 'BE return invalid data format.')
   //          }

   //       } catch (error) {
   //          console.error("[side-bar] Cannot connect to BE |", error);
   //          setFileDetail([])
   //          setHeader([])
   //       }
   //    }

   //    fetchDetail()

   // }, [props.int2_selectedFile])


   const filterdDetail = useMemo( () => {
      if (!searchTerm) {
         return fileDetail
      }

      return fileDetail.filter((item) =>
         item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.Utility_num?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.Rating_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.Rating_num?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.Rating_star?.toLowerCase().includes(searchTerm.toLowerCase()) 
      )

   }, [searchTerm, fileDetail])





   return (
      <div id="data-content-main" className="min-w-0 min-h-0 size-full flex-1 flex flex-row bg-green-100 " >    {/* need bg */}

         {/* Table section */}
         <div id="table-area" className="flex-1 !min-w-0 p-5 bg-blue-200">
            <div id="table-box" className="h-full w-full border-2 rounded-lg flex flex-col overflow-hidden ">   {/* need bg */}

               <div id="table-header" className="h-fit w-full p-5 border-b-2 flex flex-row flex-start items-center">
                  <div id="search-bar" className="flex-shrink-0 h-fit w-96 flex flex-row items-center relative">
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

               <div id="table-body" className="relative flex-1 p-5 bg-red-200 overflow-hidden">      {/* need bg */}
                  {/* <div id="table-border-to-clean-scrollbar" className="h-full min-h-0 w-full border-1 border-gray-400 rounded-xl overflow-hidden flex bg-blue-200">  */}
                     <div id='table-scroll-area' className='h-[00px] w-full overflow-scroll border-1 border-gray-400 rounded-xl scrollbar scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-corner-white  bg-yellow-100 '>
                        {/* <table id="table-content" className="w-full h-fit text-sm border-collapse bg-green-100 ">

                           <thead className="w-full sticky top-0 z-10">
                              <tr>
                                 {header.map((header, index) => (
                                    <th
                                       key={index}
                                       className={cn(
                                          "relative text-left py-3 px-4 text-xs font-medium text-gray-800 border-b border-r-0 border-gray-400 whitespace-nowrap min-w-[120px]",
                                          {
                                             "sticky left-0 z-20 !min-w-[50px]": index === 0,
                                             "sticky left-[50px] z-10": index === 1,
                                          }
                                       )}
                                    >
                                       {header}
                                       <div
                                          id="header-divider"
                                          className={cn(
                                             "absolute right-1.5 top-1/2 -translate-y-1/2 h-2/5 w-0.5 rounded-md bg-gray-400",
                                             index === 0 ? "hidden" : "",
                                             index === header.length - 1 ? "hidden" : "",
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
                                    className={cn(
                                       "group cursor-pointer border-b border-gray-400 transition-colors",
                                       selectedRow === row ? "bg-cyan-50" : ""
                                    )}
                                    onClick={() => setSelectedRow(row)}
                                 >
                                    {header.map((header, colIndex) => (
                                       <td
                                          key={`${rowIndex}-${colIndex}`}
                                          id={`cell-${rowIndex}-${colIndex}`}
                                          className={cn(
                                             "relative py-3 px-4 text-gray-700 whitespace-nowrap group-hover:bg-blue-50 transition-colors",
                                             {
                                                "sticky left-0 z-20": colIndex === 0,
                                                "sticky left-[50px] z-10 !min-w-[450px] !max-w-[450px]": colIndex === 1,
                                             }
                                          )}
                                       >
                                          <div className="truncate">
                                             { String(row[header]) || "" }
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

                        // </table> */}
                     </div>
                  {/* </div> */}
               </div>

            </div>
         </div>

         {/* JSON section*/}
         <div id="json-area" className="w-96 h-full p-5 pl-0 bg-purple-100">
            <div id="json-box" className="h-full border-2 rounded-lg flex flex-col">

               <div id="json-header" className="h-fit p-5 border-b-2 flex flex-col">
                  <h2 className="text-lg font-medium text-gray-800">JSON Detail</h2>
               </div>

               <div id="json-body" className="flex-1 min-w-0 min-h-0 p-5 flex flex-col gap-2" >
                  {selectedRow ?
                     (
                        <pre id="json-content" className="p-2 rounded-md border border-gray-400 text-sm bg-gray-100 text-gray-700 whitespace-pre-wrap overflow-y-auto h-full">
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


      </div>
   )
}

export default DataContent;



