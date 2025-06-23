// "use client"
import * as React from "react"
import { Database, Home, Settings, BugIcon as Spider, Calendar, FileText } from "lucide-react"
// import Link from "next/link"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { useState, useEffect } from "react"

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
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample files data
const sampleFiles = [
    {
        id: 1,
        name: "products_scrape_001.json",
        date: "2025-04-29T14:30:00",
        size: "2.4 MB",
        itemCount: 150,
    },
    {
        id: 2,
        name: "ecommerce_data_002.json",
        date: "2025-04-28T10:15:00",
        size: "1.8 MB",
        itemCount: 120,
    },
    {
        id: 3,
        name: "product_catalog_003.json",
        date: "2025-04-27T16:45:00",
        size: "3.1 MB",
        itemCount: 200,
    },
    {
        id: 4,
        name: "inventory_scrape_004.json",
        date: "2025-04-26T09:20:00",
        size: "1.2 MB",
        itemCount: 80,
    },
]

export function AppSidebar3() {
    // const pathname = usePathname()
    // const router = useRouter()
    // const searchParams = useSearchParams()
    // const [selectedFileId, setSelectedFileId] = useState < number > (1)

    // // Update selected file when URL changes
    // useEffect(() => {
    //     const fileId = searchParams.get("fileId")
    //     if (fileId) {
    //         setSelectedFileId(Number.parseInt(fileId))
    //     }
    // }, [searchParams])

    // const handleFileSelect = (fileId: number) => {
    //     setSelectedFileId(fileId)
    //     if (pathname === "/dashboard") {
    //         router.push(`/dashboard?fileId=${fileId}`)
    //     }
    // }

    return (
        <Sidebar>
            {/* <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Spider className="size-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="font-semibold">WebScraper</span>
                                <span className="text-xs text-muted-foreground">v1.0.0</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader> */}

            <SidebarContent>
                
                {/* <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton >
                                    <Home className="size-4" />
                                    <span>Home</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Settings className="size-4" />
                                    <span>Configure Scraper</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton >
                                    <Database className="size-4" />
                                    <span>Results Dashboard</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}


                <SidebarGroup>
                    <SidebarGroupLabel>Scraped Files</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ScrollArea className="h-[300px]">
                            <SidebarMenu>
                                {sampleFiles.map((file) => (
                                    <SidebarMenuItem key={file.id}>
                                        <SidebarMenuButton
                                            isActive={true}
                                            onClick={() => handleFileSelect(file.id)}
                                            className="h-auto p-3 flex-col items-start gap-1"
                                        >
                                            <div className="flex items-center gap-2 w-full">
                                                <FileText className="size-4 shrink-0" />
                                                <span className="text-xs font-medium truncate">{file.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
                                                <Calendar className="size-3" />
                                                <span>{new Date(file.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                                <Badge variant="secondary" className="text-xs h-4 px-1">
                                                    {file.itemCount}
                                                </Badge>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </ScrollArea>
                    </SidebarGroupContent>
                </SidebarGroup>

                
            </SidebarContent>
            <SidebarFooter>
                <div className="px-3 py-2">
                    <p className="text-xs text-muted-foreground">© 2025 WebScraper. All rights reserved.</p>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
