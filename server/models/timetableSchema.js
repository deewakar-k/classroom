const mongoose = require('mongoose')

const timetableSchema = new mongoose.Schema({
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  periods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Period'
  }]
})

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable


