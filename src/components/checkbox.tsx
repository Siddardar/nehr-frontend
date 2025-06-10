import { Check } from "lucide-react";
import { Tag } from "@/app/search/page";

type AttributeList = {
  title: string,
  attributes: Tag & {icon: any},
  selectedAttributes: number[],
  onAttributeToggle: Function,
  variant: "default" | "compact" | "large",
  showCounter: boolean
}

export const AttributeList = ({ 
  title, 
  attributes, 
  selectedAttributes, 
  onAttributeToggle, 
  variant = 'default',
  showCounter = true 
}: AttributeList ) => {
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
  const selectedCount = selectedAttributes.length;

  return (
    <div className={styles.container}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showCounter && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {selectedCount} selected
            </span>
          )}
        </div>/
      </div>
      
      <div className="divide-y divide-gray-100">
        {attributes.map((attribute) => {
          const isSelected = selectedAttributes.includes(attribute.id);
          const Icon = attribute.icon;
          
          return (
            <div
              key={attribute.id}
              onClick={() => onAttributeToggle(attribute.id)}
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
                    {attribute.title}
                  </h4>
                  <p className={`${styles.subtitle} text-gray-600 truncate`}>
                    {attribute.subtitle}
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
        })}
      </div>
    </div>
  );
};
