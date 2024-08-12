const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subjectId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  role: {
    type: String,
    default: "STUDENT"
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student
