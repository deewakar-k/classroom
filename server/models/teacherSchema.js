const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 6
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  role: {
    type: String,
    default: 'TEACHER'
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
})

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher

