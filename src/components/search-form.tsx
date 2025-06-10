"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"

import { isValidNRIC } from "@/lib/utils" 

export function SearchForm({ ...props }: React.ComponentProps<"form">) {

  const [search, setSearch] = useState("")
  const router = useRouter()
  

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault()
    
    if (search.trim() === "") {
      
      return
    }

    if (!isValidNRIC(search)) {
      setSearch("")
      alert("Please enter a valid NRIC format (e.g., S1234567A)") 
      return
    }
    router.push(`/search?nric=${encodeURIComponent(search)}`)
  }

  return (
    <form {...props} onSubmit={handleSubmit}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="NRIC to search..."
          className="h-8 pl-7"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  )
}
