import React from 'react';
import axios from 'axios';

export default function CourseDeleteConfirm(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        let items = props.items;

        try {
            await Promise.all(
                items.map(async (itemId) => {
                    await axios.delete(
                        `http://localhost:3000/courses/${itemId}`
                    );
                    props.setIsCoursesFetched(false);
                })
            );
        } catch (error) {
            console.log('error:', error);
        }
        props.setCourseDeleteConfirm(false);
        props.setItems([]);
    };
    return (
        <>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={props.handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-delete btn' type='submit'>
                        Confirmer la suppression
                    </button>
                </div>
            </form>
        </>
    );
}
