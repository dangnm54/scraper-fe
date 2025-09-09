
// side-bar ------------------------------------------------------

export type FileMetadata = {
    id: string
    file_name: string
    item_count: number
    date_created: string
}


export type FileList_Response = FileMetadata[]



// config-form ---------------------------------------------------

export type ConfigForm_Payload = {
    file_name: string
    location: string
    num_guest: number
    num_property: number
    collect_host_data?: boolean
    collect_booking_rate?: boolean
}


export type RunScraper_Response = string



// data-content ---------------------------------------------------

export type PropertyDetail = {
    ID: string
    Name: string
    Link: string
    Scrape_status: string
    Guest_num?: number
    Bed_num?: number
    Bath_num?: number
    Location?: string
    Rating_title?: string
    Rating_num?: number
    Rating_star?: number
    [key: string]: any      
        // can have ANY additional properties with string keys
        // and those properties can be of ANY type.
        // all object's keys are string, num will be converted to string

}


export type FileDetail_Response = {
    detail: string
    data: PropertyDetail[]
}



// api client ---------------------------------------------------

export interface API_Response<T> {
    success: boolean
    message: string | null
    data: T | null
}

// data only available for success response
export type API_Result<T> = {
    message: string | null
    data: T | null
}