import React, { useState, useEffect, useRef } from 'react';
import { Monitor } from "lucide-react"; // Assuming you have lucide-react for icons

function LogDisplay() {
    const [logs, setLogs] = useState([]);
    const eventSourceRef = useRef(null); // useRef to persist the EventSource object
    const logContainerRef = useRef(null); // Ref for the scrollable log container

    useEffect(() => {
        // Establish EventSource connection when component mounts
        eventSourceRef.current = new EventSource('http://localhost:8000/sse/logs');

        eventSourceRef.current.onopen = () => {
            console.log('SSE connection opened');
            setLogs(prev => [...prev, '--- SSE Connection Opened ---']);
        };

        eventSourceRef.current.onmessage = (event) => {
            // event.data contains the message from the server
            // Append new log messages
            console.log("Received SSE message:", event.data);
            setLogs(prev => [...prev, event.data]);
        };

        eventSourceRef.current.onerror = (error) => {
            console.error('SSE error:', error);
            eventSourceRef.current.close(); // Close the connection on error
            setLogs(prev => [...prev, `--- SSE Error: ${error.message || 'Unknown error'}. Connection closed. ---`]);
            // EventSource automatically tries to reconnect, no need to manually call new EventSource again
        };

        // Clean up EventSource connection when component unmounts
        return () => {
            if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
                eventSourceRef.current.close();
                console.log('SSE connection closed on component unmount');
            }
        };
    }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

    // Auto-scroll to the bottom of the logs whenever logs state updates
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white flex items-center gap-2">
                <Monitor className="size-5" /> Backend Live Logs
            </h2>
            <div
                ref={logContainerRef}
                className="flex-1 overflow-y-auto font-mono text-sm bg-gray-800 p-3 rounded-md custom-scrollbar"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #1f2937' }} // Tailwind for scrollbar
            >
                {logs.map((log, index) => (
                    <p key={index} className="whitespace-pre-wrap leading-tight">
                        {log}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default LogDisplay;