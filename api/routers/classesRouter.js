const express = require('express');
const classesRouter = express.Router();
const { ObjectId } = require('mongodb');
const dbConnect = require('./dbConnect/dbConnect');

classesRouter
    // READ ALL
    .get('/classes', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const classes = await db
                .collection('classes')
                .find()
                .toArray();
            res.json(classes);
            client.close();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // READ ONE
    .get('/classes/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const singleClass = await db
                .collection('classes')
                .findOne({ _id: new ObjectId(req.params.id) });

            if (!singleClass) {
                throw new Error('Classe inconnue');
            }

            res.send(singleClass);
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // INSERT ONE
    .post('/classes', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let classToAdd = {
                name: req.body.name,
                nbOfStudents: req.body.nbOfStudents,
            };

            const allClasses = await db
                .collection('classes')
                .find()
                .toArray();

            // Contrôle si la matière est déjà présent
            for (let i = 0; i < allClasses.length; i++) {
                if (allClasses[i].name == classToAdd.name) {
                    throw new Error('Classe déjà existante');
                }
            }

            const insertedCourse = await db
                .collection('classes')
                .insertOne(classToAdd);

            // Ajout de l'id généré par la DB à mon objet pour le visionner lors de la réponse
            classToAdd._id = insertedCourse.insertedId;
            res.json(classToAdd);
            client.close();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // UPDATE ONE
    .put('/classes/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let classToUpdate = {
                name: req.body.name,
                nbOfStudents: req.body.nbOfStudents,
            };

            const allClasses = await db
                .collection('classes')
                .find()
                .toArray();

            // Contrôle si la classe est déjà présente
            for (let i = 0; i < allClasses.length; i++) {
                if (allClasses[i].name == classToUpdate.name) {
                    throw new Error('Classe déjà existante');
                }
            }

            const updatedClass = await db
                .collection('classes')
                .findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    {
                        $set: {
                            name: req.body.name,
                            nbOfStudents: req.body.nbOfStudents,
                        },
                    },
                    { returnOriginal: false }
                );
            if (!updatedClass.value) {
                throw new Error(
                    "La classe avec l'id : " +
                        req.params.id +
                        ' est inexistant.'
                );
            }

            res.status(200).json('Classe mofidiée avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // DELETE ONE
    .delete('/classes/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const { deletedCount } = await db
                .collection('classes')
                .deleteOne({ _id: new ObjectId(req.params.id) });

            if (deletedCount === 0) {
                throw new Error('Classe introuvable');
            }

            res.status(200).json('Classe supprimée avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = classesRouter;
