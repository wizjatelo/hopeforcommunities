import React from 'react'
import { 
  Heart, Cross, ShieldCheck, Leaf, Target, Eye, Check, Download, Quote 
} from 'lucide-react'

const iconMap = {
  'heart': Heart,
  'cross': Cross,
  'shield-check': ShieldCheck,
  'leaf': Leaf,
  'target': Target,
  'eye': Eye,
  'check': Check,
  'download': Download,
  'quote': Quote
}

function Icon({ iconName }) {
  const IconComponent = iconMap[iconName]

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`)
    return null
  }

  return (
    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-secondary">
      <IconComponent className="w-6 h-6 text-primary" />
    </div>
  )
}

export default Icon
