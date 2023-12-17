import Image from 'next/image'
import React from 'react'

type Props = {
    url?: string,
    name: string,
    type: "submit" | "button" | undefined
    id: string
    onClick?:()=>void

}

export default function Button({url,name,type,id,onClick}: Props) {
  return (
      <button className='bg-blue-400 w-auto flex justify-center items-center  rounded p-2' id={id} type={type} onClick={onClick}>
          {url ?
              <Image id="image" src={url} alt={'swap'} /> : <span id="name" className='text-base'>{name}</span>
        }
          
    </button>
  )
}