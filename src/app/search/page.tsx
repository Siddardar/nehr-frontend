"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Heart, Wind, Brain, Thermometer, Activity, Calendar, User, Phone, Mail, MapPin  } from "lucide-react"
import { AttributeList } from "@/components/checkbox"

export type Tag = {
    TagID: number,
    TagName: string
}

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
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    useEffect(() => {
        if (param) {
            setLoading(true)
            // Simulate async fetch
            setTimeout(() => {
                const res: PatientInfo = {
                    "MPIID":"100014427",
                    "FullName":"John Smith",
                    "NRIC":"063070516",
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

    if (!param) {
        return <h1>INVALID</h1>
    }

    // Add loading state
    if (loading || !patient) {
        return <div>Loading patient data...</div>
    }

    const tagData: Tag[] = [
      {"TagID": 1, "TagName": "VIP"}, 
      {"TagID": 2, "TagName": "Deceased"},
      {"TagID": 3, "TagName": "Inprisoned"},
      {"TagID": 4, "TagName": "Critical"},
      {"TagID": 5, "TagName": "Doctor Assigned"},
    ]

    const handleTagToggle = (newT: Tag) => {
      setSelectedTags(prev => 
        prev.includes(newT)
        ? prev.filter(t => t.TagID !== newT.TagID)
        : [...prev, newT]
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
                        <p className="text-gray-600">MPIID: {patient.MPIID}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>



            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:w-80">
              {/* Patient Info Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-medium">test years old</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">test</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">test</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-blue-600">test</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">test</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <AttributeList
              title={"test"}
              
              />
            </div>
        
        
        
        </div>

        
    )
}