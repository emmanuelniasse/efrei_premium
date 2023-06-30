const mongoose = require('mongoose');
const { Schema } = mongoose;

const coursesSchema = new Schema({
    entitled: String,
    teacher: { type: Schema.Types.ObjectId, ref: 'Teachers' },
});

const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
