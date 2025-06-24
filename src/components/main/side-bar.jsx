import * as React from "react";
// import 'C:/Users/ADMIN/Pictures/scraper-fe/src/index.css';

import { BugIcon, SearchCode, Database, FileChartColumnIncreasing as FileChart, FileText } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   SidebarFooter,
} from "@/components/ui/sidebar"


const sampleFiles = [
   {
      id: 1,
      name: "products_scrape_001.json",
      date: "2025-04-29",
      itemCount: 150,
   },
   {
      id: 2,
      name: "ecommerce_data_002.json",
      date: "2025-04-28",
      itemCount: 120,
   },
   {
      id: 3,
      name: "product_catalog_003.json",
      date: "2025-04-27",
      itemCount: 200,
   },
   {
      id: 4,
      name: "inventory_scrape_004.json",
      date: "2025-04-26",
      itemCount: 80,
   },
]



function SideBar(props) {

   const chooseConfigForm = () => { props.renderConfigForm() }
   const chooseData = () => { props.renderData() }

   return (
      <Sidebar id='sidebar-main' className="border-r border-gray-300">
         <SidebarHeader className="p-2 border-b bg-gray-50 border-gray-300">
            <SidebarMenu id='sidebar-menu'>
               <SidebarMenuItem id='sidebar-menu-item'>
                  <SidebarMenuButton id='sidebar-menu-button' size="lg">
                     <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-zinc-900">
                        <BugIcon className="size-4 text-white" />
                     </div>
                     <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">Strapee</span>
                        <span className="text-xs text-muted-foreground">v1.0.0</span>
                     </div>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>

         <SidebarContent id='sidebar-content' className="bg-gray-50 flex flex-col">

            {/* Navigation section */}
            <SidebarGroup id='sidebar-group'>
               <SidebarGroupLabel id='sidebar-group-label' className='text-xs font-medium text-gray-600'>Navigation</SidebarGroupLabel>
               <SidebarGroupContent id='sidebar-group-content'>
                  <SidebarMenu id='sidebar-menu'>

                     <SidebarMenuItem id='sidebar-menu-item'>
                        <SidebarMenuButton 
                           id='sidebar-menu-button' 
                           onClick={chooseConfigForm}
                           className='justify-start gap-2 cursor-pointer items-center'
                        >
                           <SearchCode className="size-4" />
                           <span className='text-sm font-normal'>Run Scraper</span>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                     <SidebarMenuItem id='sidebar-menu-item'>
                        <SidebarMenuButton 
                           id='sidebar-menu-button' 
                           onClick={chooseData}
                           className='justify-start gap-2 cursor-pointer items-center'
                        >
                           <Database className="size-4" />
                           <span className='text-sm font-normal'>Data</span>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            {/* File section */}
            {props.fileIsVisible &&
            <SidebarGroup id='sidebar-group' className="flex flex-col flex-1 min-h-0 pb-0">
               <SidebarGroupLabel id='sidebar-group-label' className='text-xs font-medium text-gray-600'>Data files</SidebarGroupLabel>
               <SidebarGroupContent id='sidebar-group-content' className="flex-1">
                  <div className="border border-gray-200 rounded-md bg-white h-full p-2">
                     <ScrollArea id='scroll-area' className="h-full">
                        <SidebarMenu id='sidebar-menu' className="flex w-full min-w-0 flex-col gap-2">

                           {sampleFiles.map((file) => (
                              <SidebarMenuItem id='sidebar-menu-item' key={file.id}>
                                 <SidebarMenuButton id='sidebar-menu-button' className='h-auto p-3 flex-col items-start gap-2 bg-gray-100 border-1 border-gray-300'>
                                    <div className="flex items-center justify-between w-full">
                                       <div>
                                          <div className="flex items-center gap-2 w-full mb-1">
                                             <FileChart className="size-4" />
                                             <span className="text-xs font-medium truncate">{file.name}</span>
                                          </div>
                                          <span className="text-xs text-muted-foreground">{file.date}</span>
                                       </div>
                                       <Badge variant="default" className="text-xs h-4 px-1">
                                          {file.itemCount}
                                       </Badge>
                                    </div>

                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}

                        </SidebarMenu>
                     </ScrollArea>
                  </div>
               </SidebarGroupContent>
            </SidebarGroup> }

         </SidebarContent>

         <SidebarFooter id='sidebar-footer'>
            <div className="px-3 py-1 text-center">
               <span className="text-xs text-muted-foreground">Copyright © 2025 Strapee. All Rights Reserved.</span>
            </div>
         </SidebarFooter>

      </Sidebar>
   )
}

export default SideBar
