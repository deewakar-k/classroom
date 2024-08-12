require('dotenv').config()
const express = require('express')
const Teacher = require('../models/teacherSchema.js')
const Student = require('../models/studentSchema.js')
const Class = require('../models/classSchema.js')
const Subject = require('../models/subjectSchema.js')
const Period = require('../models/periodSchema.js')

const jwt = require('jsonwebtoken')
const teacherMiddleware = require('../middlewares/teacher.js')
const Timetable = require('../models/timetableSchema.js')
const router = express.Router()

router.post("/signin", async (req, res) => {
  const { email } = req.body
  try {
    const teacher = await Teacher.findOne({
      email: email
    })

    if (!teacher) {
      return res.status(400).json({
        msg: "incorrect inputs / account doesn't exists"
      })
    }

    const token = jwt.sign({
      _id: teacher._id
    }, process.env.JWT_SECRET)

    res.status(200).json({
      msg: "teacher logged in",
      token: token
    })

  } catch (err) {
    res.status(500).json({
      msg: "error signing in teacher acc",
      err
    })
  }
})

router.post('/signup/student', teacherMiddleware, async (req, res) => {
  const { name, email, password, classId } = req.body;

  try {
    const existingStudent = await Student.findOne({ email })

    if (existingStudent) {
      return res.status(401).json({ msg: "student already exists" })
    }

    const student = new Student({
      name,
      email,
      password,
      classId
    })

    await student.save();

    res.status(200).json({
      msg: "student created",
    })

  } catch (err) {
    res.status(400).json({ msg: "error creating user", err: err })
  }
})

router.post('/subject', teacherMiddleware, async (req, res) => {
  const { name, code, classId } = req.body;

  try {
    const classroom = await Class.findById(classId);

    if (!classroom) {
      return res.status(400).json({ msg: "classroom doesn't exists" })
    }

    const subject = new Subject({
      name,
      code,
      classId
    });

    await subject.save();

    res.status(200).json({
      msg: "subject created!",
    })

  } catch (err) {
    res.status(500).json({ msg: "error creating subject" })
  }
})

const toDate = (time) => new Date(`1970-01-01T${time}:00Z`);

router.post('/period', teacherMiddleware, async (req, res) => {
  const { subjectId, day, startTime, endTime } = req.body;

  try {
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(400).json({ msg: "subject doesn't exists / invalid inputs" })
    }

    const classroom = await Class.findById(subject.classId)

    if (!classroom) {
      return res.status(400).json({ msg: "classroom doesn't exists" })
    }

    const classSchedule = classroom.schedule.find(s => s.day === day);

    if (!classSchedule) {
      return res.status(400).json({ msg: "class schedule doesn't include this day" })
    }

    const periodStartTime = toDate(startTime);
    const periodEndTime = toDate(endTime)
    const scheduleStartTime = toDate(classSchedule.startTime)
    const scheduleEndTime = toDate(classSchedule.endTime)

    if (periodStartTime < scheduleStartTime || periodEndTime > scheduleEndTime) {
      return res.status(400).json({
        msg: "out of class hours"
      })
    }

    const period = new Period({
      subjectId,
      day,
      startTime,
      endTime
    })

    await period.save();

    res.status(200).json({ msg: "period created successfully" })

  } catch (err) {
    res.status(500).json({ msg: "error creating period" })
  }
})

function parseTime(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

router.post('/timetable', async (req, res) => {
  const { classroomId, periods } = req.body;

  try {
    // Find the classroom
    const classroom = await Class.findById(classroomId);
    if (!classroom) {
      return res.status(400).json({ msg: "Classroom not found" });
    }

    // Find periods by IDs
    const periodObjects = await Period.find({ _id: { $in: periods } });
    console.log('Fetched periods:', periodObjects); // Log periods to verify

    if (periodObjects.length !== periods.length) {
      return res.status(400).json({ msg: "One or more periods do not exist" });
    }

    for (const period of periodObjects) {
      const { day, startTime, endTime } = period;

      const periodStartTime = new Date(`1970-01-01T${parseTime(startTime)}:00Z`);
      const periodEndTime = new Date(`1970-01-01T${parseTime(endTime)}:00Z`);

      const classSchedule = classroom.schedule.find(s => s.day === day);

      if (!classSchedule) {
        return res.status(400).json({ msg: `Schedule for ${day} not found in classroom` });
      }

      const classStartTime = new Date(`1970-01-01T${parseTime(classSchedule.startTime)}:00Z`);
      const classEndTime = new Date(`1970-01-01T${parseTime(classSchedule.endTime)}:00Z`);

      if (periodStartTime < classStartTime || periodEndTime > classEndTime) {
        return res.status(400).json({ msg: `Period on ${day} is outside of the class hours` });
      }

      const overlappingPeriods = periodObjects.filter(p =>
        p.day === period.day &&
        ((new Date(`1970-01-01T${parseTime(p.startTime)}:00Z`) < periodEndTime) &&
          (new Date(`1970-01-01T${parseTime(p.endTime)}:00Z`) > periodStartTime))
      );

      if (overlappingPeriods.length > 1) {
        return res.status(400).json({ msg: "Periods overlap on the same day" });
      }
    }

    // Create timetable with classroomId and periods
    const timetable = new Timetable({ classroomId, periods });
    await timetable.save();

    res.status(200).json({ msg: "Timetable created!" });

  } catch (err) {
    res.status(500).json({ msg: "Error creating timetable", err });
  }
});

router.get('/periods', async (req, res) => {
  try {
    const periods = await Period.find();

    if (!periods) {
      return res.status(400).json({ msg: "no periods found" })
    }

    res.status(200).json({
      periods
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching periods" })
  }
})

router.delete('/students/:id', teacherMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(400).json({ msg: "invalid id" })
    }

    res.status(200).json({ msg: "student deleted!" })

  } catch {
    res.status(500).json({ msg: "error deleting student" })
  }
})

module.exports = router
