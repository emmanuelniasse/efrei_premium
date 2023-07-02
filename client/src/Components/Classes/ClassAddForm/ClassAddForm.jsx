import React from 'react';
import axios from 'axios';

export default function ClassAddForm(props) {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        // Traitez les données du formulaire ici
        let classroom = {
            name: event.target[0].value,
        };

        try {
            await axios.post(
                `http://localhost:3000/classes/`,
                classroom
            );
            props.setIsClassesFetched(false);
            // console.log('Classe ajoutée en DB');
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
                    placeholder='Nom de la classe'
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
