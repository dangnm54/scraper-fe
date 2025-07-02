// frontend/src/components/ConfigForm.jsx (or similar file)
import React, { useState } from 'react';
// Import any UI components like Input, Button, Checkbox etc. if you're using them


function ConfigForm() {
    // State for text inputs
    const [location, setLocation] = useState('');
    const [numGuests, setNumGuests] = useState('');
    const [numProperties, setNumProperties] = useState('');

    // State for checkboxes (matching your form image)
    const [collectOverviewData, setCollectOverviewData] = useState(false);
    const [collectHostData, setCollectHostData] = useState(false);
    const [collectBookingRate, setCollectBookingRate] = useState(false);

    // ... (other states or functions you might have) ...

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // 2. Construct the Data Payload
        // Ensure these keys match your Pydantic model (ScraperSettings) in main.py
        const payload = {
            location: location,
            num_guests: parseInt(numGuests), // Convert string to number
            num_properties: parseInt(numProperties), // Convert string to number
            collect_overview_data: collectOverviewData,
            collect_host_data: collectHostData,
            collect_booking_rate: collectBookingRate,
            // You can also add a 'file_name' here if you want frontend to control it:
            // file_name: `scrape_${new Date().toISOString().slice(0, 10)}`, // Example: scrape_2025-07-01
        };

        console.log("Sending payload to backend:", payload);

        // 3. Make the POST Request
        try {
            const response = await fetch('http://localhost:8000/api/scrape/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Convert JavaScript object to JSON string
            });

            const data = await response.json(); // Parse the JSON response from the backend

            // 4. Handle the Response
            if (response.ok) { // Check if the HTTP status code is 2xx (success)
                console.log('Scraping request successful:', data);
                alert(`Scraping initiated successfully! Message: ${data.message}`);
                // Optionally, you might want to redirect to a results page
                // or show a success message in the UI.
            } else {
                console.error('Scraping request failed:', data);
                alert(`Error: ${data.message || 'Unknown error during scraping.'}`);
            }
        } catch (error) {
            console.error('Network error or unexpected issue:', error);
            alert('Could not connect to the backend API. Please ensure the backend server is running.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="scraper-settings-form">
            {/* Input fields for Location, Number of guests, Number of properties */}
            <div>
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="eg: District 1, HCM"
                    required
                />
            </div>
            <div>
                <label htmlFor="numGuests">Number of guests</label>
                <input
                    type="number"
                    id="numGuests"
                    value={numGuests}
                    onChange={(e) => setNumGuests(e.target.value)}
                    placeholder="eg: 2"
                    required
                />
            </div>
            <div>
                <label htmlFor="numProperties">Number of properties</label>
                <input
                    type="number"
                    id="numProperties"
                    value={numProperties}
                    onChange={(e) => setNumProperties(e.target.value)}
                    placeholder="eg: 10"
                    required
                />
            </div>

            {/* Checkboxes for Data to collect */}
            <div className="data-to-collect">
                <label>Data to collect</label>
                <div>
                    <input
                        type="checkbox"
                        id="overviewData"
                        checked={collectOverviewData}
                        onChange={(e) => setCollectOverviewData(e.target.checked)}
                    />
                    <label htmlFor="overviewData">Overview data</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="hostData"
                        checked={collectHostData}
                        onChange={(e) => setCollectHostData(e.target.checked)}
                    />
                    <label htmlFor="hostData">Host data</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="bookingRate"
                        checked={collectBookingRate}
                        onChange={(e) => setCollectBookingRate(e.target.checked)}
                    />
                    <label htmlFor="bookingRate">Booking rate</label>
                </div>
            </div>

            {/* The Run button */}
            <button type="submit">Run</button>
        </form>
    );
}

export default ConfigForm;