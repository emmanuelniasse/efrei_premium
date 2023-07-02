import React from 'react';

export default function Classroom(props) {
    return (
        <>
            <div className={'classroom ' + props.bg}>
                <h3>{props.name}</h3>
                <p>
                    {props.nbOfStudents} étudiant
                    {props.nbOfStudents > 1 && 's'}
                </p>
                <p>12/20 de moyenne générale</p>
            </div>
        </>
    );
}
