import * as React from "react";

import ConfigForm from './config-form'
import SSELog from "./sse-log";


// ------------------------------------------------------------------------------------------------


function RunPage(props) {

    return (
        <div id="run-page-main" className="min-w-0 min-h-0 size-full p-4 flex flex-row gap-2"> 
            <ConfigForm int_currentTab={props.int_currentTab}/>
            <SSELog app_currentTab={props.app_currentTab}/>

        </div>

    )
}

export default RunPage