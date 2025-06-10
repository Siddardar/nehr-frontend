"use client"
import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Weight, 
  Eye, 
  Ear, 
  Brain, 
  Shield, 
  Pill, 
  Stethoscope,
  Check,
  X,
  Wind
} from 'lucide-react';

// Reusable Attribute List Component
export const AttributeList = ({ 
  title, 
  attributes, 
  selectedAttributes, 
  onAttributeToggle, 
  variant = 'default',
  showCounter = true 
}) => {
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
        </div>
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

// Demo Component showing different use cases
export default function AttributeListDemo() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState(['proc-1']);
  const [selectedVitals, setSelectedVitals] = useState(['vital-1', 'vital-2']);

  // Sample data for different attribute lists
  const symptoms = [
    {
      id: 'symp-1',
      title: 'Chest Pain',
      subtitle: 'Sharp pain in chest area',
      icon: Heart
    },
    {
      id: 'symp-2',
      title: 'Shortness of Breath',
      subtitle: 'Difficulty breathing during activity',
      icon: Wind
    },
    {
      id: 'symp-3',
      title: 'Headache',
      subtitle: 'Persistent pain in head region',
      icon: Brain
    },
    {
      id: 'symp-4',
      title: 'Fever',
      subtitle: 'Elevated body temperature',
      icon: Thermometer
    },
    {
      id: 'symp-5',
      title: 'Joint Pain',
      subtitle: 'Pain and stiffness in joints',
      icon: Activity
    }
  ];

  const procedures = [
    {
      id: 'proc-1',
      title: 'Blood Test',
      subtitle: 'Complete blood count analysis',
      icon: Activity
    },
    {
      id: 'proc-2',
      title: 'X-Ray',
      subtitle: 'Chest X-ray examination',
      icon: Shield
    },
    {
      id: 'proc-3',
      title: 'ECG',
      subtitle: 'Electrocardiogram test',
      icon: Heart
    },
    {
      id: 'proc-4',
      title: 'Eye Exam',
      subtitle: 'Comprehensive eye examination',
      icon: Eye
    }
  ];

  const vitals = [
    {
      id: 'vital-1',
      title: 'Blood Pressure',
      subtitle: 'Systolic and diastolic pressure',
      icon: Heart
    },
    {
      id: 'vital-2',
      title: 'Heart Rate',
      subtitle: 'Beats per minute measurement',
      icon: Activity
    },
    {
      id: 'vital-3',
      title: 'Temperature',
      subtitle: 'Body temperature reading',
      icon: Thermometer
    },
    {
      id: 'vital-4',
      title: 'Weight',
      subtitle: 'Current body weight',
      icon: Weight
    }
  ];

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleProcedureToggle = (procedureId) => {
    setSelectedProcedures(prev => 
      prev.includes(procedureId)
        ? prev.filter(id => id !== procedureId)
        : [...prev, procedureId]
    );
  };

  const handleVitalToggle = (vitalId) => {
    setSelectedVitals(prev => 
      prev.includes(vitalId)
        ? prev.filter(id => id !== vitalId)
        : [...prev, vitalId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attribute List Components</h1>
          <p className="text-gray-600">Interactive clickable lists for patient data collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Symptoms List */}
          <div>
            <AttributeList
              title="Patient Symptoms"
              attributes={symptoms}
              selectedAttributes={selectedSymptoms}
              onAttributeToggle={handleSymptomToggle}
              variant="default"
            />
          </div>

          {/* Procedures List - Compact */}
          <div>
            <AttributeList
              title="Recommended Procedures"
              attributes={procedures}
              selectedAttributes={selectedProcedures}
              onAttributeToggle={handleProcedureToggle}
              variant="compact"
            />
          </div>

          {/* Vitals List - Large */}
          <div>
            <AttributeList
              title="Vital Signs to Monitor"
              attributes={vitals}
              selectedAttributes={selectedVitals}
              onAttributeToggle={handleVitalToggle}
              variant="large"
              showCounter={true}
            />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Component Usage</h2>
          <div className="prose text-gray-600">
            <p className="mb-4">The AttributeList component accepts the following props:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>title:</strong> The header title for the list</li>
              <li><strong>attributes:</strong> Array of objects with id, title, subtitle, and icon</li>
              <li><strong>selectedAttributes:</strong> Array of selected attribute IDs</li>
              <li><strong>onAttributeToggle:</strong> Function called when an item is clicked</li>
              <li><strong>variant:</strong> 'default', 'compact', or 'large' styling</li>
              <li><strong>showCounter:</strong> Boolean to show/hide the selection counter</li>
            </ul>
            <p>Each attribute should have the structure:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm mt-2">
{`{
  id: 'unique-id',
  title: 'Main Title',
  subtitle: 'Description text',
  icon: LucideIcon
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}