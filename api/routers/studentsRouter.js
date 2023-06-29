const express = require('express');
const studentsRouter = express.Router();
const { ObjectId } = require('mongodb');
const Students = require('../schemas/studentsSchema');

studentsRouter
    // READ ALL
    .get('/students', async (req, res) => {
        try {
            const students = await Students.find();
            res.send(students);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    // READ ONE
    .get('/students/:id', async (req, res) => {
        try {
            const singleStudent = await Students.findById(
                req.params.id
            );

            if (!singleStudent) {
                throw new Error('Etudiant introuvable');
            }

            res.send(singleStudent);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // INSERT ONE
    .post('/students', async (req, res) => {
        try {
            const { name, age, scores } = req.body;

            // Vérifie si l'étudiant est inscrit
            const studentNameExist = await Students.findOne({ name });
            if (
                studentNameExist &&
                studentNameExist._id != req.params.id
            ) {
                throw new Error('Etudiant déjà inscrit');
            }

            // Créer un nouvel étudiant
            const studentToAdd = new Students({
                name,
                age,
                scores,
            });

            const savedStudent = await studentToAdd.save();
            res.json(savedStudent);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    // UPDATE ONE
    .put('/students/:id', async (req, res) => {
        try {
            const { name, age, scores } = req.body;
            let studentToUpdate = {
                name,
                age,
                scores,
            };
            const studentNameExist = await Students.findOne({ name });
            if (
                studentNameExist &&
                studentNameExist._id != req.params.id
            ) {
                throw new Error('Prenom déjà utilisé');
            }

            const updatedStudent = await Students.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: studentToUpdate,
                }
            );

            if (!updatedStudent) {
                throw new Error(
                    "L'étudiant avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            res.status(200).json('Etudiant modifié avec succès');
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    })

    // DELETE ONE
    .delete('/students/:id', async (req, res) => {
        try {
            const deletedCount = await Students.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Etudiant introuvable');
            }

            res.status(200).json('Etudiant supprimé avec succès');
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

module.exports = studentsRouter;
