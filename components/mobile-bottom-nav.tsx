"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useMobileDetect } from "@/hooks/use-mobile-detect"

export function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const isMobile = useMobileDetect()

  if (!isMobile) return null

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full grid-cols-4">
        <Link
          href="/dashboard"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/profile"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/profile" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
        <Link
          href="/settings"
          className={cn(
            "inline-flex flex-col items-center justify-center px-5",
            pathname === "/settings" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="inline-flex flex-col items-center justify-center px-5 text-muted-foreground"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  )
}

