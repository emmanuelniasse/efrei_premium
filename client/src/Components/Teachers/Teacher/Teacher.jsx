import React from 'react';

export default function Teacher(props) {
    const teacherName = props.name.toLowerCase();
    const teacherPic = require(`../../../img/teachers/${teacherName}.png`);

    return (
        <>
            <div className={'teacher teacher__content' + props.bg}>
                <div className='teacher__infos'>
                    <img
                        src={teacherPic}
                        alt=''
                        className='teacher__infos__img'
                    />
                    <h3>
                        {props.fname} <br />
                        {props.name}
                    </h3>
                </div>
            </div>
        </>
    );
}
