import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { MonitorCog } from "lucide-react";
import { error } from "console";

function SSELog() {
    const [logs, setLogs] = useState([])
    const eventSourceRef = useRef(null)
    const logContainerRef = useRef(null)


    useEffect( () => {
        eventSourceRef.current = new EventSource('http://127.0.0.1:8000/sse/logs')

        eventSourceRef.current.onopen = () => {
            console.log('SSE connection opened')
            setLogs(prev => [...prev, '--- SSE Connection Opened ---'])
        }

        eventSourceRef.current.onmessage = (event) => {
            // event.data contains message from BE
            console.log('Received SSE message:', event.data)
            setLogs(prev => [...prev, event.data])
        }

        eventSourceRef.current.onerror = (error) => {
            console.error('SSE error:', error)
            eventSourceRef.current.close()
            setLogs(prev => [...prev, `--- SSE Error: ${error.message || 'Unknown error'} ---`])
            setLogs(prev => [...prev, `--- SSE Connection Closed ---`])
        }

        return () => {
            if (eventSourceRef.current && eventSourceRef.current.readyState != EventSource.CLOSED) {
                eventSourceRef.current.close()
                console.log('SSE connection closed on component unmount')
            }
        }

        // [] -> only run once when component first mount (appear on screen), and clean-
    }, [])


    useEffect( () => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.scrollHeight
        }
    }, [logs])



    return (
        <div id='sse-log-main' className="min-h-0 min-w-0 h-full w-3/5 overflow-hidden border-2 border-gray-300 rounded-lg flex flex-col">
            
            <div id='log-header' className="h-fit w-full p-5 border-b-2"> 
                <h2 className="text-lg font-medium text-gray-800">Server Logs</h2>
            </div>

            <pre 
                id="log-content"
                ref={logContainerRef} 
                className="min-w-0 min-h-0 flex-1 size-full overflow-y-auto p-5 text-sm bg-gray-100 text-gray-800 whitespace-pre-wrap break-words scrollbar scrollbar-thumb-gray-300 scrollbar-track-white"
            >
                {logs.map( (log, index) => {
                    <p key={index}>{log}</p>
                })}
            </pre>

        </div>





    )
}

export default SSELog