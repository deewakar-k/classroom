import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { BACKEND_URL } from '../../../config.js'


function ClassroomDialog() {
  const [name, setName] = useState('');
  const [schedule, setSchedule] = useState([{ day: '', startTime: '', endTime: '' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [name]: value };
    setSchedule(newSchedule);
  };

  const handleRemoveSchedule = (index) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', startTime: '', endTime: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/class/create`, {
        name,
        schedule,
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      console.log('Classroom created successfully:', response.data);

      toast.success('Classroom created successfully.');
    } catch (error) {
      console.error('Error creating classroom:', error);
      toast.error('Error creating classroom.');
    }
  };


  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/admin/teachers`, {
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
        const response = await axios.get(`${BACKEND_URL}/api/v1/class/`);
        console.log('Classroom data:', response.data);
        const classroomData = response.data.classes
        setClassrooms(classroomData);
      } catch (err) {
        console.error('error fetching class details')
      }
    }
    fetchClassroom();
  }, [])

  const handleAssign = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${BACKEND_URL}/api/v1/class/assign/teacher`, {
        teacherId: selectedTeacher,
        classId: selectedClassroom
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      toast(
        'Success', {
        description: 'Teacher assigned successfully.',
      })

    } catch (err) {
      console.error('error assinging teacher')
      toast(
        'Error', {
        description: 'Failed to assigning teacher. Please try again.',
      })
    }
  }


  return (
    <>
      <div className='relative'>
        <div className='fixed top-16 right-8'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className='text-green-500'>Assign Teacher to Classroom</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] min-h-[350px]">
              <DialogHeader>
                <DialogTitle>Assign Teacher</DialogTitle>
                <DialogDescription>
                  Please select a teacher and a classroom to assign the teacher.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAssign} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Teacher</Label>
                  <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(teachers) && teachers.map(teacher => (
                        <SelectItem key={teacher._id} value={teacher._id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Classroom</Label>
                  <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(classrooms) && classrooms.map(classItem => (
                        <SelectItem key={classItem._id} value={classItem._id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <DialogFooter className="mt-3 flex justify-end">
                  <Button type="submit">Assign Teacher</Button>
                  <DialogClose>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='relative'>
        <div className='fixed bottom-8 right-8'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className='text-green-500'>create new classroom?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] min-h-[350px]">
              <DialogHeader>
                <DialogTitle>Create Classroom</DialogTitle>
                <DialogDescription>
                  Please enter the required details to create a new classroom.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label>Schedule</Label>
                  {schedule.map((entry, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label htmlFor={`day-${index}`} className="text-sm font-medium">Day</Label>
                          <Input
                            id={`day-${index}`}
                            name="day"
                            type="text"
                            value={entry.day}
                            onChange={(e) => handleInputChange(index, e)}
                            className="border px-3 py-2 rounded"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`startTime-${index}`} className="text-sm font-medium">Start Time</Label>
                          <Input
                            id={`startTime-${index}`}
                            name="startTime"
                            type="time"
                            value={entry.startTime}
                            onChange={(e) => handleInputChange(index, e)}
                            className="border px-3 py-2 rounded"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`endTime-${index}`} className="text-sm font-medium">End Time</Label>
                          <Input
                            id={`endTime-${index}`}
                            name="endTime"
                            type="time"
                            value={entry.endTime}
                            onChange={(e) => handleInputChange(index, e)}
                            className="border px-3 py-2 rounded"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => handleRemoveSchedule(index)}
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <DialogFooter className="relative mt-3 flex justify-between items-center">
                    <div className="absolute left-0 flex items-center">
                      <Button onClick={handleAddSchedule} className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M5 12l14 0" />
                        </svg>
                        <span>Add Schedule</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button type="submit">Create Classroom</Button>
                      <DialogClose>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default ClassroomDialog

