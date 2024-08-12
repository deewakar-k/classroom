const express = require('express')

const Subject = require('../models/subjectSchema.js')
const Class = require('../models/classSchema.js')

const teacherMiddleware = require('../middlewares/teacher.js')

const router = express.Router()

router.post('/create', teacherMiddleware, async (req, res) => {
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

router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();

    if (!subjects) {
      return res.status(400).json({
        msg: "cannot find subject / not created"
      })
    }

    res.status(200).json({
      subjects
    })

  } catch (err) {
    res.status(500).json({ msg: "error fetching subjects" })
  }
})

module.exports = router;
