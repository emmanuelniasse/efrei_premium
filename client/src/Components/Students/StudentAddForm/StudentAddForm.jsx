import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentAddForm(props) {
    const [selectedClassroom, setSelectedClassroom] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Traitez les données du formulaire ici
        let student = {
            name: event.target[0].value,
            age: event.target[1].value,
            classId: selectedClassroom,
        };

        try {
            await axios.post(
                `http://localhost:3000/students/`,
                student
            );
            props.setIsStudentsFetched(false);
            console.log(student);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsAddFormVisible(false);
    };

    useEffect(() => {
        console.log(props.classes);
    }, []);

    const handleChange = (event) => {
        const selectedClassroom = event.target.value;
        setSelectedClassroom(selectedClassroom);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {/* Ajoutez vos champs de formulaire ici */}
                <input
                    type='text'
                    name='name'
                    placeholder="Prénom de l'eleve"
                    required
                />
                <input
                    type='text'
                    name='age'
                    placeholder="Age de l'élève"
                    required
                />
                <select
                    name='classId'
                    id='classId'
                    value={selectedClassroom}
                    onChange={handleChange}
                >
                    <option value=''>
                        --Choisissez une classe--
                    </option>
                    {props.classes.map((classroom) => (
                        <option
                            name='classroom'
                            value={classroom._id}
                            key={classroom._id}
                        >
                            {classroom.name}
                        </option>
                    ))}
                </select>
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={props.handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-add btn' type='submit'>
                        Ajouter
                    </button>
                </div>
            </form>
        </>
    );
}
