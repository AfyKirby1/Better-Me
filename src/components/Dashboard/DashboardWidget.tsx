import React from 'react'

interface DashboardWidgetProps {
  title: string
  children: React.ReactNode
  className?: string
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ 
  title, 
  children, 
  className = "card" 
}) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default DashboardWidget

