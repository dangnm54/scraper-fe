// "use client"
import * as React from "react";

import { useState, useEffect, useMemo } from "react"
import { Download, Search } from "lucide-react"
// import { useSearchParams } from "next/navigation"
import * as XLSX from "xlsx"

// Sample files data (same as in sidebar)
const sampleFiles = [
   {
      id: 1,
      name: "products_scrape_001.json",
      date: "2025-04-29T14:30:00",
      size: "2.4 MB",
      itemCount: 150,
   },
   {
      id: 2,
      name: "ecommerce_data_002.json",
      date: "2025-04-28T10:15:00",
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



export default function DashboardPage() {
   // const searchParams = useSearchParams()
   const [selectedFile, setSelectedFile] = useState(sampleFiles[0])
   const [selectedRow, setSelectedRow] = useState(null)
   const [searchTerm, setSearchTerm] = useState("")

   // // Get selected file from URL parameters
   // useEffect(() => {
   //     const fileId = searchParams.get("fileId")
   //     if (fileId) {
   //         const file = sampleFiles.find((f) => f.id === Number.parseInt(fileId))
   //         if (file) {
   //             setSelectedFile(file)
   //         }
   //     }
   // }, [searchParams])



   // Convert data to worksheet format and create CSV preview
   const { worksheet, csvData, headers } = useMemo(() => {
      // Filter data based on search term
      const filteredData = sampleData.filter(
         (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.warranty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.reviews.toString().includes(searchTerm) ||
            item.rating.toString().includes(searchTerm)
      )

      // Create worksheet from filtered data
      const ws = XLSX.utils.json_to_sheet(filteredData)

      // Get headers from the worksheet
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1")
      // console.log(`range: ${range}`)

      const headers = []
      for (let col = range.s.c; col <= range.e.c; col++) {
         const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col })
         // console.log(`cellAddress: ${cellAddress}`)

         const cell = ws[cellAddress]
         // console.log(`cell: ${cell}`)

         if (cell && cell.v) {
            headers.push(cell.v)
         }
      }
      // console.log(`headers: ${headers}`)

      // Convert to CSV for preview
      const csv = XLSX.utils.sheet_to_csv(ws)

      return {
         worksheet: ws,
         csvData: filteredData,
         headers: headers,
      }
   }, [searchTerm])



   const handleExportCSV = () => {
      //     // Export as CSV
      //     const csv = XLSX.utils.sheet_to_csv(worksheet)
      //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      //     const link = document.createElement("a")
      //     const url = URL.createObjectURL(blob)
      //     link.setAttribute("href", url)
      //     link.setAttribute("download", selectedFile.name.replace(".json", ".csv"))
      //     link.style.visibility = "hidden"
      //     document.body.appendChild(link)
      //     link.click()
      //     document.body.removeChild(link)
   }

   return (
      <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
         {/* Header */}
         {/* <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0 w-full">
            <h1 className="text-2xl font-semibold text-gray-900 truncate mr-4">File '{selectedFile.name}' Detail</h1>
            <div className="flex gap-2 flex-shrink-0">
               <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
               >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
               </button>
            </div>
         </div> */}

         {/* Content Area */}
         <div id="hehe" className="flex-1 !bg-blue-200 flex relative min-h-0 w-min  overflow-hidden">
            {/* Data Table */}
            <div className=" p-6 min-w-0 max-w-full overflow-x-hidden">
               <div className="h-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col w-full max-w-full">
                  
                  {/* <div className="p-6 border-b border-gray-200 flex-shrink-0 w-full">
                     <div className="flex items-center justify-between w-full">
                        <h2 className="text-lg font-semibold text-gray-900 flex-shrink-0">CSV Preview</h2>

                        <div className="relative w-64 flex-shrink-0 ml-4">
                           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                           <input
                              type="search"
                              placeholder="Search data..."
                              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                        </div>
                     </div>
                  </div> */}


                  <div className="flex-1 p-6 min-h-0 w-full max-w-full overflow-x-hidden">
                     <div className="h-full border border-gray-200 rounded-md overflow-auto w-full">
                        <div className="min-w-max">
                           
                           <table className="text-sm border-collapse w-full">
                              <thead className="bg-gray-50 sticky top-0 z-10">
                                 <tr>
                                    {headers.map((header, index) => (
                                       <th
                                          key={index}
                                          className="text-left py-3 px-4 font-medium text-gray-900 border-b border-r border-gray-200 last:border-r-0 whitespace-nowrap min-w-[150px]"
                                       >
                                          {header}
                                       </th>
                                    ))}
                                 </tr>
                              </thead>
                              
                              <tbody>
                                 {csvData.map((row, rowIndex) => (
                                    <tr
                                       key={rowIndex}
                                       className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedRow === row ? "bg-blue-50" : ""
                                          }`}
                                       onClick={() => setSelectedRow(row)}
                                    >
                                       {headers.map((header, colIndex) => (
                                          <td
                                             key={colIndex}
                                             className="py-3 px-4 text-gray-700 border-r border-gray-100 last:border-r-0 whitespace-nowrap"
                                          >
                                             <div className="max-w-[200px] truncate">
                                                {typeof row[header] === "boolean"
                                                   ? row[header]
                                                      ? "Yes"
                                                      : "No"
                                                   : String(row[header] || "")}
                                             </div>
                                          </td>
                                       ))}
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        
                        
                        </div>
                        {csvData.length === 0 && (
                           <div className="flex items-center justify-center h-32 text-gray-500">
                              No data found matching your search.
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>



            {/* JSON View */}
            <div className="w-96 p-6 pl-0 flex-shrink-0">
               <div className="h-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                  <div className="p-6 border-b border-gray-200 flex-shrink-0">
                     <h2 className="text-lg font-semibold text-gray-900">JSON Details</h2>
                     <p className="text-sm text-gray-600 mt-1">
                        {selectedRow ? `JSON representation of selected row` : "Click on a table row to view JSON"}
                     </p>
                  </div>
                  <div className="flex-1 p-6 min-h-0">
                     <div className="h-full overflow-auto">
                        {selectedRow ? (
                           <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-md border">
                              {JSON.stringify(selectedRow, null, 2)}
                           </pre>
                        ) : (
                           <div className="flex items-center justify-center h-32 text-gray-500">Select a row to view JSON</div>
                        )}
                     </div>
                  </div>
               </div>
            </div>



         </div>
      </div>
   )
}
