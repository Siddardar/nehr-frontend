"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';

// Type definition
type Tag = {
  TagID: number;
  TagName: string;
};

// Props interface
interface PatientTagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

// Sample data - replace with your actual data
const sampleAvailableTags: Tag[] = [
  { TagID: 1, TagName: '%DBIRole_Client' },
  { TagID: 2, TagName: '%DB_%DEFAULT' },
  { TagID: 3, TagName: '%DB_DEMOSECONDARY' },
  { TagID: 4, TagName: '%DB_ENSLIB' },
  { TagID: 5, TagName: '%DB_FHIRDEMOX0001R' },
  { TagID: 6, TagName: '%DB_FHIRDEMOX0001V' },
  { TagID: 7, TagName: '%DB_FHIRDEMOX0002R' },
  { TagID: 8, TagName: '%DB_FHIRDEMOX0002V' },
  { TagID: 9, TagName: '%DB_HSCUSTOM' },
  { TagID: 10, TagName: '%DB_HSLIB' },
  { TagID: 11, TagName: '%DB_HSSYS' },
  { TagID: 12, TagName: '%DB_HSSYSLOCALTEMP' },
  { TagID: 13, TagName: '%DB_IRISAUDIT' },
  { TagID: 14, TagName: '%DB_IRISLIB' },
  { TagID: 15, TagName: '%DB_IRISLOCALDATA' },
  { TagID: 16, TagName: '%DB_IRISMETRICS' },
  { TagID: 17, TagName: '%DB_IRISSYS' },
  { TagID: 18, TagName: '%DB_IRISTEMP' },
  { TagID: 19, TagName: '%DB_USER' },
  { TagID: 20, TagName: '%Developer' },
  { TagID: 21, TagName: '%EnsRole_Administrator' },
  { TagID: 22, TagName: '%EnsRole_AlertAdministrator' },
  { TagID: 23, TagName: '%EnsRole_AlertOperator' },
  { TagID: 24, TagName: '%EnsRole_Developer' },
  { TagID: 25, TagName: '%EnsRole_InteropEditorsAPI' },
  { TagID: 26, TagName: '%EnsRole_Monitor' },
  { TagID: 27, TagName: '%EnsRole_Operator' },
  { TagID: 28, TagName: '%EnsRole_PubSubDeveloper' },
  { TagID: 29, TagName: '%EnsRole_RegistryManager' }
];

export default function PatientTagSelector({ 
  availableTags = sampleAvailableTags, 
  selectedTags = [], 
  onTagsChange 
}: PatientTagSelectorProps) {
  const [available, setAvailable] = useState<Tag[]>(availableTags);
  const [selected, setSelected] = useState<Tag[]>(selectedTags);
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedSelected, setSelectedSelected] = useState<string[]>([]);

  const moveToSelected = () => {
    const tagsToMove = available.filter(tag => selectedAvailable.includes(tag.TagID.toString()));
    setSelected(prev => [...prev, ...tagsToMove]);
    setAvailable(prev => prev.filter(tag => !selectedAvailable.includes(tag.TagID.toString())));
    setSelectedAvailable([]);
    
    if (onTagsChange) {
      onTagsChange([...selected, ...tagsToMove]);
    }
  };

  const moveToAvailable = () => {
    const tagsToMove = selected.filter(tag => selectedSelected.includes(tag.TagID.toString()));
    setAvailable(prev => [...prev, ...tagsToMove].sort((a, b) => a.TagName.localeCompare(b.TagName)));
    setSelected(prev => prev.filter(tag => !selectedSelected.includes(tag.TagID.toString())));
    setSelectedSelected([]);
    
    if (onTagsChange) {
      onTagsChange(selected.filter(tag => !selectedSelected.includes(tag.TagID.toString())));
    }
  };

  const moveAllToSelected = () => {
    setSelected(prev => [...prev, ...available]);
    setAvailable([]);
    setSelectedAvailable([]);
    
    if (onTagsChange) {
      onTagsChange([...selected, ...available]);
    }
  };

  const moveAllToAvailable = () => {
    setAvailable(prev => [...prev, ...selected].sort((a, b) => a.TagName.localeCompare(b.TagName)));
    setSelected([]);
    setSelectedSelected([]);
    
    if (onTagsChange) {
      onTagsChange([]);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 h-fill">
      {/* Available Tags */}
      <div className="flex flex-col w-80">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Available
        </label>
        <select 
          multiple 
          className="h-96 border border-gray-300 rounded bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedAvailable}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedAvailable(values);
          }}
        >
          <option value="" disabled className="text-gray-500 text-center py-2">
            ----- Select One or More -----
          </option>
          {available.map(tag => (
            <option 
              key={tag.TagID} 
              value={tag.TagID}
              className="py-1 px-2 hover:bg-blue-50"
            >
              {tag.TagName}
            </option>
          ))}
        </select>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={moveToSelected}
          disabled={selectedAvailable.length === 0}
          className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Move selected to right"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={moveToAvailable}
          disabled={selectedSelected.length === 0}
          className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Move selected to left"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={moveAllToSelected}
          disabled={available.length === 0}
          className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Move all to right"
        >
          <ChevronsRight size={16} />
        </button>
        
        <button
          onClick={moveAllToAvailable}
          disabled={selected.length === 0}
          className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Move all to left"
        >
          <ChevronsLeft size={16} />
        </button>
        

      </div>

      {/* Selected Tags */}
      <div className="flex flex-col w-80">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Selected
        </label>
        <select 
          multiple 
          className="h-96 border border-gray-300 rounded bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedSelected}
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, option => option.value);
            setSelectedSelected(values);
          }}
        >
          <option value="" disabled className="text-gray-500 text-center py-2">
            ----- Select One or More -----
          </option>
          {selected.map(tag => (
            <option 
              key={tag.TagID} 
              value={tag.TagID}
              className="py-1 px-2 hover:bg-blue-50"
            >
              {tag.TagName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}