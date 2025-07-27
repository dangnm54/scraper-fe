import * as React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { MonitorCog, BrushCleaning } from "lucide-react";


// ------------------------------------------------------------------------------------------------


function SSELog(props) {

    const [logs, setLogs] = useState([])
    const eventSourceRef = useRef(null)
    const logContainerRef = useRef(null)
    const [brushClickable, setBrushClickable] = useState(false)

    // console.log('SSELog props:', props)

    useEffect( () => {

        const isScraping = props.app_runButtonClickable === false

        if (isScraping) {

            try {
                setLogs(['[FE] Establishing SSE Connection ...\n-----'])
                eventSourceRef.current = new EventSource('http://127.0.0.1:8000/sse/logs')

                eventSourceRef.current.onopen = () => {
                    setLogs(prev => [...prev, '[FE] SSE Connection Opened\n-----\n\n'])
                    // console.log(eventSourceRef.current)
                }

                eventSourceRef.current.onmessage = (event) => {
                    console.log('SSE message:', event.data)
                    setLogs(prev => [...prev, event.data])
                }

                eventSourceRef.current.onerror = (error) => {
                    console.error('SSE error:', error)
                    setLogs(prev => [...prev, `[FE] SSE ConnectionError: ${error.message || 'Unknown error'}`])

                    eventSourceRef.current.close()
                    setLogs(prev => [...prev, `\n\n-----\n[FE] SSE Connection Closed`])
                }

            } catch (error) {
                console.error('[sse-log] Error:', error)
            }
        }

        // return fx only execute when (1) SSELog component unmount, (2) props.app_runButtonClickable change
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                setLogs(prev => [...prev, `\n\n-----\n[FE] SSE Connection Closed`])
                // console.log(eventSourceRef.current)
            }
        }

    }, [props.app_runButtonClickable])



    useLayoutEffect( () => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs])



    useEffect( () => {
        if (logs.length > 0 && 
            eventSourceRef.current && 
            eventSourceRef.current.readyState === EventSource.CLOSED
        ) {
            setBrushClickable(true)
        }
    }, [logs])


    const cleanLog = () => {
        setLogs([])
        setBrushClickable(false)
    } 






    return (
        <div id='sse-log-main' className="min-h-0 min-w-0 h-full w-3/5 overflow-hidden border-2 border-gray-300 rounded-lg flex flex-col">
            
            {/* Header */}
            <div id='log-header' className="h-fit w-full p-5 border-b-2 flex flex-row items-center justify-between gap-3"> 
                <div id='left-content' className='flex flex-row items-center justify-start gap-3'>
                    <MonitorCog className="size-5"/>
                    <h2 className="text-lg font-medium text-gray-800">Server Logs</h2>
                </div>

                <div 
                    title="Clean message in log" 
                    className="size-5 cursor-pointer hover:text-blue-500"
                    hidden={!brushClickable}
                >
                    <BrushCleaning onClick={cleanLog}/>
                </div>
            </div>

            {/* Content */}
            <pre 
                id="log-content"
                ref={logContainerRef} 
                className="min-w-0 min-h-0 flex-1 size-full overflow-y-auto p-5 text-sm bg-gray-100 text-gray-800 whitespace-pre-wrap break-words scrollbar scrollbar-thumb-gray-300 scrollbar-track-white"
            >
                {logs.map( (log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </pre>

        </div>
    )
}

export default SSELog