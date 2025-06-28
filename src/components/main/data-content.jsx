import * as React from "react";
import * as XLSX from "xlsx"

import { useState, useMemo } from "react";
import { Search } from "lucide-react"

// Sample files data (same as in sidebar)
const sampleFiles = [
   {
      id: 1,
      name: "products_scrape_001.json",
      date: "2025-04-29",
      size: "2.4 MB",
      itemCount: 150,
   },
   {
      id: 2,
      name: "ecommerce_data_002.json",
      date: "2025-04-28",
      size: "1.8 MB",
      itemCount: 120,
   }
]

// Sample data for the selected file
const sampleData = [
   {
      id: 1,
      title: "Bluetooth Headphones",
      price: "$83",
      inStock: 455,
      category: "Electronics",
      warranty: "2 years",
      color: "Black",
      url: "https://example.com/product/1",
   },
   {
      id: 2,
      title: "Smart Fitness Watch",
      price: "$16",
      inStock: 323,
      category: "Wearables",
      warranty: "1 year",
      color: "Silver",
      url: "https://example.com/product/2",
   },
   {
      id: 3,
      title: "Night Vision Goggles",
      price: "$82",
      inStock: 123,
      category: "Wearables",
      warranty: "1 year",
      color: "Silver",
      url: "https://example.com/product/3",
   },
   {
      id: 4,
      title: "Flying Shoes",
      price: "$26",
      inStock: 454,
      category: "Electronics",
      warranty: "1 year",
      color: "Green",
      url: "https://example.com/product/4",
   },
   {
      id: 5,
      title: "Metal Detector",
      price: "$64",
      inStock: 453,
      category: "Electronics",
      warranty: "1 year",
      color: "Silver",
      url: "https://example.com/product/5",
   }
]


const mockFilePath = "D:\software\other\cursor\python\airbnb_proj\file\D3_full_03_06_final.csv"


function DataContent(props) {

   const [selectedFile, setSelectedFile] = useState(sampleFiles[0])
   const [selectedRow, setSelectedRow] = useState(null)
   const [searchTerm, setSearchTerm] = useState("")


   // convert data to worksheet format and create CSV preview

   const { csvData, headers } = useMemo(() => {

      // filter data based on search term
      const filteredData = sampleData.filter( (item) => 
         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.inStock.toString().includes(searchTerm) ||
         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.warranty.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.color.toLowerCase().includes(searchTerm.toLowerCase()) 
      )

      // create worksheet -> worksheet space contain all cells has content
      const worksheet = XLSX.utils.json_to_sheet(filteredData)

      // get headers from worksheet
      // decode range so we can loop through in an ordered and controlled sequences, has number instead of A1, B4
      // worksheet["!ref"] -> describe boundary of worksheet -> smallest range needs to loop through to meet all content-rich cell, but not sure every visited cell has content
      // || -> 'or' operator
      // A1 -> range A1:A1
      // select all data available, if sheet is empty, select A1 to prevent decode_range from crashing
      // decode_range -> return object has start (row and column) and end (row and column) | sample: { s: { c: 0, r: 0 }, e: { c: 6, r: 19 } }
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1")
      const headers = []

      for (let col = range.s.c; col <= range.e.c; col++) {

         // {r: 0, c: 0} is a cell address -> encode address to string "A1"
         const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })

         // worksheet is a dict, key is cell address (eg: A1, B1) -> get cell object
         // cell object contains all info of that cell (eg: value, formula, type, styleetc)
         // .v -> value
         // .f -> formula
         // .t -> type
         // .s -> style
         // .w -> formatted text
         const cell = worksheet[cellAddress]

         // check cell.v b/c cell object can exist without value
         if (cell && cell.v) {
            headers.push(cell.v)
         }
      }

      return {
         csvData: filteredData,
         headers: headers
      }


   }, [searchTerm])



   return (
      <div id="content" className="flex-1 flex flex-row">    {/* need bg */}

         {/* Table section */}
         <div id="table-area" className="flex-1 !min-w-0 p-5 flex flex-col">
            <div id="table-box" className="flex-1 border-2 rounded-lg flex flex-col">   {/* need bg */}

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

               <div id="table-body" className="flex-1 p-5 flex flex-col">      {/* need bg */}
                  <div id="table-border-to-clean-scrollbar" className="size-full border-1 border-gray-400 rounded-xl shadow-md overflow-hidden flex">    {/* need bg */}
                     <div id='table-scroll-area' className='flex-1 overflow-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-white scrollbar-corner-white flex flex-col'>
                        <table id="table-content" className="w-full h-fit text-sm border-collapse">

                           <thead className="w-full sticky top-0 z-10 overflow-x-hidden">
                              <tr>
                                 {headers.map((header, index) => (
                                    <th
                                       key={index}
                                       className="relative text-left py-3 px-4 text-xs font-medium text-gray-800 border-b border-r-0 bg-gray-100 border-gray-400 whitespace-nowrap min-w-[150px]"
                                    >
                                       {header}
                                       <div className={`absolute h-2/5 w-0.5 rounded-md bg-gray-400 right-0 top-1/2 -translate-y-1/2 ${index === headers.length - 1 ? "hidden" : ""}`}>
                                       </div>
                                    </th>
                                 ))}
                              </tr>
                           </thead>

                           <tbody>
                              {csvData.map( (row, rowIndex) => (
                                 <tr
                                    key={rowIndex}
                                    className={`cursor-pointer border-b border-gray-400 hover:bg-blue-50 transition-colors ${selectedRow === row ? "bg-cyan-50" : ""}`}
                                    onClick={() => setSelectedRow(row)}
                                 >
                                    {headers.map( (header, colIndex) => (
                                       <td
                                          key={colIndex}
                                          className="py-3 px-4 text-gray-700 whitespace-nowrap"
                                       >
                                          <div className="max-w-[200px] truncate">
                                             {typeof row[header] === "boolean"
                                                ? row[header] ? "Yes" : "No"
                                                : String(row[header] || "")}
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

            </div>
         </div>

         {/* JSON section*/}
         <div id="json-area" className="w-96 h-full p-5 pl-0">
            <div id="json-box" className="h-full border-2 rounded-lg flex flex-col">

               <div id="json-header" className="h-fit p-5 border-b-2 flex flex-col">
                  <h2 className="text-lg font-medium text-gray-800">JSON Detail</h2>
               </div>

               <div id="json-body" className="flex-1 min-w-0 min-h-0 p-5 flex flex-col gap-2" >
                  { selectedRow ? 
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



