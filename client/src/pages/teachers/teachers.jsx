import React from 'react';
import { useEffect, useState } from 'react';
import Teacher from '../../Components/Teachers/Teacher/Teacher';
import axios from 'axios';

import TeacherUpdateForm from '../../Components/Teachers/TeacherUpdateForm/TeacherUpdateForm';
import TeacherAddForm from '../../Components/Teachers/TeacherAddForm/TeacherAddForm';

import TeacherDeleteConfirm from '../../Components/Teachers/TeacherDeleteConfirm/TeacherDeleteConfirm';

export default function Teachers() {
    // States
    const [teachers, setTeachers] = useState([]);
    const [isTeachersFetched, setIsTeachersFetched] = useState(false);

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [teacherDeleteConfirm, setTeacherDeleteConfirm] =
        useState(false);

    // Récupère les teachers de la DB
    useEffect(() => {
        const getTeachers = async () => {
            try {
                const teachers = await axios.get(
                    'http://localhost:3000/teachers/'
                );
                setTeachers(teachers.data.result);
                setIsTeachersFetched(true);
                console.log('Boucle infinie ?');
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (teachers) : ' + err
                );
            }
        };
        if (!isTeachersFetched) {
            getTeachers();
        }
    }, [isTeachersFetched]);

    // Affiche le formulaire au clic sur le bouton "Ajouter"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setTeacherDeleteConfirm(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    // Annule la selection d'item
    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
    };

    // Supprime les teachers
    const handleDelete = async () => {
        setTeacherDeleteConfirm(true);
    };

    // Modifie le professeur
    const handleUpdate = async () => {
        setIsUpdateFormVisible(true);
    };

    // Cache les boutons CRUD dans le cas où aucun items n'est sélectionné
    useEffect(() => {
        items.length < 1 && setIsItemSelected(false);

        console.log(items);
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
            <div className='teachers'>
                <h1 className='teachers__title title-page'>
                    Professeurs
                </h1>

                <div className='teachers__buttons'>
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
                    <div className='teachers__form-container'>
                        <TeacherAddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setIsTeachersFetched={
                                setIsTeachersFetched
                            }
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='teachers__form-container'>
                        <TeacherUpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setIsTeachersFetched={
                                setIsTeachersFetched
                            }
                        />
                    </div>
                )}

                {teacherDeleteConfirm && (
                    <div className='teachers__modal'>
                        <TeacherDeleteConfirm
                            setTeacherDeleteConfirm={
                                setTeacherDeleteConfirm
                            }
                            handleCancel={handleCancel}
                            setIsTeachersFetched={
                                setIsTeachersFetched
                            }
                            setItems={setItems}
                            items={items}
                        />
                    </div>
                )}

                <ul className='teachers__list'>
                    {teachers.map((teacher, index) => {
                        let itemSelectedTeacher = items.includes(
                            teacher._id
                        )
                            ? 'item-selected'
                            : 'item-not-selected';
                        return (
                            <li
                                key={teacher._id}
                                className={`teachers__list__item ${itemSelectedTeacher}`}
                                onClick={() => {
                                    setIsItemSelected(true);
                                    handleListItems(teacher._id);
                                }}
                            >
                                <Teacher
                                    name={teacher.name}
                                    fname={teacher.fname}
                                    setTeachers={setTeachers}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
