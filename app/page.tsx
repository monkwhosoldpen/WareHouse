import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MobileHeader />
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Mobile App</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            A mobile-first application built with Next.js and Supabase
          </p>
        </div>
        <div className="flex flex-col w-full max-w-xs gap-2">
          <Button asChild size="lg" className="w-full">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

