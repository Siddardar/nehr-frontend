"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Tag } from '@/app/search/page';

interface PatientTagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}



export default function PatientTagSelector({ 
  availableTags, 
  selectedTags, 
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
  
  };

  const moveToAvailable = () => {
    const tagsToMove = selected.filter(tag => selectedSelected.includes(tag.TagID.toString()));
    setAvailable(prev => [...prev, ...tagsToMove].sort((a, b) => a.TagName.localeCompare(b.TagName)));
    setSelected(prev => prev.filter(tag => !selectedSelected.includes(tag.TagID.toString())));
    setSelectedSelected([]);
    
  };

  const moveAllToSelected = () => {
    setSelected(prev => [...prev, ...available]);
    setAvailable([]);
    setSelectedAvailable([]);
    
  };

  const moveAllToAvailable = () => {
    setAvailable(prev => [...prev, ...selected].sort((a, b) => a.TagName.localeCompare(b.TagName)));
    setSelected([]);
    setSelectedSelected([]);
    
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

      {/* Selected Tags and Submit Button */}
      <div className="flex gap-4">
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

        {/* Submit Button */}
        <div className="flex flex-col justify-center">
          <button 
          onClick={() => onTagsChange(selected)}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}