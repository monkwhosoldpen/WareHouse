import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Profile() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader />
      <div className="flex-1 container py-6 space-y-6 pb-20">
        <h1 className="text-2xl font-bold">Profile</h1>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar_url || ""} alt="Profile" />
              <AvatarFallback className="text-2xl">{session.user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h2 className="text-xl font-semibold">{profile?.full_name || "User"}</h2>
              <p className="text-muted-foreground">{session.user.email}</p>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Email</span>
                <span className="text-muted-foreground">{session.user.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Full Name</span>
                <span className="text-muted-foreground">{profile?.full_name || "Not set"}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Member Since</span>
                <span className="text-muted-foreground">{new Date(session.user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <MobileBottomNav />
    </div>
  )
}

