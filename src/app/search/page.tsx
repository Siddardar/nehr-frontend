"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Heart, Wind, Brain, Thermometer, Activity, Calendar, User, Phone, Mail, MapPin  } from "lucide-react"
import { TagList } from "@/components/checkbox"
import LoadingPage from "@/components/loading"

import { useRouter } from "next/navigation"

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
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [tagData, setTagData] = useState<Tag[]>([])

    const router = useRouter()

    useEffect(() => {
      if (!param) return;

      setLoading(true);
      console.log(param)
      console.log(`/nehrfe/demo/patient/${param}`)

      Promise.all([
        fetch(`/nehrfe/demo/patient/${param}`)
          .then(res => {
            if (!res.ok) {
              router.push("/not-found");
              throw new Error("patient not found")
            }
            return res.json() as Promise<PatientInfo>;
          }),
        fetch(`/nehrfe/demo/tags`)
          .then(res => {
            if (!res.ok) throw new Error(`Tags fetch failed (${res.status})`);
            return res.json() as Promise<TagWithIcon[]>;
          })
      ])
        .then(([patientData, tagsData]) => {
          setPatient(patientData);
          setTagData(tagsData);

          setSelectedTags(patientData.Tags);

          console.log(patientData)
          console.log(tagsData)
          console.log(selectedTags)
        })
        .catch(err => {
          console.error(err);
          setPatient(null);
          setTagData([]);
        })
        .finally(() => {
          setLoading(false)
          
        
        });

    }, [param]);

    
    // useEffect(() => {
    //    const res: PatientInfo = {
    //                 "MPIID":"100014427",
    //                 "FullName":"John Smith",
    //                 "NRIC": "TEST",
    //                 "Tags":[
    //                     {"TagID":3,"TagName":"APM_Deceased"}
    //                 ]
    //             }
    //     setPatient(res)

    // }, [])

    useEffect(() => {
      console.log("Selected Tags:", selectedTags)


    }, [selectedTags])

    if (!param) {
        router.push('/invalid')
    }

    // Add loading state
    if (loading || !patient) {
        return <LoadingPage />
    }

    // const tagData: TagWithIcon[] = [
    //   {"TagID": 1, "TagName": "VIP", "icon": Heart}, 
    //   {"TagID": 2, "TagName": "Deceased", "icon": Wind},
    //   {"TagID": 3, "TagName": "Inprisoned", "icon": Brain},
    //   {"TagID": 4, "TagName": "Critical", "icon": Thermometer},
    //   {"TagID": 5, "TagName": "Doctor Assigned", "icon": Activity},
    //   {"TagID": 6, "TagName": "Follow Up", "icon": Calendar},
    //   {"TagID": 7, "TagName": "Contacted", "icon": User},
    //   {"TagID": 8, "TagName": "Not Contacted", "icon": Phone},
    //   {"TagID": 9, "TagName": "Email Sent", "icon": Mail},
    //   {"TagID": 10, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 11, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 12, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 13, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 14, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 15, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 16, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 17, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 18, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 19, "TagName": "Address Verified", "icon": MapPin},
    //   {"TagID": 20, "TagName": "Address Verified", "icon": MapPin}
      
    // ]

  const handleTagToggle = async (toggleTag: Tag) => {
    const isCurrentlySelected = selectedTags.some(t => t.TagID === toggleTag.TagID);
    
    try {
      if (isCurrentlySelected) {
        // Removing tag - make API call first
        const response = await fetch('/nehrfe/demo/patient/removeTag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            MPIID: patient.MPIID, 
            tagID: toggleTag.TagID,
            tagName: toggleTag.TagName
          })
        });
        
        if (response.ok) {
          setSelectedTags(prev => prev.filter(t => t.TagID !== toggleTag.TagID));
          console.log("remove ok")
        } else {
          console.error('Failed to remove tag');
          
        }
      } else {       
        const response = await fetch('/nehrfe/demo/patient/addTag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            MPIID: patient.MPIID, 
            tagID: toggleTag.TagID,
            tagName: toggleTag.TagName
          })
        });
        if (response.ok) {
          setSelectedTags(prev => [...prev, toggleTag]);
          console.log("add ok")
        } else {
          console.error('Failed to add tag');
        }
      }
    } catch (error) {
      console.error('Error toggling tag:', error);
    }
  };

    
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