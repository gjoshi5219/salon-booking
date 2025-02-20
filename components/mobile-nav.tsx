"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden p-0 text-white hover:bg-transparent">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-black border-gray-800">
        <div className="flex flex-col space-y-4 mt-8">
          <Button
            asChild
            className="bg-white text-black hover:bg-blue-500 hover:text-white transition-colors w-full"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/book">Book Now</Link>
          </Button>
          <Button
            asChild
            className="bg-white text-black hover:bg-blue-500 hover:text-white transition-colors w-full"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/admin">Admin</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

