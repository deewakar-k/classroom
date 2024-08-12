const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
  }],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  }
})

const Class = mongoose.model('Class', classSchema);

module.exports = Class
