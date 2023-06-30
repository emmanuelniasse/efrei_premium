const express = require('express');
const coursesRouter = express.Router();
const { ObjectId } = require('mongodb');
const Courses = require('../schemas/coursesSchema');
const { success, error } = require('../functions/functions');

coursesRouter
    // READ ALL
    .get('/courses', async (req, res) => {
        try {
            const courses = await Courses.find().populate({
                path: 'teacher',
                select: 'name fname',
            });
            res.status(200).json(success(courses));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/courses/:id', async (req, res) => {
        try {
            const singleCourse = await Courses.findOne({
                _id: new ObjectId(req.params.id),
            }).populate({
                path: 'teacher',
                select: 'name fname',
            });

            if (!singleCourse) {
                throw new Error('Cours non programmé');
            }
            res.status(200).json(success(singleCourse));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/courses', async (req, res) => {
        try {
            const { entitled, teacherId } = req.body;
            const course = await Courses.findOne({ entitled });

            if (course && course._id != req.params.id) {
                throw new Error('Cours déjà programmé');
            }

            // Créer un nouveu cours
            const courseToAdd = new Courses({
                entitled,
                teacher: teacherId,
            });

            const savedCourse = await courseToAdd.save();
            res.status(200).json(success(savedCourse));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/courses/:id', async (req, res) => {
        try {
            const { entitled, teacherId } = req.body;

            const courseNameExist = await Courses.findOne({
                entitled,
            });

            if (
                courseNameExist &&
                courseNameExist._id != req.params.id
            ) {
                throw new Error('Cours déjà programmé');
            }

            const courseToUpdate = {
                entitled,
                teacherId,
            };

            // Insère les nouvelles valeurs
            const updatedCourse = await Courses.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: courseToUpdate,
                }
            );

            if (!updatedCourse) {
                throw new Error(
                    "Le cours avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            res.status(200).json(success(courseToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // DELETE ONE
    .delete('/courses/:id', async (req, res) => {
        try {
            const deletedCount = await Courses.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Cours introuvable');
            }

            res.status(200).json(
                success('Cours supprimé avec succès')
            );
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = coursesRouter;
