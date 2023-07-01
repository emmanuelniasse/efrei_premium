import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Classroom from '../../Components/Classroom/Classroom';
import axios from 'axios';
import Form from '../../Components/Form/Form';

export default function Classes() {
    // Récupération des classes
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        const getClasses = async () => {
            try {
                const classes = await axios.get(
                    'http://localhost:3000/classes/'
                );
                setClasses(classes.data.result);
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (classes) : ' + err
                );
            }
        };

        getClasses();
    }, [classes]);

    // Afficher / cacher le formulaire
    const [isFormVisible, setFormVisible] = useState(false);
    const [isCrudVisible, setCrudVisible] = useState(false);

    const handleAddClassButtonClick = () => {
        setFormVisible(true);
    };

    const handleCancel = () => {
        setFormVisible(false);
    };

    const handleDeleteClass = async () => {
        // console.log(e.target.class);
        // try {
        //     await axios.delete(
        //         `http://localhost:3000/classes/`,
        //         classroom
        //     );
        //     console.log('Classe supprimée avec succès');
        // } catch (error) {
        //     console.log('error:', error);
        // }
    };

    return (
        <>
            <div className='classes'>
                <h1>Classes</h1>
                <span
                    className='classes__btn-add btn'
                    onClick={handleAddClassButtonClick}
                >
                    Ajouter une classe
                </span>

                {isFormVisible && (
                    <>
                        <span
                            className='classes__btn-add btn'
                            onClick={handleCancel}
                        >
                            Annuler
                        </span>
                        <Form setFormVisible={setFormVisible} />
                    </>
                )}

                {/* CRUD  */}
                {isCrudVisible && (
                    <>
                        <span
                            className='classes__btn-delete btn'
                            onClick={handleDeleteClass}
                        >
                            Supprimer la classe
                        </span>
                    </>
                )}

                <ul className='classes__classrooms'>
                    {classes.map((classroom, index) => (
                        <li
                            key={classroom._id}
                            className='classes__classrooms__item'
                            onClick={setCrudVisible}
                        >
                            <Classroom
                                name={classroom.name}
                                nbOfStudents={index}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
