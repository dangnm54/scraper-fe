
// side-bar ------------------------------------------------------

export type FileItem = {
    id: string
    file_name: string
    item_count?: number
    date_created?: string
}


export type FileList_Response = FileItem[]




// config-form ---------------------------------------------------

export type ConfigForm_Payload = {
    file_name: string
    location: string
    num_guest: number
    num_property: number
    collect_host_data?: boolean
    collect_booking_rate?: boolean
}


export type RunScraper_Response = {
    message: string
}

