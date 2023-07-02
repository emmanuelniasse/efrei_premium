import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CourseAddForm(props) {
    const [selectedTeacher, setSelectedTeacher] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let course = {
            entitled: event.target[0].value,
            teacherId: selectedTeacher,
        };

        try {
            await axios.post(
                `http://localhost:3000/courses/`,
                course
            );
            props.setIsCoursesFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsAddFormVisible(false);
    };

    const handleChange = (event) => {
        const selectedTeacherId = event.target.value;
        setSelectedTeacher(selectedTeacherId);
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                <input
                    type='text'
                    name='entitled'
                    placeholder='Intitulé du cours'
                    required
                />
                <select
                    name='teacher'
                    id='teacher'
                    value={selectedTeacher}
                    onChange={handleChange}
                >
                    <option value=''>
                        --Choisissez un professeur--
                    </option>
                    {props.teachers.map((teacher) => (
                        <option name='teacher' value={teacher._id}>
                            {teacher.fname} {teacher.name}
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
