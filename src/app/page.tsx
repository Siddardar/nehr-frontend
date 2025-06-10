"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Users } from "lucide-react"
import { isValidNRIC } from "@/lib/utils"



export default function Home() {
  const [nric, setNric] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    setNric(value)
    if (error) setError("") // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (nric.trim() === "") {
      setError("Please enter an NRIC")
      return
    }

    if (!isValidNRIC(nric)) {
      setError("Please enter a valid NRIC format (e.g., S1234567A)")
      return
    }

    setIsLoading(true)
    setError("")
    
    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push(`/search?nric=${encodeURIComponent(nric.trim())}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Patient Tag
            <span className="text-blue-600"> Management</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Search and manage patient tags efficiently. Enter a patient's NRIC to get started.
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter NRIC (e.g., S1234567A)"
                value={nric}
                onChange={handleInputChange}
                className={`pl-10 h-12 text-lg border-2 transition-all duration-200 ${
                  error 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-blue-500'
                }`}
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                  !
                </span>
                {error}
              </p>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Patient
                </div>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Secure • HIPAA Compliant • InterSystems HealthShare</p>
        </div>
      </div>
    </div>
  )
}