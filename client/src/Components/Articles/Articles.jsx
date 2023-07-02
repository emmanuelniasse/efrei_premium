import React from 'react';

export default function Articles(props) {
    return (
        <>
            <div className='homepage__articles__article'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </>
    );
}
