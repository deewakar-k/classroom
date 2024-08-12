import React from 'react'
import Navbar from './navbar'
import Timetable from './timetable'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Link } from 'react-router-dom'

function Overview() {
  return (
    <div>
      <Navbar heading={"Dashboard"} />
      <div className='ml-96 py-32 flex gap-x-4'> {/* Added gap-x-4 for horizontal space between cards */}
        <Link to={'/admin-classroom'}>
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
        <Link to={'/admin-teacher'}>
          <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Teacher's
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <h1>1</h1>
            </CardContent>
          </Card>
        </Link>
        <Link to={'/admin-students'}>
          <Card className="w-full sm:w-[200px] lg:w-[300px] py-4 cursor-pointer transition-transform transform hover:scale-105">
            <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                Student's
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <h1>1</h1>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Overview
