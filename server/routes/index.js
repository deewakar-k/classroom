const express = require('express')

const adminRouter = require('./admin.js')
const classRouter = require('./class.js')
const teacherRouter = require('./teacher.js')
const studentRouter = require('./student.js')
const subjectsRouter = require('./subject.js')

const router = express.Router()


router.use("/admin", adminRouter)
router.use("/class", classRouter)
router.use("/teacher", teacherRouter)
router.use("/student", studentRouter)
router.use("/subject", subjectsRouter)

module.exports = router
