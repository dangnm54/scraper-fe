import { API_Response, API_Result } from "@/types/api"

const api_base_url = "http://127.0.0.1:8000"

type api_client_options = {
    method?: 'GET' | 'POST'
    header?: Record<string, string>
    body?: object
}


// async function -> always return a Promise
export async function apiClient<T>(api_endpoint: string, api_options: api_client_options = {}): Promise<API_Result<T>> {

    const { method = 'GET', body } = api_options

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...api_options.header,
    })

    const options: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    }

    // 3 fundamental error to handle
        // 1/ Network error: FE request never reach BE | occur in 'fetch' block and always have TypeError
        // 2/ HTTP (server) error: BE crash while handling request -> response.json() will failed with syntax error
        // 3/ Application (BE) error: BE finish handling request, return un-desired result but correct type 
        // 4/ Data contract error: BE finish handling request, return wrong data type


    // in this case | for BE response, if content.success is false 
        // -> status_code always 4xx or 5xx
        // -> data always null


    try {
        const response = await fetch(`${api_base_url}${api_endpoint}`, options)

        let content: API_Response<T>

        try {
            content = await response.json()
        } catch (jsonError) {
            throw new Error(`HTTP error | BE crash while handling request: ${jsonError}`)
        }

        if (typeof content.success !== 'boolean') {
            throw new Error(`Data contract error | BE return wrong data type`)
        }

        if (content.success) {
            return {message: content.message, data: content.data}
        }
        else {
            throw new Error(`Application error | BE return correct-typed but un-desired data: ${content.message}`)
        }


    } catch (error: Error | unknown) {
        if (error instanceof Error && error.message === 'Failed to fetch') {
            return {data: null, message: `Network error | Cannot connect to BE`}
        }

        // other error
        return {
            data: null,
            message: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}






