require('dotenv').config();
const jwt = require('jsonwebtoken')

const Teacher = require('../models/teacherSchema.js')

const teacherMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ msg: "no token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Teacher.findById(decoded._id)

    if (user.role !== 'TEACHER') {
      return res.status(401).json({ msg: "access denied" })
    }

    req.user = user
    next()

  } catch (err) {
    res.status(401).json({ msg: "invalid token", err })
  }
}

module.exports = teacherMiddleware
