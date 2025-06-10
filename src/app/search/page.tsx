"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Heart, Wind, Brain, Thermometer, Activity, Calendar, User, Phone, Mail, MapPin  } from "lucide-react"
import { TagList } from "@/components/checkbox"
import LoadingPage from "@/components/loading"

export type Tag = {
    TagID: number,
    TagName: string
}

export type TagWithIcon = Tag & { icon?: any }

type PatientInfo = {
    MPIID: string,
    FullName: string,
    NRIC: string,
    Tags: Tag[]
}

export default function Page() {
    const searchParams = useSearchParams()
    const param = searchParams.get("nric") 

    const [patient, setPatient] = useState<PatientInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState<number[]>([])

    useEffect(() => {
        if (param) {
            setLoading(true)
            // Simulate async fetch
            setTimeout(() => {
                const res: PatientInfo = {
                    "MPIID":"100014427",
                    "FullName":"John Smith",
                    "NRIC": param,
                    "Tags":[
                        {"TagID":3,"TagName":"APM_Deceased"}
                    ]
                }
                setPatient(res)
                setLoading(false)
            }, 100) // Simulate network delay
        }
        console.log("search:" + param)

    }, [param])

    useEffect(() => {
      console.log("Selected Tags:", selectedTags)
    }, [selectedTags])

    if (!param) {
        return <h1>INVALID</h1>
    }

    // Add loading state
    if (loading || !patient) {
        return <LoadingPage />
    }

    const tagData: TagWithIcon[] = [
      {"TagID": 1, "TagName": "VIP", "icon": Heart}, 
      {"TagID": 2, "TagName": "Deceased", "icon": Wind},
      {"TagID": 3, "TagName": "Inprisoned", "icon": Brain},
      {"TagID": 4, "TagName": "Critical", "icon": Thermometer},
      {"TagID": 5, "TagName": "Doctor Assigned", "icon": Activity},
      {"TagID": 6, "TagName": "Follow Up", "icon": Calendar},
      {"TagID": 7, "TagName": "Contacted", "icon": User},
      {"TagID": 8, "TagName": "Not Contacted", "icon": Phone},
      {"TagID": 9, "TagName": "Email Sent", "icon": Mail},
      {"TagID": 10, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 11, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 12, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 13, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 14, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 15, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 16, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 17, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 18, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 19, "TagName": "Address Verified", "icon": MapPin},
      {"TagID": 20, "TagName": "Address Verified", "icon": MapPin}
      
    ]

    const handleTagToggle = (toggleTagID: number) => {
      setSelectedTags(prev => 
        prev.includes(toggleTagID)
        ? prev.filter(t => t !== toggleTagID)
        : [...prev, toggleTagID]
      )
    }

    
    return (
        <div className="h-[calc(100vh-4rem)] bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-6">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                        {patient.FullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                        <h1 className="text-3xl font-bold text-gray-900">{patient.FullName}</h1>
                        <p className="text-gray-600">MPIID: {patient.MPIID} / NRIC: {patient.NRIC}</p>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>



            <div className="w-2/3 mx-auto py-4">

              <TagList
                title="Patient Tags"
                tags={tagData}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                showCounter={true}
                />
                
            </div>

            
        
        </div>

        
    )
}