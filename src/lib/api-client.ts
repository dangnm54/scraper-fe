import { API_Response } from "@/types/api"

const api_base_url = "http://127.0.0.1:8000"

type api_client_options = {
    method?: 'GET' | 'POST'
    header?: Record<string, string>
    body?: object
}


export async function apiClient<T>(
    api_endpoint: string, 
    options: api_client_options = {}
): Promise<T> {

    // get method and body from options -> crt 2 variables
        // default method is GET
    const { method = 'GET', body } = options


    // create headers object
        // 'content-type': 'application/json' -> tell BE that request's body is JSON.
        // ...options.header -> add additional headers from options if any
    const headers = new Headers({
        'Content-Type': 'application/json',
        ...options.header,
    })


    // RequestInit -> crt configuration object needed to use 'fetch' for API
        // not all HTTP requests are allowed to have body (e.g. 'GET' don't have body)
    const config: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(`${api_base_url}${api_endpoint}`, config)

}





// 1/ in api_client_options, what's Record?
// 2/ in api_client_options, why we use 'object' instead of 'any'?
// 3/ what is Promise<T> in our apiClient function?
// "RequestInit -> type of configuration object for fetch API" -> so in order to fetch API, we MUST has a RequestInit object?