import * as React from "react";
import { useState } from "react";


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
        dateScraped: "2025-04-29T14:30:00",
        description: "High-quality wireless headphones",
        brand: "TechBrand",
        model: "WH-1000XM5",
        availability: "In Stock",
        sku: "TB-WH-1000XM5-BLK",
        weight: "250g",
        dimensions: "7.3 x 9.9 x 1.2 inches",
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
        dateScraped: "2025-04-29T14:30:00",
        description: "Advanced fitness tracking",
        brand: "FitTech",
        model: "FT-Watch-Pro",
        availability: "In Stock",
        sku: "FT-WATCH-PRO-SLV",
        weight: "45g",
        dimensions: "1.7 x 1.5 x 0.4 inches",
        warranty: "1 year",
        color: "Silver",
    }
]




function DataContent(props) {

    const [selectedFile, setSelectedFile] = useState(sampleFiles[0])
    const [selectedRow, setSelectedRow] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")


    return (
        <div id="content" className="flex-1 bg-yellow-100 flex flex-row">

            {/* Table section */}
            <div id="table-content" className="flex-1 p-6 bg-blue-300">
                haha
            </div>


            {/* JSON section*/}
            <div id="content-area" className="w-96 p-6 pl-0 flex-shrink-0 bg-green-100 h-full">
                <div id="content-box" className="h-full border-2 border-gray-200 rounded-lg flex flex-col">
                    
                    <div id="content-header" className="p-6 border-b-2 border-gray-200">
                        <h2 className="text-lg font-medium text-gray-800 mb-2">JSON Detail</h2>
                        <p className="text-md text-gray-600">
                            {selectedRow ? `JSON data of selected row.` : "Click on row to view JSON data."}
                        </p>
                    </div>

                    <div id="content-body" className="flex-1 p-6">
                        <div id="content-box" className="h-full overflow-auto">
                            <pre id="json-content" className="bg-gray-50 p-2 rounded-md border text-sm text-gray-700 whitespace-pre-wrap">
                                {JSON.stringify(sampleData[1])}
                            </pre>

                        </div>
                    </div>

                </div>



            </div>


        </div>
    )
}

export default DataContent;