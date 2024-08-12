import React from 'react'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogClose } from '@radix-ui/react-dialog'

function ClassroomDialogFooter() {

  const [schedule, setSchedule] = useState([{ day: '', startTime: '', endTime: '' }]);

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', startTime: '', endTime: '' }]);
  };
  return (
    <>
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
    </>
  )
}

export default ClassroomDialogFooter
