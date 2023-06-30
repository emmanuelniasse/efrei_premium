const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoresSchema = new Schema({
    test: String,
    score: Number,
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Students',
    },
});

const Scores = mongoose.model('Scores', scoresSchema);

module.exports = Scores;
