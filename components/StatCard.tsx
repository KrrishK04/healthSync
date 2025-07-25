import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
interface StatCardProps{
    type: 'appointments' | 'cancelled' | 'pending'
    count: number
    label: string
    icon: string 
}
const StatCard = ({count=0, label, icon, type}: StatCardProps) => {
  return (
    <div className={clsx('stat-card',{
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled'
    })}>
      <div className='flex items-center gap-4'>
        <Image 
            src={icon}
            alt={label}
            width={32}
            height={32}
            className="size-8 w-fit"
        />
        <h2 className='text-white text-32-bold  '>{count}</h2>
      </div>
      <p className='text-14-regular'>{label}</p>
    </div>
  )
}

export default StatCard
