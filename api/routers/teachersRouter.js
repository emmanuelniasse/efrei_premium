const express = require('express');
const teachersRouter = express.Router();
const { ObjectId } = require('mongodb');
const Teachers = require('../schemas/teachersSchema');
const { success, error } = require('../functions/functions');

teachersRouter
    // READ ALL
    .get('/teachers', async (req, res) => {
        try {
            const teachers = await Teachers.find();
            res.status(200).json(success(teachers));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/teachers/:id', async (req, res) => {
        try {
            const singleTeacher = await Teachers.findOne({
                _id: new ObjectId(req.params.id),
            });

            if (!singleTeacher) {
                throw new Error('Professeur inconnu');
            }
            res.status(200).json(success(singleTeacher));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/teachers', async (req, res) => {
        try {
            const { name, fname } = req.body;
            const teacher = await Teachers.findOne({ name });

            if (teacher && teacher._id != req.params.id) {
                throw new Error('Professeur déjà inscrit');
            }

            // Créer un nouveu cours
            const teacherToAdd = new Teachers({
                name,
                fname,
            });

            const savedTeacher = await teacherToAdd.save();
            res.status(200).json(success(savedTeacher));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/teachers/:id', async (req, res) => {
        try {
            const { name, fname } = req.body;

            const teacherNameExist = await Teachers.findOne({
                name,
            });

            if (
                teacherNameExist &&
                teacherNameExist._id != req.params.id
            ) {
                throw new Error('Professeur déjà inscrit');
            }

            const teacherToUpdate = {
                name,
                fname,
            };

            // Insère les nouvelles valeurs
            const updatedTeacher = await Teachers.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: teacherToUpdate,
                }
            );

            if (!updatedTeacher) {
                throw new Error(
                    "Le professeur avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            res.status(200).json(success(teacherToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // DELETE ONE
    .delete('/teachers/:id', async (req, res) => {
        try {
            const deletedCount = await Teachers.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Professeur introuvable');
            }

            res.status(200).json(
                success('Professeur supprimé avec succès')
            );
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = teachersRouter;
