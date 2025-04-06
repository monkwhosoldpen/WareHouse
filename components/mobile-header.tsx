"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobileDetect } from "@/hooks/use-mobile-detect"

export function MobileHeader() {
  const [open, setOpen] = useState(false)
  const isMobile = useMobileDetect()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">MobileApp</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
                    Home
                  </Link>
                  <Link href="/dashboard" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
                    Dashboard
                  </Link>
                  <Link href="/profile" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
                    Profile
                  </Link>
                  <Link href="/login" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="px-2 py-1 text-lg">
                    Sign Up
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/profile" className="text-sm font-medium">
                Profile
              </Link>
              <Link href="/login" className="text-sm font-medium">
                Login
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

