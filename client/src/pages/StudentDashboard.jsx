import Navbar from '@/components/custom/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

function StudentDashboard() {
  return (
    <>
      <Navbar heading={"Dashboard"} />
      <div className='ml-96 py-32 flex gap-x-4'>
        <Link to={'/s-classroom'}>
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
        <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
          <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Marks
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <h1>click to view your result!</h1>
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
          <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Attendence
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <h1>view your attendence..</h1>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default StudentDashboard
