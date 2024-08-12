require('dotenv').config()
const express = require('express')
const Student = require('../models/studentSchema.js')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post("/signin", async (req, res) => {
  const { email } = req.body
  try {
    const student = await Student.findOne({
      email: email
    })

    if (!student) {
      return res.status(400).json({
        msg: "incorrect inputs / account doesn't exists"
      })
    }

    const token = jwt.sign({
      _id: student._id
    }, process.env.JWT_SECRET)

    res.status(200).json({
      msg: "student logged in",
      token: token
    })

  } catch (err) {
    res.status(500).json({
      msg: "error signing in student acc",
      err
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json({
      students
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching student" })
  }
})



module.exports = router
