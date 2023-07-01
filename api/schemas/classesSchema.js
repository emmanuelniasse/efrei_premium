const mongoose = require('mongoose');
const { Schema } = mongoose;

const classesSchema = new Schema({
    name: String,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Students',
        },
    ],
});

const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;
