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
      url: "https://example.com/product/1",
      title: "Wireless Bluetooth Headphones",
      price: "$79.99",
      inStock: true,
      category: "Electronics",
      rating: 4.5,
      reviews: 1250,
      warranty: "2 years",
      color: "Black",
   },
   {
      id: 2,
      url: "https://example.com/product/2",
      title: "Smart Fitness Watch",
      price: "$199.99",
      inStock: true,
      category: "Wearables",
      rating: 4.3,
      reviews: 890,
      warranty: "1 year",
      color: "Silver",
   },
   {
      id: 3,
      url: "https://example.com/product/3",
      title: "Night Vision Goggles",
      price: "$199.99",
      inStock: true,
      category: "Wearables",
      rating: 4.3,
      reviews: 343,
      warranty: "1 year",
      color: "Silver",
   },
   {
      id: 4,
      url: "https://example.com/product/4",
      title: "Flying Shoes",
      price: "$199.99",
      inStock: true,
      category: "Electronics",
      rating: 4.3,
      reviews: 623,
      warranty: "1 year",
      color: "Green",
   },
   {
      id: 5,
      url: "https://example.com/product/5",
      title: "Metal Detector",
      price: "$199.99",
      inStock: true,
      category: "Electronics",
      rating: 4.3,
      reviews: 623,
      warranty: "1 year",
      color: "Silver",
   }
]


const mockFilePath = "D:\software\other\cursor\python\airbnb_proj\file\D3_full_03_06_final.csv"


function DataContent(props) {

   const [selectedFile, setSelectedFile] = useState(sampleFiles[0])
   const [selectedRow, setSelectedRow] = useState(null)
   const [searchTerm, setSearchTerm] = useState("")


   // convert data to worksheet format and create CSV preview

   const { csvData, headers } = useMemo(() => {

      // create worksheet -> worksheet space contain all cells has content
      const worksheet = XLSX.utils.json_to_sheet(sampleData)

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
         csvData: sampleData,
         headers: headers
      }


   }, [searchTerm])



   return (
      <div id="content" className="flex-1 bg-yellow-100 flex flex-row">

         {/* Table section */}
         <div id="table-area" className="flex-1 !min-w-0 p-5 flex flex-col">
            <div id="table-box" className="flex-1 bg-blue-200 border-2 rounded-lg flex flex-col">

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

               <div id="table-body" className="flex-1 bg-red-100 p-5 flex flex-col">
                  <div id='table-scroll-area' className='flex-1 overflow-auto flex flex-col'>
                     <table id="table-content" className="w-full h-fit text-sm border-collapse">

                        <thead className="bg-gray-200 w-full sticky top-0 z-10 overflow-x-hidden">
                           <tr>
                              {headers.map((header, index) => (
                                 <th
                                    key={index}
                                    className="text-left py-3 px-4 font-medium text-gray-900 border-b border-r border-gray-900 last:border-r-0 whitespace-nowrap min-w-[150px]"
                                 >
                                    {header}
                                 </th>
                              ))}
                           </tr>
                        </thead>

                        <tbody>
                           {csvData.map( (row, rowIndex) => (
                              <tr
                                 key={rowIndex}
                                 className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedRow === row ? "bg-blue-50" : ""
                                 }`}
                                 onClick={() => setSelectedRow(row)}
                              >
                                 {headers.map( (header, colIndex) => (
                                    <td
                                       key={colIndex}
                                       className="py-3 px-4 text-gray-700 border-r border-gray-100 last:border-r-0 whitespace-nowrap"
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



         {/* JSON section*/}
         <div id="json-area" className="w-96 h-full p-5 pl-0">
            <div id="json-box" className="h-full border-2 rounded-lg flex flex-col">

               <div id="json-header" className="h-fit p-5 border-b-2 flex flex-col">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">JSON Detail</h2>
                  <p className="text-md text-gray-600">
                     {selectedRow ? `JSON data of selected row.` : "Click on row to view JSON data."}
                  </p>
               </div>

               <div id="json-body" className="flex-1 min-w-0 min-h-0 p-5 flex flex-col gap-2" >
                  <pre id="json-content" className="p-2 rounded-md border text-sm bg-gray-200 text-gray-700 whitespace-pre-wrap overflow-y-auto h-full">
                     {JSON.stringify(sampleData[1], null, 2)}
                  </pre>
               </div>
            </div>
         </div>


      </div>
   )
}

export default DataContent;



