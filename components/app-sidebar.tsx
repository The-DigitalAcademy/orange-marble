"use client";
import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { IconChartBar, IconDashboard, IconFiles, IconReportSearch } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard
        },
        {
            title: "Submissions",
            url: "/dashboard/submissions",
            icon: IconFiles
        },
        {
            title: "Learner Performance",
            url: "/dashboard/learner-performance",
            icon: IconChartBar
        },
        {
            title: "Autograder Logs",
            url: "/dashboard/autograder-logs",
            icon: IconReportSearch
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Link href={"/"}><Image
                    src="/shaper-full-logo-horizontal.webp"
                    className="block w-full px-3"
                    width={600}
                    height={400}
                    alt="shaper full logo" /></Link>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((item) => {
                    const LinkIcon = item.icon
                    return (<SidebarGroup key={item.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton isActive={pathname === item.url}>
                                        <a className="flex items-center gap-1" href={item.url}><LinkIcon />{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>)
                })}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
