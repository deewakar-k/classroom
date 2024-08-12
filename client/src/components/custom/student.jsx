import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Navbar from './navbar'
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BACKEND_URL } from '../../../config.js'

function Student() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/class/`);
        const classData = response.data.classes;
        setClasses(Array.isArray(classData) ? classData : []);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (value) => {
    setClassId(value);
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BACKEND_URL}/api/v1/admin/signup/student`, {
        name,
        email,
        password,
        classId,
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      toast(
        'Success', {
        description: 'Student registered successfully.',
      });
    } catch (error) {
      console.error('Error during signup:', error);

      toast(
        'Error', {
        description: 'Failed to register student. Please try again.',
      });
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/admin/students/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      setStudents(students.filter(student => student._id !== id))

      toast(
        'Success', {
        description: 'Student registered successfully.',
      });

    } catch (err) {
      console.error('error deleting student')

      toast('Error', {
        description: 'Failed to deleted student, Please try again.'
      })
    }
  }

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/admin/students`)
      .then(response => {
        setStudents(response.data.students)
      })
      .catch(err => {
        console.error('error fetching student', err)
      })
  }, [])

  return (
    <>
      <Navbar heading={"Student's"} />
      <div className='pt-16 flex justify-center'>
        <div className='w-full max-w-6xl px-4'>
          <Table>
            <TableCaption>A list of your teachers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class ID</TableHead>
                <TableHead className="font-bold text-black">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.classId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(student._id)} variant="ghost" className="text-red-800">delete</Button>
                  </TableCell>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
        </div>
      </div>

      <div className='relative'>
        <div className='fixed bottom-8 right-8'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className='text-green-500'>register new student?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] min-h-[350px]">
              <DialogHeader>
                <DialogTitle>Sign up</DialogTitle>
                <DialogDescription>
                  Please enter credentials to register new students.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSignup} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Password
                  </Label>
                  <Input id="password" type="password" className="col-span-3"
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Class
                  </Label>
                  <Select value={classId} onValueChange={setClassId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(classes) && classes.map(classItem => (
                        <SelectItem key={classItem._id} value={classItem._id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <DialogClose>
                  <DialogFooter className="mt-3 flex justify-end">
                    <Button type="submit">Sign up</Button>
                  </DialogFooter>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default Student

