import { API_Response } from "@/types/api"

const api_base_url = "http://127.0.0.1:8000"

type api_client_options = {
    method?: 'GET' | 'POST'
    header?: Record<string, string>     // Record -> dictionary type
    body?: object       // object -> any non-primitive type (not string, number, boolean, null, undefined)
}


// async function -> always return a Promise
export async function apiClient<T>(
    api_endpoint: string, 
    api_options: api_client_options = {}
): Promise<T | null> {

    // get method and body from options -> crt 2 variables
        // default method is GET
    const { method = 'GET', body } = api_options


    // create headers object
        // 'content-type': 'application/json' -> tell BE that request's body is JSON.
        // ...options.header -> add additional headers from options if any
    const headers = new Headers({
        'Content-Type': 'application/json',
        ...api_options.header,
    })


    // 'fetch' has 2 arguments: 'url' (required) and 'options' (optional)
        // if options is used -> must be RequestInit type
        // RequestInit -> define all possible options can pass into 'fetch'         
        // not all HTTP requests are allowed to have body (e.g. 'GET' don't have body)
    const options: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    }

    try {
        const response = await fetch(`${api_base_url}${api_endpoint}`, options)

        const content: API_Response<T> = await response.json()

        // in BE response, if content.success is false -> status code is always 4xx or 5xx
        if (content.success) {
            return content.data
        }
        else {
            // this error will caught by catch block
            throw new Error(`BE error | message: ${content.message}`)
        }

    } catch (error) {
        console.error('apiClient error:', error)
        return null
    }

    

    // BE respons's content always have 3 vari of success, message, data -> should apiClient return both message and data to caller?
    // is my current code handles all 3 cases of HTTP protocol? like network error, HTTP error, BE error? to me, HTTP error is also BE error, since if HTTP status code is 4xx or 5xx, BE always return false in success (meaning BE failed its task).





        // export interface API_Response<T> {
        //     success: boolean
        //     message: string | null
        //     data: T | null
        // }





}





// 1/ in api_client_options, what's Record?
// 2/ in api_client_options, why we use 'object' instead of 'any'?
// 3/ what is Promise<T> in our apiClient function?
// "RequestInit -> type of configuration object for fetch API" -> so in order to fetch API, we MUST has a RequestInit object?