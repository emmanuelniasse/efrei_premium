import React from 'react';

export default function Article(props) {
    return (
        <>
            <div className='article'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </>
    );
}
