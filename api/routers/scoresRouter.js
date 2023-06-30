const express = require('express');
const scoresRouter = express.Router();
const { ObjectId } = require('mongodb');
const Scores = require('../schemas/scoresSchema');
const Students = require('../schemas/studentsSchema');
const { success, error } = require('../functions/functions');

scoresRouter
    // READ ALL
    .get('/scores', async (req, res) => {
        try {
            const scores = await Scores.find()
                .populate({ path: 'student', select: 'name' })
                .populate('score');
            res.status(200).json(success(scores));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // READ ONE
    .get('/scores/:id', async (req, res) => {
        try {
            const singleScore = await Scores.findById(
                req.params.id
            ).populate('student');

            if (!singleScore) {
                throw new Error('Note introuvable');
            }

            res.status(200).json(success(singleScore));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // INSERT ONE
    .post('/scores', async (req, res) => {
        try {
            const { test, score, studentId } = req.body;

            // Créer une nouvelle note
            const scoreToAdd = new Scores({
                test,
                score,
                student: studentId,
            });

            const savedScore = await scoreToAdd.save();
            const scoreId = savedScore._id;

            // Mettre à jour l'étudiant avec l'ajout d'une nouvelle note
            await Students.findByIdAndUpdate(studentId, {
                $push: { scores: scoreId },
            });

            res.status(200).json(success(savedScore));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // UPDATE ONE
    .put('/scores/:id', async (req, res) => {
        try {
            const { test, score, studentId } = req.body;
            let scoreToUpdate = {
                test,
                score,
                student: studentId,
            };
            // const studentNameExist = await scores.findOne({ name });
            // if (
            //     studentNameExist &&
            //     studentNameExist._id != req.params.id
            // ) {
            //     throw new Error('Prenom déjà utilisé');
            // }

            const updatedScore = await Scores.findOneAndUpdate(
                { _id: new ObjectId(req.params.id) },
                {
                    $set: scoreToUpdate,
                }
            );

            if (!updatedScore) {
                throw new Error(
                    "La note avec l'id : '" +
                        req.params.id +
                        "' est introuvable."
                );
            }

            res.status(200).json(success(scoreToUpdate));
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    })

    // DELETE ONE
    .delete('/scores/:id', async (req, res) => {
        try {
            const deletedCount = await Scores.deleteOne({
                _id: new ObjectId(req.params.id),
            });

            if (deletedCount === 0) {
                throw new Error('Note introuvable');
            }

            res.status(200).json(
                success('Note supprimée avec succès')
            );
        } catch (err) {
            res.status(500).json(error(err.message));
        }
    });

module.exports = scoresRouter;
