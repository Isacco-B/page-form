import React from 'react'

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col flex-grow container mx-auto'>{children}</div>
  )
}
