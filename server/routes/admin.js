require('dotenv').config()
const express = require('express')

const Admin = require('../models/adminSchema.js');
const Teacher = require('../models/teacherSchema.js')
const Student = require('../models/studentSchema.js')

const adminMiddleware = require('../middlewares/admin.js')

const jwt = require('jsonwebtoken');
const teacherMiddleware = require('../middlewares/teacher.js');
const Timetable = require('../models/timetableSchema.js');
const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email } = req.body

  try {
    const admin = await Admin.findOne({ email })

    if (admin.email !== "principal@classroom.com") {
      return res.status(401).json({
        msg: "invalid inputs / unauthorized"
      })
    }

    const token = jwt.sign({
      _id: admin._id
    }, process.env.JWT_SECRET)

    res.status(200).json({
      msg: "admin signed in",
      token: token
    })

  } catch (err) {
    res.status(400).json({
      msg: "invalid inputs",
      err: err.message
    })
  }
})

router.post('/signup/teacher', adminMiddleware, async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(401).json({ msg: "teacher already exists" })
    }

    const teacher = new Teacher({ name, email, password, role })
    await teacher.save();

    res.status(200).json({ msg: "teacher account created!" })

  } catch (err) {
    res.status(400).json({
      msg: "error creating user",
      err: err
    })
  }
})

router.post('/signup/student', adminMiddleware, async (req, res) => {
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

router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (!teachers) {
      return res.status(400).json({ msg: "cannot find teachers / doesn't exists" })
    }

    res.status(200).json({
      teachers
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching teachers " })
  }
})

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();

    if (!students) {
      return res.status(400).json({ msg: "cannot find teachers / doesn't exists" })
    }

    res.status(200).json({
      students
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching teachers " })
  }
})

router.delete('/teachers/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(400).json({ msg: "invalid id" })
    }

    res.status(200).json({ msg: "teacher deleted!" })

  } catch {
    res.status(500).json({ msg: "error deleting teacher" })
  }
})

router.delete('/students/:id', adminMiddleware, async (req, res) => {
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

router.get('/timetable', async (req, res) => {
  try {
    const timetable = await Timetable.find();

    if (!timetable) {
      return res.status(400).json({ msg: "timetable doesn't exists" })
    }

    res.status(200).json({
      timetable
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching timetable" })
  }
})

module.exports = router
