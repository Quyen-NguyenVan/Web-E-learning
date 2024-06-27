import { Lecture } from "../models/Lecture.js";

const createLecture = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newLecture = new Lecture({
            title,
            content,
            createdBy: req.user.id
        });
        const lecture = await newLecture.save();
        res.json(lecture);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.find();
        res.json(lectures);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export { createLecture, getLectures };
