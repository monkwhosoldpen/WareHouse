import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user data
  const { data: userData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader />
      <div className="flex-1 container py-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{userData?.full_name || session.user.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Your activity will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="p-2 bg-muted rounded-md">Item 1</li>
                <li className="p-2 bg-muted rounded-md">Item 2</li>
                <li className="p-2 bg-muted rounded-md">Item 3</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  )
}

