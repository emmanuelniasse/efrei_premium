const express = require('express');
const coursesRouter = express.Router();
const { ObjectId } = require('mongodb');
const dbConnect = require('./dbConnect/dbConnect');

coursesRouter
    // READ ALL
    .get('/courses', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const courses = await db
                .collection('courses')
                .find()
                .toArray();
            res.json(courses);
            client.close();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // READ ONE
    .get('/courses/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();

            const singleCourse = await db
                .collection('courses')
                .findOne({ _id: new ObjectId(req.params.id) });

            if (!singleCourse) {
                throw new Error('Cours non programmé');
            }
            res.json(singleCourse);
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // INSERT ONE
    .post('/courses', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let courseToAdd = {
                entitled: req.body.entitled,
                teacher: req.body.teacher,
            };

            const allCourses = await db
                .collection('courses')
                .find()
                .toArray();

            // Contrôle si le cours est déjà programmé
            for (let i = 0; i < allCourses.length; i++) {
                if (allCourses[i].entitled == courseToAdd.entitled) {
                    throw new Error('Cours déjà programmé');
                }
            }

            const courses = await db
                .collection('courses')
                .insertOne(courseToAdd);

            // Ajout de l'id généré par la DB à mon objet pour le visionner lors de la réponse
            courseToAdd._id = courses.insertedId;
            res.json(courseToAdd);
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // UPDATE ONE
    .put('/courses/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let courseToUpdate = {
                entitled: req.body.entitled,
                teacher: req.body.teacher,
            };
            const allStudents = await db
                .collection('courses')
                .find()
                .toArray();

            // Contrôle si le cours est déjà programmé
            for (let i = 0; i < allStudents.length; i++) {
                if (
                    allStudents[i].entitled == courseToUpdate.entitled
                ) {
                    throw new Error('Cours déjà programmé');
                }
            }

            const updatedCourse = await db
                .collection('courses')
                .findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    {
                        $set: {
                            entitled: req.body.entitled,
                            teacher: req.body.teacher,
                        },
                    },
                    { returnOriginal: false }
                );
            if (!updatedCourse.value) {
                throw new Error(
                    "Le cours avec l'id : " +
                        req.params.id +
                        ' est inexistant.'
                );
            }

            res.status(200).json('Cours mofidié avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // DELETE ONE
    .delete('/courses/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const { deletedCount } = await db
                .collection('courses')
                .deleteOne({ _id: new ObjectId(req.params.id) });

            if (deletedCount === 0) {
                throw new Error('Cours non programmé');
            }

            res.status(200).json('Cours supprimé avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = coursesRouter;
