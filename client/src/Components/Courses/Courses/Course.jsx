import React from 'react';

export default function Course(props) {
    return (
        <>
            <div className={'course ' + props.bg}>
                <h3>{props.entitled}</h3>
                <h3>{props.teacher}</h3>
            </div>
        </>
    );
}
