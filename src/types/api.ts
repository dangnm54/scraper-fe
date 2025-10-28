
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
    search_url: string
    num_guest: number | null
    num_property: number
    collect_host_data?: boolean
    collect_booking_rate?: boolean
}


export type RunScraper_Response = string



// data-content ---------------------------------------------------

export type PropertyDetail = {
    id: string
    
    prop_code: string
    prop_name: string
    prop_link: string

    scrape_result: string

    guest_num?: number
    bed_num?: number
    bath_num?: number
    location: string
    ggmap_link: string

    rating_title?: string
    rating_star?: number
    rating_num?: number

    host_name?: string
    host_title ?: string
    host_rating_star?: number
    host_rating_num?: number
    host_exp?: string
    host_link?: string
    
    this_month_booked_rate?: number
    next_1_month_booked_rate?: number
    next_3_month_booked_rate?: number

    // when define key-value pair as above
        // can only access properties using exact name (eg: row.id)
        // cannot use row['id'] -> b/c typescript don't know if string key is valid or not

    [key: string]: any  
    // tell typescript
        // this object can have more key-value pair besides the mentioned pairs
        // but for new pair, key must be 'string' type
        // by this, also allow this object's properties to be accessed using 'string' keys
}


export type FileDetail_Response = {
    file_name: string
    file_data: PropertyDetail[]
}



// delete-all-dialog ---------------------------------------------------


export type DeleteAllPassword_Payload = {
    password: string
}


export type DeleteAll_Response = {
    deleted_file_cnt: number
    deleted_row_cnt: number
}



// api client ---------------------------------------------------

export interface API_Response<T> {
    success: boolean
    message: string
    data: T | null
}


// data only available for success response
export type API_Result<T> = {
    message: string
    data: T | null
    raw_data: object | null
}