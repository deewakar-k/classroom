import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
      <div className="flex m-0 p-0 overflow-hidden h-screen">
        <div className="w-1/2 bg-zinc-900 flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">"To teach is to touch a life forever." </h1>
        </div>
        <div className="w-1/2 bg-white flex items-center justify-center">
          <Link to={'/signin'}>
            <Button variant="ghost" className="text-3xl">Sign In</Button>
          </Link>
        </div>
      </div >
    </>
  )
}

export default Hero
