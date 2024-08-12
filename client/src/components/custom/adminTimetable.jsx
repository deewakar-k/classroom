import React from 'react'
import Timetable from './timetable'
import Navbar from './navbar'

function AdminTimetable() {
  return (
    <>
      <div className='flex flex-col h-screen'>
        <Navbar heading={"Timetable"} />
        <div className="flex-1 flex items-center justify-center mt-16 bg-white border border-gray-200 rounded-lg">
          <div className="w-full max-w-5xl">
            <Timetable />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminTimetable
