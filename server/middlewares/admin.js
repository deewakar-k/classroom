require('dotenv').config();
const jwt = require('jsonwebtoken')

const Admin = require('../models/adminSchema.js')

const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ msg: "no token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Admin.findById(decoded._id)

    if (user.role !== 'PRINCIPAL') {
      return res.status(401).json({ msg: "access denied" })
    }

    req.user = user
    next()

  } catch (err) {
    res.status(401).json({ msg: "invalid token", err })
  }
}

module.exports = adminMiddleware
