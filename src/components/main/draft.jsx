import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { MonitorCog, RefreshCcw } from "lucide-react";

function SSELog() {
    const [logs, setLogs] = useState([])
    const eventSourceRef = useRef(null)
    const logContainerRef = useRef(null)
    const [refreshTrigger, setRefreshTrigger] = useState(0); // New state to trigger reconnect

    useEffect( () => {
        // Close existing connection if any before opening a new one
        if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
            eventSourceRef.current.close();
            console.log('SSE connection closed before re-establishing');
        }

        eventSourceRef.current = new EventSource('http://127.0.0.1:8000/sse/logs')

        eventSourceRef.current.onopen = () => {
            console.log('SSE connection opened')
            setLogs(prev => [...prev, '--- SSE Connection Opened ---'])
        }

        eventSourceRef.current.onmessage = (event) => {
            console.log('Received SSE event:', event)
            console.log('Received SSE message:', event.data)
            setLogs(prev => [...prev, event.data])
        }

        eventSourceRef.current.onerror = (error) => {
            console.error('SSE error:', error)
            if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
                eventSourceRef.current.close()
            }
            setLogs(prev => [...prev, `--- SSE Error: ${error.message || 'Unknown error'} ---`])
            setLogs(prev => [...prev, `--- SSE Connection Closed ---`])
        }

        return () => {
            if (eventSourceRef.current && eventSourceRef.current.readyState != EventSource.CLOSED) {
                eventSourceRef.current.close()
                console.log('SSE connection closed on component unmount')
            }
        }
    // Add refreshTrigger to the dependency array. Changing this will re-run the effect.
    }, [refreshTrigger])


    useEffect( () => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs])

    const handleRefreshClick = () => {
        setLogs([]); // Clear logs
        setRefreshTrigger(prev => prev + 1); // Increment to trigger the useEffect
    };

    return (
        <div id='sse-log-main' className="min-h-0 min-w-0 h-full w-3/5 overflow-hidden border-2 border-gray-300 rounded-lg flex flex-col">

            <div id='log-header' className="h-fit w-full p-5 border-b-2 flex flex-row items-center justify-between gap-3">
                <div id='left-content' className='flex flex-row items-center justify-start gap-3'>
                    <MonitorCog className="size-5"/>
                    <h2 className="text-lg font-medium text-gray-800">Server Logs</h2>
                </div>

                <RefreshCcw className="size-5 cursor-pointer" onClick={handleRefreshClick} />
            </div>

            <pre
                id="log-content"
                ref={logContainerRef}
                className="min-w-0 min-h-0 flex-1 size-full overflow-y-auto p-5 text-sm bg-gray-100 text-gray-800 whitespace-pre-wrap break-words scrollbar scrollbar-thumb-gray-300 scrollbar-track-white"
            >
                {logs.map( (log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </pre>

        </div>
    )
}

export default SSELog