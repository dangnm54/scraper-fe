import { useState } from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CirclePlay, SearchCode } from 'lucide-react'

import { ConfigForm_Payload, API_Result, RunScraper_Response } from '@/types/api'
import { apiClient_JSON } from "@/lib/api-client";


// ------------------------------------------------------------------------------------------------


type ConfigForm_props = {
   self_setRunButtonClickable: (button_state: boolean) => void
   app_runButtonClickable: boolean
}


// ------------------------------------------------------------------------------------------------


// auto get file_name from selected location


export default function ConfigForm(props: ConfigForm_props) {

   // const [fileName, setFileName] = useState<string>('')
   const [searchUrl, setSearchUrl] = useState<string>('')
   const [numGuest, setNumGuest] = useState<string | null>(null)
   const [numProperty, setNumProperty] = useState<string>('')
   const [hostData, setHostData] = useState<boolean>(false)
   const [bookRate, setBookRate] = useState<boolean>(false)
   

   const runScraper = async (event: React.FormEvent<HTMLFormElement>) => {
      
      if (!searchUrl || !numProperty) {
         alert('Please fill in all required fields')
         return
      }

      // ----------------------------------------

      // prevent full page reload when button in form is clicked
      event.preventDefault()  

      props.self_setRunButtonClickable(false)

      // ----------------------------------------

      function getFileName(url: string) {

         try {
            const wordList: string[] = url.split('/')
            const urlText: string = wordList[4]

            // ----------------------------------------

            const decodedText: string = decodeURIComponent(urlText)
            let vnDecodedText: string = decodedText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            const replacedText: Record<string, string> = {
               'đ': 'd', 'Đ': 'D',
               'ă': 'a', 'Ă': 'A',
               'â': 'a', 'Â': 'A',
               'ê': 'e', 'Ê': 'E',
               'ô': 'o', 'Ô': 'O',
               'ơ': 'o', 'Ơ': 'O',
               'ư': 'u', 'Ư': 'U',
            }

            for (const [vnChar, enChar] of Object.entries(replacedText)) {
               vnDecodedText = vnDecodedText.replace(new RegExp(vnChar, 'g'), enChar)
            }
            vnDecodedText = vnDecodedText.toLowerCase()

            // ----------------------------------------

            let fileName: string

            if (vnDecodedText.includes('nearby')) {
               fileName = 'nearby'
            }
            else {
               const fileName0: string = vnDecodedText.replace(/--/g, '-')
               fileName = fileName0.replace(/-/g, '_')
            }

            return fileName

         } catch (error) {
            console.error('[config-form | getFileName] Error getting file name:', error)
            return 'unknown'
         }
      }

      // ----------------------------------------

      const fileName: string = getFileName(searchUrl)
         
      //construct data payload
      const payload: ConfigForm_Payload = {
         file_name: fileName,
         search_url: searchUrl,
         num_guest: numGuest ? parseInt(numGuest, 10) : null, // radix 10 -> use number 0-9
         num_property: parseInt(numProperty, 10),
         collect_host_data: hostData,
         collect_booking_rate: bookRate,
      }

      console.log("Sent payload to BE", payload)

      // ----------------------------------------

      try {
         const api_result: API_Result<RunScraper_Response> = await apiClient_JSON(
            '/api/run',
            {method: 'POST', body: payload }
         )

         console.log(api_result)

         if (!api_result.data) {
            console.error(api_result.message)
         }

      } catch (error) {
         console.error('[config-form] UnexpectedError:', error)
      
      } finally {
         // setFileName('')
         setSearchUrl('')
         setNumGuest(null)
         setNumProperty('')
         setHostData(false)
         setBookRate(false)
         props.self_setRunButtonClickable(true)
      }
      
   }


   return (
      <div id='form-main' className="min-h-0 min-w-0 flex-1 size-full flex items-center justify-center">
         <Card id='card-main' className="size-fit p-0 py-4 border-1 border-gray-300 bg-gray-50 flex flex-col gap-5">

            <CardHeader id='card-header' className="w-full h-fit pb-4 border-b-1 border-gray-300 !flex flex-row items-center justify-center gap-4">
               <SearchCode className="size-6" />
               <CardTitle id='card-title' className="text-2xl font-semibold text-center text-gray-900">Scraper Settings</CardTitle>
            </CardHeader>

            <form id='form-main' onSubmit={runScraper}>
               <CardContent id='card-content' className="flex flex-col gap-2">

                  {/* <div id='file-name-field' className="space-y-2 mb-5">
                     <Label htmlFor='location' className="text-xl font-medium text-gray-800">
                        File name 
                        <span className="text-red-500">*</span> 
                     </Label>
                     <div className="relative flex items-center gap-2">
                        <Input
                           id='location'
                           type='text'
                           placeholder='eg: D1_HCM'
                           value={fileName}
                           onChange={(e) => setFileName(e.target.value)}
                           className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div> */}

                  <div id='location-field' className="space-y-2 mb-5">
                     <Label htmlFor='location' className="text-xl font-medium text-gray-800">
                        Search URL 
                        <span className="text-red-500">*</span> 
                     </Label>
                     <div className="relative flex items-center gap-2">
                        <Input
                           id='location'
                           type='text'
                           placeholder='url of the search result page...'
                           value={searchUrl}
                           onChange={(e) => setSearchUrl(e.target.value)}
                           className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>

                  <div id='guest-num-field' className="space-y-2 mb-5">
                     <Label htmlFor='numProperty' className="text-xl font-medium text-gray-800">
                        Number of guests
                     </Label>
                     <div className="relative flex items-center gap-2">
                        <Input
                           id='numGuest'
                           type='number'
                           placeholder='eg: 2'
                           value={numGuest ?? ''}
                           onChange={(e) => setNumGuest(e.target.value)}
                           className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>


                  <div id='property-num-field' className="space-y-2 mb-5">
                     <Label htmlFor='numProperty' className="text-xl font-medium text-gray-800">
                        Number of properties 
                        <span className="text-red-500">*</span> 
                     </Label>
                     <div className="relative flex items-center gap-2">
                        <Input
                           id='numProperty'
                           type='number'
                           placeholder='eg: 10'
                           value={numProperty}
                           onChange={(e) => setNumProperty(e.target.value)}
                           className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>

                  <div id='data-collect-group' className="flex flex-col gap-0.5 mb-5">
                     <Label className="text-xl font-medium text-gray-900 mb-2">Data to collect</Label>
                     <div className="grid grid-rows gap-3">

                        <div id='field-item' className="flex items-center flex-start gap-2">
                           <Checkbox
                              id="basicData"
                              checked={true}
                              disabled={true}
                              className="border-gray-700 bg-white size-4.5 !opacity-40"
                           />
                           <Label htmlFor="hostData" className="text-md font-normal !opacity-100">Basic data</Label>
                        </div>


                        <div id='field-item' className="flex items-center flex-start gap-2">
                           <Checkbox
                              id="hostData"
                              checked={hostData}
                              onCheckedChange={(checked: boolean) => setHostData(checked)}
                              className="border-gray-700 bg-white size-4.5"
                           />
                           <Label htmlFor="hostData" className="text-md font-normal">Host data</Label>
                        </div>

                        <div id='field-item' className="flex items-center flex-start gap-2">
                           <Checkbox
                              id="bookRate"
                              checked={bookRate}
                              onCheckedChange={(checked: boolean) => setBookRate(checked)}
                              className="border-gray-700 size-4.5"
                           />
                           <Label htmlFor="bookRate" className="text-md font-normal">Booking rate</Label>
                        </div>
                     </div>
                  </div>

               </CardContent>

               <CardFooter id='card-footer' className="pt-4 items-center justify-center border-t-1 border-gray-300">
                  <Button
                     id='run-button'
                     type='submit'
                     title={ props.app_runButtonClickable ? '' : 'Wait for current scraping to finish'}
                     className={cn(
                        "size-full py-2 gap-2",
                        props.app_runButtonClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'
                     )}
                  >
                     <CirclePlay className="size-4.5" />
                     <p className="text-lg font-medium">Run</p>
                  </Button>
               </CardFooter>
            </form>
         </Card>
      </div>
   )
}
