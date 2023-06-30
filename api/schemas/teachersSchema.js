const mongoose = require('mongoose');
const { Schema } = mongoose;

const teachersSchema = new Schema({
    name: String,
    fname: String,
});

const Teachers = mongoose.model('Teachers', teachersSchema);

module.exports = Teachers;
