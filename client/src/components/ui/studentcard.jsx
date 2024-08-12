import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function StudentCard() {
  return (
    <Card className="w-full sm:w-[400px] lg:w-[500px] py-4 cursor-pointer transition-transform transform hover:scale-105">
      <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">
          Student
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        <p className='text-left'>To login, click here...</p>
      </CardContent>
    </Card>
  )
}

export default StudentCard
