const express = require('express');
const classesRouter = express.Router();
const { ObjectId } = require('mongodb');
const Classes = require('../schemas/classesSchema');
const Students = require('../schemas/studentsSchema');
const { success, error } = require('../functions/functions');

classesRouter
    // READ ALL
    .get('/classes', async (req, res) => {
        try {
            const classes = await Classes.find().populate({
                path: 'students',
                select: 'name age',
            });
            res.status(200).json(success(classes));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/classes/:id', async (req, res) => {
        try {
            const singleClass = await Classes.findById(
                req.params.id
            ).populate({ path: 'students', select: 'name' });

            if (!singleClass) {
                throw new Error('Classe inconnue');
            }

            res.status(200).json(success(singleClass));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/classes', async (req, res) => {
        try {
            const { name } = req.body;
            let nbOfStudents = 0;
            // Vérifie si la classe est déjà crée
            const thisClass = await Classes.findOne({ name });

            if (thisClass && thisClass._id != req.params.id) {
                throw new Error('Classe déjà crée');
            }

            // Créer un nouvel étudiant
            const classToAdd = new Classes({
                name,
                nbOfStudents,
            });

            const savedClass = await classToAdd.save();
            res.status(200).json(success(savedClass));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/classes/:id', async (req, res) => {
        try {
            const { name, studentId } = req.body;

            // Calcule du nombre d'étudiants en fonction des nouvelles valeurs
            const nbOfStudents = Array.isArray(studentId)
                ? studentId.length
                : 0;

            let classToUpdate = {
                name,
                nbOfStudents,
                students: studentId,
            };

            // Vérifie si la classe est déjà insérée
            const classNameExist = await Classes.findOne({ name });
            if (
                classNameExist &&
                classNameExist._id != req.params.id
            ) {
                throw new Error('Classe déjà insérée');
            }

            // Insère les nouvelles valeurs
            const updatedClass = await Classes.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: classToUpdate,
                }
            );

            if (!updatedClass) {
                throw new Error(
                    "La classe avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            // Modifie la classe de tous les étudiants en ayant une nouvelle
            await Students.updateMany(
                { _id: { $in: studentId } },
                { $set: { class: updatedClass._id } }
            );

            res.status(200).json(success(classToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // DELETE ONE
    .delete('/classes/:id', async (req, res) => {
        try {
            const deletedCount = await Classes.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Classe introuvable');
            }

            res.status(200).json(success('Cours supprimé'));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = classesRouter;
