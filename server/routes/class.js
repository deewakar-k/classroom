const express = require('express')

const adminMiddleware = require('../middlewares/admin.js')
const Class = require('../models/classSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const teacherMiddleware = require('../middlewares/teacher.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();

    if (!classes) {
      return res.status(400).json({ msg: "couldn't find classes" })
    }

    res.status(200).json({
      classes
    })

  } catch {
    res.status(500).json({ msg: "error getting classes" })
  }
})

router.get('/teacher/students', teacherMiddleware, async (req, res) => {

  try {
    const teacherId = req.user.id;

    const teacher = await Teacher.findById(teacherId).select("classId")

    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    const students = await Student.find({ classId: teacher.classId });

    res.status(200).json({ students });

  } catch (err) {
    res.status(500).json({ msg: "error fetching students" })
  }
})

router.post('/create', adminMiddleware, async (req, res) => {

  const { name, schedule } = req.body

  const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const isValidSchedule = schedule.every(entry => {
    return validDays.includes(entry.day) && entry.startTime && entry.endTime;
  })

  if (!isValidSchedule) {
    return res.status(400).json({ msg: "invalid schedule" })
  }

  try {

    const classroom = new Class({
      name,
      schedule,
    })

    await classroom.save()

    res.status(200).json({ msg: "classroom created successfully" })

  } catch (err) {
    res.status(500).json({
      msg: "error creating class",
      err
    })
  }
})

router.put('/assign/teacher', adminMiddleware, async (req, res) => {
  const { teacherId, classId } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId)
    const classroom = await Class.findById(classId)

    if (!teacher) {
      return res.status(400).json({ msg: "teacher doesn't exists" })
    }
    if (!classroom) {
      return res.status(400).json({ msg: "classroom doesn't exists" })
    }

    if (teacher.classId && teacher.classId.toString() !== classId) {
      return res.status(400).json({ msg: "teacher already assigned to a class" })
    }

    teacher.classId = classId;
    await teacher.save();

    res.status(200).json({
      msg: "teacher assigned to the class",
      class: classroom.name
    })

  } catch (err) {
    res.status(500).json({
      msg: "error assigning teacher to class",
      err: err
    })
  }
})

router.put('/assign/student', adminMiddleware, async (req, res) => {
  const { studentId, teacherId } = req.body

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(400).json({ msg: "student doesn't exits" })
    }

    const teacher = await Teacher.findById(teacherId)

    if (!teacher) {
      return res.status(400).json({
        msg: "teacher doesn't exists"
      })
    }

    student.teacherId = teacherId;
    await student.save();

    if (!teacher.students.includes(studentId)) {
      teacher.students.push(studentId);
      await student.save()
    }

    res.status(200).json({ msg: "student assigned to teacher" })
  } catch (err) {
    res.status(500).json({
      msg: "error assigning student to teacher"
    })
  }
})

router.delete('/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const classroom = await Class.findByIdAndDelete(id);

    if (!classroom) {
      return res.status(400).json({ msg: "invalid classroom" })
    }

    res.status(200).json({ msg: "classroom deleted!" })

  } catch (err) {
    res.status(500).json({ msg: "error deleting class" })
  }
})


module.exports = router
