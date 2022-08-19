const { Schema, model } = require('mongoose');

const studentAttendance = new Schema({
  createdAt: Date,
  attendanceStatus: String,
  timeLimit: Number,
});

const AdminAttendance = model('AdminAttendance', studentAttendance);

module.exports = AdminAttendance;
