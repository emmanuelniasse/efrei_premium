import React from 'react';

export default function Student(props) {
    return (
        <>
            <div className={'student ' + props.bg}>
                <h3>{props.name}</h3>
                <p>
                    {props.age} ans
                    {props.age < 18 && " - Pas d'alcool (mineur)"}
                </p>
                <p>
                    {props.classroom
                        ? props.classroom
                        : 'Pas de classe'}
                </p>
            </div>
        </>
    );
}
