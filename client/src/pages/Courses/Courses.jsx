import React from 'react';
import { useEffect, useState } from 'react';
import Course from '../../Components/Courses/Courses/Course';
import axios from 'axios';

import CourseUpdateForm from '../../Components/Courses/CourseUpdateForm/CourseUpdateForm';
import CourseAddForm from '../../Components/Courses/CourseAddForm/CourseAddForm';

import CourseDeleteConfirm from '../../Components/Courses/CourseDeleteConfirm/CourseDeleteConfirm';

export default function Courses() {
    // States
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isCoursesFetched, setIsCoursesFetched] = useState(false);

    const [isItemSelected, setIsItemSelected] = useState(false);
    const [items, setItems] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isUpdateFormVisible, setIsUpdateFormVisible] =
        useState(false);
    const [courseDeleteConfirm, setCourseDeleteConfirm] =
        useState(false);

    // Récupère les courses de la DB
    useEffect(() => {
        const getCourses = async () => {
            try {
                const courses = await axios.get(
                    'http://localhost:3000/courses/'
                );
                setCourses(courses.data.result);
                setIsCoursesFetched(true);
                console.log('Boucle infinie ?');
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (courses) : ' + err
                );
            }
        };
        const getTeachers = async () => {
            try {
                const teachers1 = await axios.get(
                    `http://localhost:3000/teachers/`
                );
                setTeachers(teachers1.data.result);
                setIsCoursesFetched(true);
            } catch (error) {
                console.log('error:', error);
            }
        };
        console.log('Boucle infinie ?');
        // teachers.map((t) => {
        //     console.log(t.name);
        // });

        if (!isCoursesFetched) {
            getCourses();
            getTeachers();
        }
    }, [isCoursesFetched]);

    // Affiche le formulaire au clic sur le bouton "Ajouter"
    const handleAdd = () => {
        setIsAddFormVisible(true);
    };

    // Cache le formulaire au clic sur le bouton "Annuler"
    const handleCancel = () => {
        setCourseDeleteConfirm(false);
        setIsAddFormVisible(false);
        setIsUpdateFormVisible(false);
    };

    // Annule la selection d'item
    const handleCancelSelection = () => {
        setIsItemSelected(false);
        setItems([]);
    };

    // Supprime les courses
    const handleDelete = async () => {
        setCourseDeleteConfirm(true);
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
            <div className='courses'>
                <h1 className='courses__title title-page'>Cours</h1>

                <div className='courses__buttons'>
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
                    <div className='courses__form-container'>
                        <CourseAddForm
                            setIsAddFormVisible={setIsAddFormVisible}
                            handleCancel={handleCancel}
                            setIsCoursesFetched={setIsCoursesFetched}
                            teachers={teachers}
                        />
                    </div>
                )}

                {isUpdateFormVisible && (
                    <div className='courses__form-container'>
                        <CourseUpdateForm
                            setIsUpdateFormVisible={
                                setIsUpdateFormVisible
                            }
                            handleCancel={handleCancel}
                            items={items}
                            setItems={setItems}
                            setIsCoursesFetched={setIsCoursesFetched}
                        />
                    </div>
                )}

                {courseDeleteConfirm && (
                    <div className='courses__modal'>
                        <CourseDeleteConfirm
                            setCourseDeleteConfirm={
                                setCourseDeleteConfirm
                            }
                            handleCancel={handleCancel}
                            setIsCoursesFetched={setIsCoursesFetched}
                            setItems={setItems}
                            items={items}
                        />
                    </div>
                )}

                <ul className='courses__list'>
                    {courses.map((course, index) => {
                        let itemSelectedCourse = items.includes(
                            course._id
                        )
                            ? 'item-selected'
                            : 'item-not-selected';

                        const teacherName = course.teacher
                            ? course.teacher.name
                            : 'Pas de professeur';
                        return (
                            <li
                                key={course._id}
                                className={`courses__list__item ${itemSelectedCourse}`}
                                onClick={() => {
                                    setIsItemSelected(true);
                                    handleListItems(course._id);
                                }}
                            >
                                <Course
                                    entitled={course.entitled}
                                    teacher={teacherName}
                                    setCourses={setCourses}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
