import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { MonitorCog } from "lucide-react";

function SSELog() {
    const [logs, setLogs] = useState([])
    const eventSourceRef = useRef(null)
    const logContainerRef = useRef(null)

    return (
        <div id='sse-log-main' className="min-h-0 min-w-0 h-full w-3/5 border-1 border-gray-300 rounded-lg">

        </div>





    )
}

export default SSELog