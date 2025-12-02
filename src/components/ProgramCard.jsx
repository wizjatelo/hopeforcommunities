import React from 'react'
import { GraduationCap, HeartHandshake, Wrench } from 'lucide-react'

const iconMap = {
  'GraduationCap': GraduationCap,
  'HeartHandshake': HeartHandshake,
  'Wrench': Wrench
}

function ProgramCard({ icon, title, description }) {
  const IconComponent = iconMap[icon]

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
      <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-4">
        {IconComponent && <IconComponent className="w-8 h-8 text-primary" />}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-text-light leading-relaxed">{description}</p>
    </div>
  )
}

export default ProgramCard
