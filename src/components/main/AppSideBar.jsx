import * as React from "react";

import { Button } from '@/components/ui/button'
import { SearchCode, Database } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroupLabel, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'


// function SideBar() {
//     return (
//         <Sidebar className='w-52 bg-zinc-800 p-4 flex flex-col items-center border-r border-zinc-700'>
//             <SidebarHeader>
//                 <h1 className='text-xl font-medium text-white mb-8'>Scrapee</h1>
//             </SidebarHeader>

//             <SidebarContent>
                
//                 <SidebarGroup>
//                     <SidebarGroupLabel className='text-sm font-medium text-white'>Settings</SidebarGroupLabel>
                    

//                 </SidebarGroup>



//             </SidebarContent>

//         </Sidebar>
//     )
// }


// export default SideBar

export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }