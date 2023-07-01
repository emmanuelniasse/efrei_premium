const express = require('express');
const studentsRouter = express.Router();
const { ObjectId } = require('mongodb');
const Classes = require('../schemas/classesSchema');
const Students = require('../schemas/studentsSchema');
const { success, error } = require('../functions/functions');

studentsRouter
    // READ ALL
    .get('/students', async (req, res) => {
        try {
            const students = await Students.find()
                .populate({
                    path: 'class',
                })
                .populate({ path: 'scores', select: 'test score' });
            res.status(200).json(success(students));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/students/:id', async (req, res) => {
        try {
            const singleStudent = await Students.findById(
                req.params.id
            ).populate('class');

            if (!singleStudent) {
                throw new Error('Etudiant introuvable');
            }

            res.status(200).json(success(singleStudent));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/students', async (req, res) => {
        try {
            const { name, age, classId } = req.body;

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
                class: classId,
            });

            const savedStudent = await studentToAdd.save();

            // Mettre à jour la classe avec l'ajout du nouvel étudiant
            await Classes.findByIdAndUpdate(classId, {
                $push: { students: savedStudent },
            });

            res.status(200).json(success(savedStudent));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/students/:id', async (req, res) => {
        try {
            const { name, age, classId } = req.body;
            let studentToUpdate = {
                name,
                age,
                class: classId,
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

            const savedStudent = await studentToUpdate.save();

            // Mettre à jour la classe avec l'ajout du nouvel étudiant
            await Classes.findByIdAndUpdate(classId, {
                $push: { students: savedStudent },
            });

            res.status(200).json(success(studentToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
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

            res.status(200).json(
                success('Etudiant supprimé avec succès')
            );
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = studentsRouter;
