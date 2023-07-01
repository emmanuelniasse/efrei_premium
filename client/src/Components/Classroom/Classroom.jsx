import React from 'react';

export default function Classe(props) {
    return (
        <>
            <div className='classroom'>
                <h3>{props.name}</h3>
                <p>
                    {props.nbOfStudents} étudiant
                    {props.nbOfStudents > 0 && 's'}
                </p>
            </div>
        </>
    );
}
