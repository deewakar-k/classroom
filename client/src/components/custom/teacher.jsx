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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { toast } from 'sonner'
import { DialogClose } from '@radix-ui/react-dialog'

import { BACKEND_URL } from '../../../config.js'

function Teacher() {

  const [teachers, setTeachers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BACKEND_URL}/api/v1/admin/signup/teacher`, {
        name,
        email,
        password,
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      toast(
        'Success', {
        description: 'Teacher registered successfully.',
      });
    } catch (error) {
      console.error('Error during signup:', error);

      toast(
        'Error', {
        description: 'Failed to register teacher. Please try again.',
      });
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/admin/teachers/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      setTeachers(teachers.filter(teacher => teacher._id !== id))

      toast(
        'Success', {
        description: 'Teacher removed successfully.',
      });

    } catch (err) {
      console.error('error deleting teacher')

      toast('Error', {
        description: 'Failed to deleted teacher, Please tyy again.'
      })
    }
  }

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/admin/teachers`)
      .then(response => {
        setTeachers(response.data.teachers)
      })
      .catch(err => {
        console.error('error fetching teachers', err)
      })
  }, [])



  return (
    <>
      <Navbar heading={"Teacher's"} />
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
              {teachers.map(teacher => (
                <TableRow key={teacher._id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.classId}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(teacher._id)} variant="ghost" className="text-red-800">delete</Button>
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
              <Button variant="outline" className='text-green-500'>register new teacher?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] min-h-[350px]">
              <DialogHeader>
                <DialogTitle>Sign up</DialogTitle>
                <DialogDescription>
                  Please enter credentials to register new teacher.
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
                <DialogClose>
                  <DialogFooter className="mt-3">
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

export default Teacher
