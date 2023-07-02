import React from 'react';
import axios from 'axios';

export default function ClassUpdateForm(props) {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let items = props.items;

        // Traitez les données du formulaire ici
        let classroomUpdated = {
            name: event.target[0].value,
        };

        try {
            await axios.put(
                `http://localhost:3000/classes/${items}`,
                classroomUpdated
            );
            props.setIsClassesFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsUpdateFormVisible(false);
        props.setItems([]);
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
                    <button className='btn-update btn' type='submit'>
                        Mettre à jour
                    </button>
                </div>
            </form>
        </>
    );
}
