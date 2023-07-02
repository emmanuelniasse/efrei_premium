import React from 'react';
import { useEffect, useState } from 'react';
import Student from '../../Components/Students/Student/Student';
import axios from 'axios';

import StudentUpdateForm from '../../Components/Students/StudentUpdateForm/StudentUpdateForm';
import StudentAddForm from '../../Components/Students/StudentAddForm/StudentAddForm';
import StudentDeleteConfirm from '../../Components/Students/StudentDeleteConfirm/StudentDeleteConfirm';

export default function Students() {
    // States
    const [students, setStudents] = useState([]);
    const [isStudentsFetched, setIsStudentsFetched] = useState(false);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [studentDeleteConfirm, setStudentDeleteConfirm] =
        useState(false);

    const [classes, setClasses] = useState([]);

    // Récupère les students de la DB
    useEffect(() => {
        const getStudents = async () => {
            try {
                const students = await axios.get(
                    'http://localhost:3000/students/'
                );
                setStudents(students.data.result);
                setIsStudentsFetched(true);
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (students) : ' + err
                );
            }
        };

        const getClasses = async () => {
            try {
                const classes = await axios.get(
                    'http://localhost:3000/classes/'
                );

                setClasses(classes.data.result);
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (students) : ' + err
                );
            }
        };

        if (!isStudentsFetched) {
            getStudents();
            getClasses();
        }
    }, [isStudentsFetched]);

    // Affiche le formulaire au clic sur le bouton "Ajouter une étudiant"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setStudentDeleteConfirm(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    // Annule la selection d'item
    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
    };

    // Supprime les students
    const handleDelete = async () => {
        setStudentDeleteConfirm(true);
    };

    // Modifie la étudiant
    const handleUpdate = async () => {
        setIsUpdateFormVisible(true);
    };

    // Cache les boutons CRUD dans le cas où aucun items n'est sélectionné
    useEffect(() => {
        items.length < 1 && setIsItemSelected(false);

        // console.log(items);
    }, [items]);

    // Stock l'id des items sélectionnés
    // `prevItems` représente la valeur précédente de l'état items
    const handleListItems = (itemId) => {
        setItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                // Si l'élément est déjà présent, on le supprime du tableau
                return prevItems.filter(
                    (prevItem) => prevItem !== itemId
                );
            } else {
                // Si l'élément n'est pas présent, on l'ajoute au tableau
                return [...prevItems, itemId];
            }
        });
    };

    return (
        <>
            <div className='students'>
                <h1 className='students__title title-page'>
                    Etudiants
                </h1>

                <div className='students__buttons'>
                    {/* CRUD  */}
                    {isItemSelected && (
                        <>
                            <div
                                className='btn-delete btn'
                                onClick={handleDelete}
                            >
                                Supprimer
                            </div>
                            {items.length == 1 && (
                                <div
                                    className='btn-update btn'
                                    onClick={handleUpdate}
                                >
                                    Modifier
                                </div>
                            )}
                            {!isUpdateFormVisible && (
                                <div
                                    className='btn-cancel btn'
                                    onClick={handleCancelSelection}
                                >
                                    Tout désélectionner
                                </div>
                            )}
                        </>
                    )}
                    {!isAddFormVisible && !isItemSelected && (
                        <div
                            className='btn btn-add--plus'
                            onClick={handleAdd}
                        >
                            +
                        </div>
                    )}
                </div>

                {isAddFormVisible && (
                    <div className='students__form-container'>
                        <StudentAddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setIsStudentsFetched={
                                setIsStudentsFetched
                            }
                            classes={classes}
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='students__form-container'>
                        <StudentUpdateForm
                            items={items}
                            setItems={setItems}
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            setIsStudentsFetched={
                                setIsStudentsFetched
                            }
                            classes={classes}
                        />
                    </div>
                )}

                {studentDeleteConfirm && (
                    <div className='students__modal'>
                        <StudentDeleteConfirm
                            setStudentDeleteConfirm={
                                setStudentDeleteConfirm
                            }
                            handleCancel={handleCancel}
                            setIsStudentsFetched={
                                setIsStudentsFetched
                            }
                            setItems={setItems}
                            items={items}
                        />
                    </div>
                )}

                <ul className='students__list'>
                    {students.map((student) => {
                        let itemSelectedStudent = items.includes(
                            student._id
                        )
                            ? 'item-selected'
                            : '';
                        const classroomName = student.class
                            ? student.class.name
                            : '';

                        return (
                            <li
                                key={student._id}
                                className={`students__list__item ${itemSelectedStudent}`}
                                onClick={() => {
                                    setIsItemSelected(true);
                                    handleListItems(student._id);
                                }}
                            >
                                <Student
                                    name={student.name}
                                    age={student.age}
                                    classroom={classroomName}
                                    setStudents={setStudents}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
