import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Lecture = mongoose.model('Lecture', LectureSchema);