import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import axios from 'axios';
import { toast } from 'sonner';
import { BACKEND_URL } from 'config';

function TeacherClassroom() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/class/teacher/students`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setStudents(response.data.students);
      } catch (err) {
        setError('Failed to fetch students.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/teacher/students/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      toast(
        'Success', {
        description: 'Student removed successfully.',
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      console.error("error deleting student")

      toast('Error', {
        description: 'Failed to deleted Student, Please try again.'
      })
    }
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <Navbar heading={"Classroom"} />
      </div>
      <div className='pt-16 flex justify-center'>
        <div className='w-full max-w-6xl px-4'>
          <Table>
            <TableCaption>Your classmates.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default TeacherClassroom
