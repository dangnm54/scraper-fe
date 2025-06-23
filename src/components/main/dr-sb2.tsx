import * as React from "react"

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
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        }
      ],
    }
  ],
}

export function AppSidebar2({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader id='sidebar-header'>
        <h1 className='text-xl font-medium text-white mb-8'>Scrapee</h1>
      </SidebarHeader >
      <SidebarContent id='sidebar-content'>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} id='sidebar-group'>
            <SidebarGroupLabel id='sidebar-group-label'>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent id='sidebar-group-content'>
              <SidebarMenu id='sidebar-menu'>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} id='sidebar-menu-item'>
                    <SidebarMenuButton asChild isActive={item.isActive} id='sidebar-menu-button'>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

