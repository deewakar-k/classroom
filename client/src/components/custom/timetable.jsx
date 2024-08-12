import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import '../../custom.css'
import { BACKEND_URL } from 'config';

function Timetable() {

  const [periods, setPeriods] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPeriodsAndSubjects = async () => {
      try {
        const periodsResponse = await axios.get(`${BACKEND_URL}/api/v1/teacher/periods`);
        const subjectsResponse = await axios.get(`${BACKEND_URL}/api/v1/subject/`);

        const fetchedPeriods = periodsResponse.data.periods;
        const fetchedSubjects = subjectsResponse.data.subjects;

        const subjectMap = fetchedSubjects.reduce((map, subject) => {
          map[subject._id] = subject.name;
          return map;
        }, {});

        const calendarEvents = fetchedPeriods.map(period => {
          const startTime = new Date(`1970-01-01T${period.startTime}`);
          const endTime = new Date(`1970-01-01T${period.endTime}`);

          return {
            id: period._id,
            title: `${subjectMap[period.subjectId] || 'Unknown'}`,
            start: `2024-08-12T${period.startTime}`,
            end: `2024-08-12T${period.endTime}`,
            daysOfWeek: [
              period.day === 'Monday' ? 1 :
                period.day === 'Tuesday' ? 2 :
                  period.day === 'Wednesday' ? 3 :
                    period.day === 'Thursday' ? 4 :
                      period.day === 'Friday' ? 5 :
                        period.day === 'Saturday' ? 6 :
                          period.day === 'Sunday' ? 0 :
                            undefined
            ]
          };
        });

        setPeriods(fetchedPeriods);
        setSubjects(fetchedSubjects);
        setEvents(calendarEvents);
      } catch (err) {
        console.error('Error fetching periods or subjects', err);
      }
    };

    fetchPeriodsAndSubjects();
  }, []);


  const handleDateClick = (info) => {
    console.log('Date clicked:', info.dateStr);
  };

  return (
    <>
      <div className='calender-container'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          dateClick={handleDateClick}
          handleToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
        />

      </div>
    </>
  )
}

export default Timetable
