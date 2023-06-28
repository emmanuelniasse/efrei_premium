const express = require('express');
const graduatesRouter = express.Router();
const { ObjectId } = require('mongodb');
const dbConnect = require('./dbConnect/dbConnect');

graduatesRouter
    // READ ALL
    .get('/graduates', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const graduates = await db
                .collection('graduates')
                .find()
                .toArray();
            res.json(graduates);
            client.close();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // READ ONE
    .get('/graduates/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const singleGraduate = await db
                .collection('graduates')
                .findOne({ _id: new ObjectId(req.params.id) });

            if (!singleGraduate) {
                throw new Error('Note non attribuée');
            }

            res.send(singleGraduate);
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // INSERT ONE
    .post('/graduates', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            let graduateToAdd = {
                graduate: req.body.graduate,
            };
            // const allGraduates = await db
            //     .collection('graduates')
            //     .find()
            //     .toArray();

            // // Contrôle si la note est déjà présente
            // for (let i = 0; i < allGraduates.length; i++) {
            //     if (
            //         allGraduates[i].graduate == graduateToAdd.graduate
            //     ) {
            //         throw new Error('Note déjà existante');
            //     }
            // }

            const insertedGraduate = await db
                .collection('graduates')
                .insertOne(graduateToAdd);

            // Ajout de l'id généré par la DB à mon objet pour le visionner lors de la réponse
            graduateToAdd._id = insertedGraduate.insertedId;
            res.json(graduateToAdd);
            client.close();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // UPDATE ONE
    .put('/graduates/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();

            // Le contrôle permettra de vérifier si la note pour un contrôle en particulier est présente avant de la modifier
            let graduateToUpdate = {
                graduate: req.body.graduate,
            };

            const allGraduates = await db
                .collection('graduates')
                .find()
                .toArray();

            // Contrôle si la note est déjà présente
            for (let i = 0; i < allGraduates.length; i++) {
                if (
                    allGraduates[i].graduate ==
                    graduateToUpdate.graduate
                ) {
                    throw new Error('Note déjà existante');
                }
            }

            const updatedGraduate = await db
                .collection('graduates')
                .findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    {
                        $set: {
                            graduate: req.body.graduate,
                        },
                    },
                    { returnOriginal: false }
                );
            if (!updatedGraduate.value) {
                throw new Error(
                    "La note avec l'id : " +
                        req.params.id +
                        ' est inexistant.'
                );
            }

            res.status(200).json('Note mofidiée avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // DELETE ONE
    .delete('/graduates/:id', async (req, res) => {
        try {
            const { client, db } = await dbConnect.connect();
            const { deletedCount } = await db
                .collection('graduates')
                .deleteOne({ _id: new ObjectId(req.params.id) });

            if (deletedCount === 0) {
                throw new Error('Note non attribuée');
            }

            res.status(200).json('Note supprimée avec succès');
            client.close();
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = graduatesRouter;
