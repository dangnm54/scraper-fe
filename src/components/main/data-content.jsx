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
        mock: "mock",
        mock2: "mock2",
        mock3: "mock3",
        mock4: "mock4",
        mock5: "mock5",
        mock6: "mock6",
        mock7: "mock7",
        mock8: "mock8",
        mock9: "mock9",
        mock10: "mock10",
        mock11: "mock11",
        mock12: "mock12",
        mock13: "mock13",
        mock14: "mock14",
        mock15: "mock15",
    }
]



function DataContent(props) {

    const [selectedFile, setSelectedFile] = useState(sampleFiles[0])
    const [selectedRow, setSelectedRow] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")


    return (
        <div id="content" className="flex-1 min-h-0 bg-yellow-100 flex flex-row">

            {/* Table section */}
            <div id="table-area" className="flex-1 p-5 h-full">
                haha
            </div>


            {/* JSON section*/}
            <div id="json-area" className="w-96 p-5 pl-0 h-full bg-white">
                <div id="json-box" className="h-full border-2 rounded-lg flex flex-col">
                    
                    <div id="json-header" className="p-5 border-b-2 h-fit flex flex-col">
                        <h2 className="text-lg font-medium text-gray-800 mb-2">JSON Detail</h2>
                        <p className="text-md text-gray-600">
                            {selectedRow ? `JSON data of selected row.` : "Click on row to view JSON data."}
                        </p>
                    </div>

                    <div id="json-body" className="flex-1 min-h-0 p-5 flex flex-col gap-2" >
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