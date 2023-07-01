import React from 'react';
import { Link } from 'react-router-dom';
import Article from '../../Components/Article/Article';

export default function homepage() {
    return (
        <div className='homepage'>
            <h1>L'hebdo des personnels</h1>
            <ul className='homepage__articles'>
                <li>
                    <Link to='/article'>
                        <Article
                            title='Semaine artistique'
                            description='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus saepe'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/article'>
                        <Article
                            title='Conseil pédagogique'
                            description='Polore eligendi cupiditate quam iste? Iusto excepturi illo possimus omnis totam harum'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/article'>
                        <Article
                            title='Conseil école-collège'
                            description='Doloribus amet quaerat fuga distinctio quia neque repellat.'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/article'>
                        <Article
                            title='Modification du réglement intérieur'
                            description='Amet consectetur adipisicing elit. Possimus saepe, dolore eligendi '
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/article'>
                        <Article
                            title='Ambassadeur du lycée'
                            description='Iusto excepturi illo possimus omnis totam harum, doloribus amet '
                        />
                    </Link>
                </li>
            </ul>
        </div>
    );
}
