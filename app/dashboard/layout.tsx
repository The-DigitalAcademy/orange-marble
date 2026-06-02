import { AppSidebar } from "@/components/app-sidebar"
import PageHeader from "@/components/page-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Page({ children }: { children: React.ReactNode }) {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    const userMetadata = data.user?.user_metadata

    return (
        <SidebarProvider>
            <AppSidebar user={{ name: userMetadata?.full_name, email: userMetadata?.email, avatarUrl: userMetadata?.avatar_url }} />
            <SidebarInset>
                <PageHeader />
                <main className="p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
