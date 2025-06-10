"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {

  const [nric, setNric] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nric == "") {
      return
    }

    router.push(`/search?nric=${encodeURIComponent(nric)}`)


    console.log(nric)
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
    <h1
      className="text-center font-bold p-2 mb-8"
      style={{ fontSize: 'clamp(1.5rem, 8vw, 4rem)' }}
    >
      Manage Patient Tags
    </h1>
    <form className="flex w-full max-w-sm items-center gap-2">
      
      <Input type="name" placeholder="NRIC" value={nric} onChange={(e) => setNric(e.target.value)}/>
      <Button type="submit" onClick={handleSubmit} className="cursor-pointer">
        Search
      </Button>
      
    </form>
    </div>
  )
}
