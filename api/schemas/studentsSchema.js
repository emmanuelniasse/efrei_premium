const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentsSchema = new Schema({
    name: String,
    age: Number,
    scores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Scores',
        },
    ],
});

const Students = mongoose.model('Students', studentsSchema);

module.exports = Students;
