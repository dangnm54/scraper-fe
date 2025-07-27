import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CirclePlay, SearchCode } from 'lucide-react'


function ConfigForm(props) {

   // state for input
   const [fileName, setFileName] = React.useState('')
   const [location, setLocation] = React.useState('')
   const [numGuest, setNumGuest] = React.useState('')
   const [numProperty, setNumProperty] = React.useState('')
   const [hostData, setHostData] = React.useState(false)
   const [bookRate, setBookRate] = React.useState(false)
   

   const runScraper = async (event) => {
      
      if (!fileName || !location || !numGuest || !numProperty) {
         alert('Please fill in all required fields')
         return
      }
      

      // prevent full page reload when button in form is clicked
      event.preventDefault()  

      props.self_setRunButtonClickable(false)

      //construct data payload
      const payload = {
         file_name: fileName,
         location: location,
         num_guest: parseInt(numGuest),
         num_property: parseInt(numProperty),
         collect_host_data: hostData,
         collect_booking_rate: bookRate,
      }

      console.log("Sent payload to BE", payload)

      // make POST request
      try {

         // how FE send HTTP POST request to BE
         const response = await fetch('http://127.0.0.1:8000/api/run', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},    // tells BE that body of request is JSON.
            body: JSON.stringify(payload), // convert JS object to JSON string that BE can parse
         })

         // parse JS response from BE
         const data = await response.json() 

         // handle response
         if (response.ok) {
            // check if HTTP status code is 2xx (success)
            console.log('Scraping finished:', data)

         } else {
            throw new Error(`HTTP error! status: ${response.status}`)  // this message stored in error.message
         }

      } catch (error) {
         console.error('Cannot connect to BE |', error)
      }

      setFileName('')
      setLocation('')
      setNumGuest('')
      setNumProperty('')
      setHostData(false)
      setBookRate(false)
      props.self_setRunButtonClickable(true)

   }





   return (
      <div id='form-main' className="min-h-0 min-w-0 flex-1 size-full flex items-center justify-center">
         <Card id='card-main' className="size-fit p-0 py-4 border-1 border-gray-300 bg-gray-50 flex flex-col gap-5">

            <CardHeader id='card-header' className="w-full h-fit pb-4 border-b-1 border-gray-300 !flex flex-row items-center justify-center gap-4">
               <SearchCode className="size-6" />
               <CardTitle id='card-title' className="text-2xl font-semibold text-center text-gray-900">Scraper Settings</CardTitle>
            </CardHeader>

            <CardContent id='card-content' className="flex flex-col gap-2">

               <div id='field-group' className="space-y-2 mb-5">
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
               </div>

               <div id='field-group' className="space-y-2 mb-5">
                  <Label htmlFor='location' className="text-xl font-medium text-gray-800">
                     Location 
                     <span className="text-red-500">*</span> 
                  </Label>
                  <div className="relative flex items-center gap-2">
                     <Input
                        id='location'
                        type='text'
                        placeholder='eg: District 1, HCM'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
               </div>

               <div id='field-group' className="space-y-2 mb-5">
                  <Label htmlFor='numProperty' className="text-xl font-medium text-gray-800">
                     Number of guests 
                     <span className="text-red-500">*</span> 
                  </Label>
                  <div className="relative flex items-center gap-2">
                     <Input
                        id='numGuest'
                        type='number'
                        placeholder='eg: 2'
                        value={numGuest}
                        onChange={(e) => setNumGuest(e.target.value)}
                        className="h-9 w-65 rounded-sm border-gray-400 bg-white text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
               </div>


               <div id='field-groups' className="space-y-2 mb-5">
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

               <div id='field-group' className="flex flex-col gap-0.5">
                  <Label className="text-xl font-medium text-gray-900 mb-2">Data to collect</Label>
                  <div className="grid grid-rows gap-3">

                     <div id='field-item' className="flex items-center flex-start gap-2">
                        <Checkbox
                           id="hostData"
                           checked={hostData}
                           onCheckedChange={setHostData}
                           className="border-gray-700 bg-white size-4.5"
                        />
                        <Label htmlFor="hostData" className="text-md font-normal">Host data</Label>
                     </div>

                     <div id='field-item' className="flex items-center flex-start gap-2">
                        <Checkbox
                           id="bookRate"
                           checked={bookRate}
                           onCheckedChange={setBookRate}
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
                  onClick={ props.app_runButtonClickable ? runScraper : null}
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

         </Card>
      </div>
   )
}

export default ConfigForm