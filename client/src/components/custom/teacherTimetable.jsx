import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Navbar from './navbar';
import { BACKEND_URL } from '../../../config.js'

function TeacherTimetable() {
  const [classrooms, setClassrooms] = useState([]);
  const [classroomId, setClassroomId] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    // Fetch classrooms and periods
    const fetchData = async () => {
      try {
        const classroomResponse = await axios.get(`${BACKEND_URL}/api/v1/class/`);
        setClassrooms(classroomResponse.data.classes);

        const periodResponse = await axios.get(`${BACKEND_URL}/api/v1/teacher/periods`);
        setPeriods(periodResponse.data.periods);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/v1/teacher/timetable`, {
        classroomId,
        periods: periods.map(p => ({ ...p, startTime: new Date(p.startTime).toISOString(), endTime: new Date(p.endTime).toISOString() }))
      });
      toast.success('Timetable created successfully!');
    } catch (error) {
      console.error('Error creating timetable:', error);
      toast.error('Error creating timetable, please try again.');
    }
  };

  const handlePeriodChange = (index, field, value) => {
    const newPeriods = [...periods];
    newPeriods[index] = { ...newPeriods[index], [field]: value };
    setPeriods(newPeriods);
  };

  const handleAddPeriod = () => {
    setPeriods([...periods, { day: '', startTime: '', endTime: '' }]);
  };

  const handleRemovePeriod = (index) => {
    const newPeriods = periods.filter((_, i) => i !== index);
    setPeriods(newPeriods);
  };

  return (
    <>
      <Navbar heading={"Timetable"} />
      <div className='flex justify-center items-center mt-64'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-green-500">Create New Timetable</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] min-h-[350px]">
            <DialogHeader>
              <DialogTitle>Create Timetable</DialogTitle>
              <DialogDescription>
                Please enter the required details to create a new timetable.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classroomId" className="text-left">
                  Classroom
                </Label>
                <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(classrooms) && classrooms.map(classroom => (
                      <SelectItem key={classroom._id} value={classroom._id}>
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>


              </div>

              <div className="space-y-1">
                <Label>Periods</Label>
                {periods.map((period, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Label htmlFor={`day-${index}`} className="text-sm font-medium">Day</Label>
                        <Input
                          id={`day-${index}`}
                          name="day"
                          type="text"
                          value={period.day}
                          onChange={(e) => handlePeriodChange(index, 'day', e.target.value)}
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
                          value={period.startTime}
                          onChange={(e) => handlePeriodChange(index, 'startTime', e.target.value)}
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
                          value={period.endTime}
                          onChange={(e) => handlePeriodChange(index, 'endTime', e.target.value)}
                          className="border px-3 py-2 rounded"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleRemovePeriod(index)}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <DialogFooter className="relative mt-3 flex justify-between items-center">
                  <div className="absolute left-0 flex items-center">
                    <Button onClick={handleAddPeriod} className="flex items-center space-x-2">
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
                      <span>Add Period</span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button type="submit">Create Timetable</Button>
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
    </>
  )
}

export default TeacherTimetable
