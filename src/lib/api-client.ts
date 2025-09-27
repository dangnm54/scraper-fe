import { API_Response, API_Result } from "@/types/api"



// ------------------------------------------------------------------------------------------------


// const api_base_url = "http://127.0.0.1:8000"   // uvicorn
const api_base_url = "http://localhost:8000/"   // docker


type api_client_options = {
    method?: 'GET' | 'POST'
    header?: Record<string, string>
    body?: object
}


type handle_json_mode = "json" | "download"


// ------------------------------------------------------------------------------------------------


// async function -> always return a Promise
export async function apiClient_JSON<T>(
    api_endpoint: string, 
    api_options: api_client_options = {}
): Promise<API_Result<T>> {

    const api_sig: string = `[${api_endpoint.replace('/api','')}] |`

    const { method = 'GET', body = undefined } = api_options

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
        const response: Response = await fetch(`${api_base_url}${api_endpoint}`, options)

        const json_result: Error | API_Result<T> = await handle_json(response, api_sig)

        if (json_result instanceof Error) {
            return {
                message: json_result.message,
                data: null,
                raw_data: (json_result as any).raw_data || null
            }
        } 
        
        else {
            return json_result
        }

    } catch (error: Error | unknown) {
        if (error instanceof Error && error.message === 'Failed to fetch') {
            return {
                message: `${api_sig} Network error | Cannot connect to BE`,
                data: null,
                raw_data: error
            }
        }

        // other error
        return {
            message: error instanceof Error ? error.message : `${api_sig} Unknown error`,
            data: null,
            raw_data: error instanceof Error ? error : null
        }
    }
}





export async function apiClient_Download(
    api_endpoint: string,
    file_name: string
): Promise<API_Result<string> > {

    `
    - received file data from BE
    - create an file-like object in browser's temporary memory space
    - create temporary download link (point to the file-like object's address in browser memory)
    - click the link to download file
    - clean up temporary resource
    `

    const api_sig: string = `[${api_endpoint.replace('/api','')}] |`

    try {
        // in download_api of this app
            // if success -> always return stream
            // if fail -> always return JSON

        // by default, fetch use GET method

        const response: Response = await fetch(`${api_base_url}${api_endpoint}`)

        console.log(`API <${api_endpoint}> response | ${response}`)

        const content_type: string = response.headers.get('content-type') || ''
        
        if (
            content_type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            || content_type.includes('application/octet-stream') // fallback for some servers
        )  {
            
            const blob: Blob = await response.blob()           

            // const csv_blob: Blob = new Blob([blob], { type: "text/csv;charset=utf-8" });

            const url: string = window.URL.createObjectURL(blob)

            const a_element: HTMLAnchorElement = document.createElement('a')
            a_element.href = url
            a_element.setAttribute('download', file_name || '')

            document.body.appendChild(a_element)
            a_element.click()
            a_element.remove()
            window.URL.revokeObjectURL(url)

            return {
                message: `${api_sig} File download successfully`,
                data: 'this string means file downloaded successfully',
                raw_data: null
            }

        } else {

            const json_result: Error | API_Result<null> = await handle_json(response, api_sig, 'download')

            console.log(json_result)

            if (json_result instanceof Error) {
                return {
                    message: json_result.message,
                    data: null,
                    raw_data: (json_result as any).raw_data || null
                }
            } else {
                return {
                    message: `${api_sig} JSON handling error | json of download api should never be API_Result object`,
                    data: null,
                    raw_data: json_result
                }
            }

        }

    } catch (error: Error | unknown) {
        if (error instanceof Error && error.message === 'Failed to fetch') {
            return {
                message: `${api_sig} Network error | Cannot connect to BE`,
                data: null,
                raw_data: error
            }
        }

        // other error
        return {
            message: error instanceof Error ? error.message : `${api_sig} Unknown error`,
            data: null,
            raw_data: error instanceof Error ? error : null
        }
    }
}



async function handle_json<T>(
    response: Response, 
    api_sig: string,
    mode: handle_json_mode = 'json'
): Promise<Error | API_Result<T>> {
    `
    case: API_Result -> message, data, raw_data
    case: Error -> message, raw_data
    `


    let content: API_Response<T>

    // HTTP error
    try {
        content = await response.json()
    } catch (jsonError) {
        const err: Error = new Error(`${api_sig} HTTP error | BE crash while handling request: ${jsonError}`);
        (err as any).raw_data = null
        return err
    }

    // Data contract error
    if (typeof content.success !== 'boolean') {
        const err: Error = new Error(`${api_sig} Data contract error | BE return wrong data type in failed case`);
        (err as any).raw_data = content
        return err
    }

    // for apiClient_Download
    if (mode === 'download') {
        const err: Error = new Error(`${api_sig} Application error | BE return un-desired data: ${content.message}`);
        (err as any).raw_data = content
        return err
    }

    // for apiClient_JSON
    if (content.success) {
        return {
            message: `${api_sig} ${content.message}`, 
            data: content.data, 
            raw_data: content
        }
    }
    else {
        const err: Error = new Error(`${api_sig} Application error | BE return correct-typed but un-desired data: ${content.message}`);
        (err as any).raw_data = content
        return err
    }
}
