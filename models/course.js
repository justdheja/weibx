const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  googleId: String,
  picture: String
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course