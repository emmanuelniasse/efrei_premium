import React from 'react';
import { useEffect, useState } from 'react';
import Classroom from '../../Components/Classes/Classroom/Classroom';
import axios from 'axios';

import ClassUpdateForm from '../../Components/Classes/ClassUpdateForm/ClassUpdateForm';
import ClassAddForm from '../../Components/Classes/ClassAddForm/ClassAddForm';
import DeleteConfirm from '../../Components/Classes/ClassroomDeleteConfirm/ClassroomDeleteConfirm';

export default function Classes() {
    // States
    const [classes, setClasses] = useState([]);
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isClassesFetched, setIsClassesFetched] = useState(false);

    // Récupère les classes de la DB
    useEffect(() => {
        const getClasses = async () => {
            try {
                const classes = await axios.get(
                    'http://localhost:3000/classes/'
                );
                setClasses(classes.data.result);
                console.log(classes.data.result);
                setIsClassesFetched(true);
                console.log('Boucle infinie ?');
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (classes) : ' + err
                );
            }
        };
        if (!isClassesFetched) {
            getClasses();
        }
    }, [isClassesFetched]);

    // Affiche le formulaire au clic sur le bouton "Ajouter une classe"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setDeleteConfirm(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    // Annule la selection d'item
    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
    };

    // Supprime les classes
    const handleDelete = async () => {
        setDeleteConfirm(true);
    };

    // Modifie la classe
    const handleUpdate = async () => {
        setIsUpdateFormVisible(true);
    };

    // Cache les boutons CRUD dans le cas où aucun items n'est sélectionné
    useEffect(() => {
        items.length < 1 && setIsItemSelected(false);

        console.log(items);
        console.log('ok');
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
            <div className='classes'>
                <h1 className='classes__title title-page'>Classes</h1>

                <div className='classes__buttons'>
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
                    <div className='classes__form-container'>
                        <ClassAddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setIsClassesFetched={setIsClassesFetched}
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='classes__form-container'>
                        <ClassUpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setIsClassesFetched={setIsClassesFetched}
                        />
                    </div>
                )}

                {deleteConfirm && (
                    <div className='classes__modal'>
                        <DeleteConfirm
                            setDeleteConfirm={setDeleteConfirm}
                            handleCancel={handleCancel}
                            setIsClassesFetched={setIsClassesFetched}
                            setItems={setItems}
                            items={items}
                        />
                    </div>
                )}

                <ul className='classes__list'>
                    {classes.map((classroom) => {
                        let itemSelectedClass = items.includes(
                            classroom._id
                        )
                            ? 'item-selected'
                            : '';
                        return (
                            <li
                                key={classroom._id}
                                className={`classes__list__item ${itemSelectedClass}`}
                                onClick={() => {
                                    setIsItemSelected(true);
                                    handleListItems(classroom._id);
                                }}
                            >
                                <Classroom
                                    name={classroom.name}
                                    nbOfStudents={
                                        classroom.students.length
                                    }
                                    setClasses={setClasses}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
