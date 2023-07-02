import React from 'react';
import axios from 'axios';

export default function TeacherAddForm(props) {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Traitez les données du formulaire ici
        let teacher = {
            name: event.target[0].value,
            fname: event.target[1].value,
        };

        try {
            await axios.post(
                `http://localhost:3000/teachers/`,
                teacher
            );
            props.setIsTeachersFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsAddFormVisible(false);
    };
    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {/* Ajoutez vos champs de formulaire ici */}
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
                    <button className='btn-add btn' type='submit'>
                        Ajouter
                    </button>
                </div>
            </form>
        </>
    );
}
