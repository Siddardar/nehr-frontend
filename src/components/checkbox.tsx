import { Check } from "lucide-react";
import { useState } from "react";
import { TagWithIcon } from "@/app/search/page";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "./ui/input";

type TagList = {
  title: string;
  tags: TagWithIcon[];
  selectedTags: TagWithIcon[];
  onTagToggle: (t: TagWithIcon) => void;
  variant?: "default" | "compact" | "large";
  showCounter?: boolean;
  itemsPerPage?: number;
};

export const TagList = ({ 
  title, 
  tags, 
  selectedTags, 
  onTagToggle, 
  variant = 'default',
  showCounter = true,
  itemsPerPage = 5
}: TagList ) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'bg-white rounded-lg shadow-sm border',
          item: 'p-3',
          title: 'text-sm font-medium',
          subtitle: 'text-xs'
        };
      case 'large':
        return {
          container: 'bg-white rounded-xl shadow-md',
          item: 'p-6',
          title: 'text-lg font-semibold',
          subtitle: 'text-base'
        };
      default:
        return {
          container: 'bg-white rounded-xl shadow-sm',
          item: 'p-4',
          title: 'text-base font-medium',
          subtitle: 'text-sm'
        };
    }
  };

  const styles = getVariantStyles();
  const selectedCount = selectedTags.length;
  
  // Filter tags based on search term
  const filteredTags = tags.filter(tag =>
    tag.TagName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  
  // Pagination calculations (using filtered tags)
  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTags = filteredTags.slice(startIndex, endIndex);
  
  // Reset to page 1 when search term changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  
  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Generate page numbers for display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      
      // Show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={styles.container}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showCounter && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {selectedCount} selected
            </span>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            
          />
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {currentTags.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No tags match your search.' : 'No tags available.'}
          </div>
        ) : (
          currentTags.map((tag) => {
            const isSelected = selectedTags.some(t => t.TagID === tag.TagID);
            const Icon = tag.icon;
            
            return (
              <div
                key={tag.TagID}
                onClick={() => onTagToggle(tag)}
                className={`${styles.item} cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`${styles.title} text-gray-900 truncate`}>
                      {tag.TagName}
                    </h4>
                    <p className={`${styles.subtitle} text-gray-600 truncate`}>
                      {tag.TagID}
                    </p>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Only show pagination if there are multiple pages */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      size="lg"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page as number);
                      }}
                      className={`cursor-pointer ${
                        currentPage === page 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};