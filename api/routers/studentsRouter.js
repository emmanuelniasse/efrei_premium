const express = require('express');
const studentsRouter = express.Router();
const { ObjectId } = require('mongodb');
const dbConnect = require('./dbConnect/dbConnect');

studentsRouter
    // READ ALL
    .get('/students', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const students = await db
                .collection('students')
                .find()
                .toArray();

            res.send(students);
            client.close();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // READ ONE
    .get('/students/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const singleStudent = await db
                .collection('students')
                .findOne({ _id: new ObjectId(req.params.id) });

            if (!singleStudent) {
                throw new Error('Etudiant inconnu');
            }

            res.send(singleStudent);
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // INSERT ONE
    .post('/students', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let studentToAdd = {
                name: req.body.name,
                age: req.body.age,
            };

            const allStudents = await db
                .collection('students')
                .find()
                .toArray();

            // Contrôle si l'étudiant est déjà inscrit
            for (let i = 0; i < allStudents.length; i++) {
                if (allStudents[i].name == studentToAdd.name) {
                    throw new Error('Etudiant déjà inscrit');
                }
            }

            const students = await db
                .collection('students')
                .insertOne(studentToAdd);

            // Ajout de l'id généré par la DB à mon objet pour le visionner lors de la réponse
            studentToAdd._id = students.insertedId;
            res.json(studentToAdd);
            client.close();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // UPDATE ONE
    .put('/students/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let studentToUpdate = {
                name: req.body.name,
                age: req.body.age,
            };
            const allStudents = await db
                .collection('students')
                .find()
                .toArray();

            // Contrôle si l'étudiant est déjà présente
            for (let i = 0; i < allStudents.length; i++) {
                if (allStudents[i].name == studentToUpdate.name) {
                    throw new Error('Etudiant déjà existant');
                }
            }

            const updatedStudent = await db
                .collection('students')
                .findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    {
                        $set: {
                            name: req.body.name,
                            age: req.body.age,
                        },
                    },
                    { returnOriginal: false }
                );
            if (!updatedStudent.value) {
                throw new Error(
                    "L'élève avec l'id : " +
                        req.params.id +
                        ' est inexistant.'
                );
            }

            res.status(200).json('Etudiant mofidié avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // DELETE ONE
    .delete('/students/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const { deletedCount } = await db
                .collection('students')
                .deleteOne({ _id: new ObjectId(req.params.id) });

            if (deletedCount === 0) {
                throw new Error('Etudiant introuvable');
            }

            res.status(200).json('Etudiant supprimé avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = studentsRouter;
