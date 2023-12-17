import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
    <div id='toll-header' className='flex  z-10 justify-center items-center h-20 shadow-lg'>
      <h1 id="heading" className='text-2xl font-semibold'>Toll Calculator</h1>
    </div>
  )
}