import Navbar from '@/components/custom/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

function TeacherDashboard() {
  return (
    <>
      <Navbar heading={"Dashboard"} />
      <div className='ml-96 py-32 flex gap-x-4'>
        <Link to={'/t-classroom'}>
          <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Classroom's
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <h1>1</h1>
            </CardContent>
          </Card>
        </Link>
        <Link to={'/t-timetable'}>
          <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Timetable
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <h1>create time table</h1>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  )
}

export default TeacherDashboard
