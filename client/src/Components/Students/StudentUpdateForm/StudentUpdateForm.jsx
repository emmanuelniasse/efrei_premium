import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentUpdateForm(props) {
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [students, setStudents] = useState([]);
    const [isStudentsFetched, setIsStudentsFetched] = useState(false);
    const [name, setName] = useState(props.studentName);
    const [age, setAge] = useState(props.studentAge);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let items = props.items;

        // Traitez les données du formulaire ici
        let studentUpdated = {
            name: event.target[0].value,
            age: event.target[1].value,
            classId: selectedClassroom,
        };
        console.log(studentUpdated);

        try {
            await axios.put(
                `http://localhost:3000/students/${items}`,
                studentUpdated
            );
            props.setIsStudentsFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        // Ici je veux supprimer mon étudiant de la classe ou il était si celle ci a changée
        props.setIsUpdateFormVisible(false);
        props.setItems([]);
    };

    const handleChange = (event) => {
        const selectedClassroom = event.target.value;
        setSelectedClassroom(selectedClassroom);
    };

    useEffect(() => {
        const getStudents = async () => {
            try {
                const students = await axios.get(
                    'http://localhost:3000/students/'
                );
                setStudents(students.data.result);

                students.data.result.map((std) => {
                    console.log(std.name);
                    // setStudentClassroom(std.class)
                });
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (students) : ' + err
                );
            }
        };
        if (!isStudentsFetched) {
            getStudents();
        }

        setIsStudentsFetched(true);
    }, [isStudentsFetched]);

    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='text'
                    name='age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
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
                    <button className='btn-update btn' type='submit'>
                        Mettre à jour
                    </button>
                </div>
            </form>
        </>
    );
}
