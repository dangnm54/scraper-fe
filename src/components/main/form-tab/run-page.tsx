import ConfigForm from './config-form'
import SSELog from "./sse-log";

import { TabType } from '@/types/common'


// ------------------------------------------------------------------------------------------------


type RunPage_props = {
    app_currentTab: TabType
    app_runButtonClickable: boolean
    form_setRunButtonClickable: (button_state: boolean) => void
}


// ------------------------------------------------------------------------------------------------


export default function RunPage(props: RunPage_props) {

    return (
        <div id="run-page-main" className="min-w-0 min-h-0 size-full p-4 flex flex-row gap-2"> 
            
            <ConfigForm 
                self_setRunButtonClickable={(button_state) => { props.form_setRunButtonClickable(button_state) }}
                app_runButtonClickable={props.app_runButtonClickable}
            />

            <SSELog 
                app_currentTab={props.app_currentTab} 
                app_runButtonClickable={props.app_runButtonClickable}
            />

        </div>

    )
}
