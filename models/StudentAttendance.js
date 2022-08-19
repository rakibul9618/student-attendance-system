const { Schema, model } = require('mongoose');

const studentAttendance = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'AdminAttendance',
  },
});



const StudentAttendance = model('StudentAttendance', studentAttendance);

module.exports = StudentAttendance;
