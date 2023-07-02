import React from 'react';
import axios from 'axios';

export default function TeacherUpdateForm(props) {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let items = props.items;

        // Traitez les données du formulaire ici
        let teacherUpdated = {
            name: event.target[0].value,
            fname: event.target[1].value,
        };
        console.log(teacherUpdated);
        try {
            await axios.put(
                `http://localhost:3000/teachers/${items}`,
                teacherUpdated
            );
            props.setIsTeachersFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsUpdateFormVisible(false);
        props.setItems([]);
    };
    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                <input
                    type='text'
                    name='name'
                    placeholder='Nom du professeur'
                    required
                />
                <input
                    type='text'
                    name='fname'
                    placeholder='Prénom du professeur'
                    required
                />
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
