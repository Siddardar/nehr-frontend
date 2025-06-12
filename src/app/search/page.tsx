"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import PatientTagSelector  from "@/components/assign-tags"
import LoadingPage from "@/components/loading"

import { useRouter } from "next/navigation"

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
    const [tagData, setTagData] = useState<Tag[]>([])
    const [availableTags, setAvailableTags] = useState<Tag[]>([])

    const router = useRouter()

    useEffect(() => {
      if (!param) return;

      setLoading(true);
    

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
            return res.json() as Promise<Tag[]>;
          })
      ])
        .then(([patientData, tagsData]) => {
          setPatient(patientData);
          setTagData(tagsData);

          if (patientData.Tags == undefined || patientData.Tags.length === 0) {
            setSelectedTags([]);
            setAvailableTags(tagsData);
          } else {
            const availableTags = tagsData.filter(tag => 
              !patientData.Tags.some(patientTag => patientTag.TagID === tag.TagID)
            );
            setSelectedTags(patientData.Tags);
            setAvailableTags(availableTags);
          }
          
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

    if (!param) {
        router.push('/invalid')
    }

    // Add loading state
    if (loading || !patient) {
        return <LoadingPage />
    }

  const handleTagToggle = async (newSelectedTags: Tag[]) => {
    // Find tags that were added (in newSelectedTags but not in current selectedTags)
    const tagsToAdd = newSelectedTags.filter(newTag => 
      !selectedTags.some(currentTag => currentTag.TagID === newTag.TagID)
    );
    
    // Find tags that were removed (in current selectedTags but not in newSelectedTags)
    const tagsToRemove = selectedTags.filter(currentTag => 
      !newSelectedTags.some(newTag => newTag.TagID === currentTag.TagID)
    );
    console.log(tagsToAdd, tagsToRemove)
    // Process additions

   
    try {
      const response = await fetch('/nehrfe/demo/patient/addTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MPIID: patient.MPIID, 
          tags: tagsToAdd
        })
      });
      
      if (response.ok) {
        console.log("add ok");
      } else {
        console.error('Failed to add tag:', tagsToAdd);
        return; // Stop processing if an error occurs
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      return; // Stop processing if an error occurs
    }


    // Process removals
    try {
      const response = await fetch('/nehrfe/demo/patient/removeTag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MPIID: patient.MPIID, 
          tags: tagsToRemove
        })
      });
      
      if (response.ok) {
        console.log("remove ok");
      } else {
        console.error('Failed to remove tag:', tagsToRemove);
        return; // Stop processing if an error occurs
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      return; // Stop processing if an error occurs
    }
  

    // Only update state if all API calls were successful
    setSelectedTags(newSelectedTags);
    
    // Update available tags
    const newAvailableTags = tagData.filter(tag => 
      !newSelectedTags.some(selectedTag => selectedTag.TagID === tag.TagID)
    );
    setAvailableTags(newAvailableTags);
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


            <div>
            <PatientTagSelector
              availableTags={availableTags}
              selectedTags={selectedTags}
              onTagsChange={handleTagToggle}
            />
            </div>
            
        
        </div>

        
    )
}