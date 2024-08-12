import React from 'react'
import AdminCard from '@/components/ui/admincard'
import StudentCard from '@/components/ui/studentcard'
import TeacherCard from '@/components/ui/teachercard'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const apiURL = process.env.BACKEND_URL


function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminSignin = async (e) => {
    e.preventDefault();


    const response = await axios.post(`${apiURL}/api/v1/admin/signin`, {
      email,
      password
    }
    );

    const token = response.data.token;
    localStorage.setItem('token', token);
    navigate('/admin-dashboard')
  }

  const handleTeacherSignin = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${apiURL}/api/v1/teacher/signin`, {
      email,
      password
    })

    const token = response.data.token;
    localStorage.setItem('token', token);
    navigate('/t-dashboard')
  }

  const handleStudentSignin = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${apiURL}/api/v1/student/signin`, {
      email,
      password
    })

    const token = response.data.token;
    localStorage.setItem('token', token);
    navigate('/s-dashboard')
  }

  return (
    <>
      <div className='flex flex-col h-screen justify-center items-center gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <AdminCard />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] min-h-[350px]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Please enter your credentials to access <span className='text-black'>administrative</span> dashboard.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAdminSignin} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3" onChange={
                  (e) => setEmail(e.target.value)
                } />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-3">
                <Button type="submit">Sign In</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button>
              <TeacherCard />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] min-h-[350px]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Please enter your credentials to access <span className='text-black'>teacher's</span> dashboard.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTeacherSignin} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3" onChange={
                  (e) => setEmail(e.target.value)
                } />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-3">
                <Button type="submit">Sign In</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button>
              <StudentCard />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] min-h-[350px]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>
                Please enter your credentials to access <span className='text-black'>student's</span> dashboard.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleStudentSignin} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3" onChange={
                  (e) => setEmail(e.target.value)
                } />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Password
                </Label>
                <Input id="password" type="password" className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <DialogFooter className="mt-3">
                <Button type="submit">Sign In</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default Signin
