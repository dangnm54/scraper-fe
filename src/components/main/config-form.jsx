import * as React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button'; 
import { Checkbox } from '@/components/ui/checkbox'; 
import { CirclePlay, SearchCode } from 'lucide-react'


function ConfigForm() {

    // state for input
    const [location, setLocation] = React.useState('')
    const [numGuest, setNumGuest] = React.useState('')
    const [numProperty, setNumProperty] = React.useState('')

    // state for checkbox
    const [overviewData, setOverviewData] = React.useState(false)
    const [hostData, setHostData] = React.useState(false)
    const [bookRate, setBookRate] = React.useState(false)

    const saveConfig = () => {
        console.log("Saving Configuration:", `
            location: ${location},
            numGuest: ${numGuest},
            numProperty: ${numProperty},
            overviewData: ${overviewData},
            hostData: ${hostData},
            bookRate: ${bookRate},
        `);

        setLocation('')
        setNumGuest('')
        setNumProperty('')
        setOverviewData(false)
        setHostData(false)
        setBookRate(false)

        alert('Configuration Saved! Check console log for details.')
    }


    return (
        <div id='form-main' className="size-full items-center justify-center flex">
        <Card id='card-main' className="w-full size-fit p-0 py-4 dark:bg-zinc-900 dark:text-white flex flex-col gap-5">
            
            <CardHeader id='card-header' className="w-full h-fit pb-4 border-b-2 border-gray-200 !flex flex-row items-center justify-center gap-4">
                <SearchCode className="size-6" />
                <CardTitle id='card-title' className="text-2xl font-semibold text-center text-gray-900">Scraper Settings</CardTitle>
            </CardHeader>

            <CardContent id='card-content' className="flex flex-col gap-2">
                <div id='field-group' className="space-y-2 mb-5">
                    <Label htmlFor='location' className="text-xl font-medium text-gray-800">Location</Label>
                    <div className="relative flex items-center gap-2">
                        <Input
                            id='location'
                            type='text'
                            placeholder='eg: District 1, HCM'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="h-9 w-65 rounded-sm border-gray-600 text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div id='field-group' className="space-y-2 mb-5">
                    <Label htmlFor='numProperty' className="text-xl font-medium text-gray-800">Number of guests</Label>
                    <div className="relative flex items-center gap-2">
                        <Input
                            id='numGuest'
                            type='number'
                            placeholder='eg: 2'
                            value={numGuest}
                            onChange={(e) => setNumGuest(e.target.value)}
                            className="h-9 w-65 rounded-sm border-gray-600 text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>


                <div id='field-groups' className="space-y-2 mb-5">
                    <Label htmlFor='numProperty' className="text-xl font-medium text-gray-800">Number of properties</Label>
                    <div className="relative flex items-center gap-2">
                        <Input
                            id='numProperty'
                            type='number'
                            placeholder='eg: 10'
                            value={numProperty}
                            onChange={(e) => setNumProperty(e.target.value)}
                            className="h-9 w-65 rounded-sm border-gray-600 text-lg placeholder:text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div id='field-group' className="flex flex-col gap-0.5">
                    <Label className="text-xl font-medium text-gray-900 mb-2">Data to collect</Label>
                    <div className="grid grid-rows gap-3">
                        <div id='field-item' className="flex items-center flex-start gap-2">
                            <Checkbox
                                id="overviewData"
                                checked={overviewData}
                                onCheckedChange={setOverviewData}
                                className="border-gray-700 size-4.5"
                            />
                            <Label htmlFor="overviewData" className="text-md font-normal">Overview data</Label>
                        </div>

                        <div id='field-item' className="flex items-center flex-start gap-2">
                            <Checkbox
                                id="hostData"
                                checked={hostData}
                                onCheckedChange={setHostData}
                                className="border-gray-700 size-4.5"
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

            <CardFooter id='card-footer' className="pt-4 flex items-center justify-center border-t-2 border-gray-200">
                <Button 
                    id='run-button'
                    onClick={saveConfig}
                    className="flex gap-2 w-full cursor-pointer"
                >
                    <CirclePlay className="size-4.5"/>
                    <p className="text-lg font-medium">Run</p>
                </Button>
            </CardFooter>

        </Card>
        </div>
    )
}

export default ConfigForm