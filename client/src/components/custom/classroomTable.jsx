import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const apiURL = process.env.BACKEND_URL

function ClassroomTable() {

  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`${apiURL}/v1/admin/teachers`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        setTeachers(Array.isArray(response.data.teachers) ? response.data.teachers : []);


      } catch (err) {
        console.error('error fetching teachers', err)

      }
    }
    fetchTeacher()
  }, [])

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/v1/class/`);
        console.log('Classroom data:', response.data);
        const classroomData = response.data.classes
        setClassrooms(classroomData);
      } catch (err) {
        console.error('error fetching class details')
      }
    }
    fetchClassroom();
  }, [])

  const getTeacherName = (classId) => {
    if (!Array.isArray(teachers)) {
      console.error('Teachers data is not an array:', teachers);
      return 'Not assigned';
    }

    const teacher = teachers.find(teacher => teacher.classId === classId);
    return teacher ? teacher.name : 'not assigned';
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/api/v1/class/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      toast(
        'Success', {
        description: 'Classroom removed successfully.',
      });
      setClassrooms(classrooms.filter(classroom => classroom._id !== id));

    } catch (err) {
      console.error("error deleting classroom")

      toast('Error', {
        description: 'Failed to deleted classroom, Please tyy again.'
      })
    }
  }

  return (
    <>
      <div className='pt-16 flex justify-center'>
        <div className='w-full max-w-6xl px-4'>
          <Table>
            <TableCaption>A list of classrooms.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead className="font-bold">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classrooms.map((classroom) => (
                <TableRow key={classroom._id}>
                  <TableCell className="font-medium">{classroom.name}</TableCell>
                  <TableCell>
                    {getTeacherName(classroom._id)}
                  </TableCell>
                  <TableCell>
                    {classroom.schedule.map((entry, index) => (
                      <div key={index}>
                        {entry.day} {entry.startTime} - {entry.endTime}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(classroom._id)} variant="ghost" className="text-red-800">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </div>
    </>

  )
}

export default ClassroomTable
