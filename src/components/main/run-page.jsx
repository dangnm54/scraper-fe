import * as React from "react";

import ConfigForm from './config-form'
import SSELog from "./sse-log";


// ------------------------------------------------------------------------------------------------


function RunPage() {

    return (
        <div id="run-page-main" className="min-w-0 min-h-0 size-full p-4 flex flex-row gap-2"> 
            <ConfigForm />
            <SSELog />

        </div>

    )

}

export default RunPage