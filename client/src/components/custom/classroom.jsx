import React from 'react'
import Navbar from './navbar'
import ClassroomDialog from './classroomDialog'
import ClassroomTable from './classroomTable'


function Classroom() {

  return (
    <>
      <Navbar heading={"Classroom"} />
      <ClassroomTable />
      <ClassroomDialog />
    </>
  )
}
export default Classroom
