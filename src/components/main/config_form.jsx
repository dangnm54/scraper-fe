import * as React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button'; 
import { Checkbox } from '@/components/ui/checkbox'; 
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; 
import { Save } from 'lucide-react'

import { MapPin } from 'lucide-react';


function ConfigForm() {

    // state for input
    const [location, setLocation] = React.useState('')
    const [numProperty, setNumProperty] = React.useState('')
    const [numGuest, setNumGuest] = React.useState('')

    // state for checkbox
    const [overviewData, setOverviewData] = React.useState(false)
    const [hostData, setHostData] = React.useState(false)
    const [bookRate, setBookRate] = React.useState(false)

    const saveConfig = () => {
        console.log("Saving Configuration:", {
            location,
            numProperty,
            numGuest,
            overviewData,
            hostData,
            bookRate,
        });

        alert('Configuration Saved! Check console log for details.')
    }


    return (
        // <span>heheheh</span>

        <Card className="w-full size-fit p-0 py-4 dark:bg-zinc-900 dark:text-white">
            
            <CardHeader className="text-2xl font-bold">
                <CardTitle className="text-lg font-medium text-center">Scraper Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <div className="space-y-2 mb-4">
                        <Label htmlFor='location' className="text-sm font-medium">Location</Label>
                        <div className="relative flex items-center gap-2">
                            <Input
                                id='location'
                                type='text'
                                placeholder='Enter location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="h-7 w-50 rounded-sm border-gray-400 text-xs placeholder:text-xs"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <Label htmlFor='numProperty' className="text-sm font-medium">Number of properties</Label>
                        <div className="relative flex items-center gap-2">
                            <Input
                                id='numProperty'
                                type='number'
                                placeholder='# properties to scrape'
                                value={numProperty}
                                onChange={(e) => setNumProperty(e.target.value)}
                                className="h-7 w-50 rounded-sm border-gray-400 text-xs placeholder:text-xs"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        <Label className="text-sm font-medium">Data to collect</Label>
                        <div className="grid grid-rows gap-3">
                            <div className="flex items-center flex-start gap-2">
                                <Checkbox
                                    id="overviewData"
                                    checked={overviewData}
                                    onCheckedChange={setOverviewData}
                                    className="border-gray-400 h-4 w-4 items-center"
                                />
                                <Label htmlFor="overviewData" className="text-xs font-normal">Overview data</Label>
                            </div>

                            <div className="flex items-center flex-start gap-2">
                                <Checkbox
                                    id="hostData"
                                    checked={hostData}
                                    onCheckedChange={setHostData}
                                    className="border-gray-400 h-4 w-4 items-center"
                                />
                                <Label htmlFor="hostData" className="text-xs font-normal">Host data</Label>
                            </div>

                            <div className="flex items-center flex-start gap-2">
                                <Checkbox
                                    id="bookRate"
                                    checked={bookRate}
                                    onCheckedChange={setBookRate}
                                    className="border-gray-400 h-4 w-4 items-center"
                                />
                                <Label htmlFor="bookRate" className="text-xs font-normal">Booking rate</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button onClick={saveConfig} className="flex items-center gap-2">
                    <Save className="h-4 w-4"/>
                    <p className="text-xs font-medium">Save</p>
                </Button>
            </CardFooter>

        </Card>
    )
}

export default ConfigForm