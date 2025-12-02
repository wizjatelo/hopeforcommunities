import React from 'react'
import { ChevronUp, ChevronDown, GraduationCap, HeartHandshake, BookOpen, Wrench, Building2 } from 'lucide-react'

const iconMap = {
  'GraduationCap': GraduationCap,
  'HeartHandshake': HeartHandshake,
  'BookOpen': BookOpen,
  'Wrench': Wrench,
  'Building2': Building2
}

function ProgramDetail({ icon, title, description, details, impact, cta }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const IconComponent = iconMap[icon]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-text-light">{description}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? 
              <ChevronUp className="w-5 h-5 text-text-light" /> : 
              <ChevronDown className="w-5 h-5 text-text-light" />
            }
          </button>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-2">Program Details</h4>
              <p className="text-text-light">{details}</p>
            </div>
            {impact && (
              <div>
                <h4 className="font-semibold text-lg mb-2">Impact</h4>
                <p className="text-text-light">{impact}</p>
              </div>
            )}
            <div className="pt-4">
              <a href={cta.link} className="btn-primary">{cta.text}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramDetail
