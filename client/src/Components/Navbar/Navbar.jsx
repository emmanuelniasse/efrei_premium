import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo-white.png';

export default function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar__nav container'>
                    <div className='navbar__nav__logo logo'>
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>
                    <div className='navbar__nav__links'>
                        <ul>
                            <li>
                                <Link to='/'>Accueil</Link>
                            </li>
                            <li>
                                <Link to='/classes'>Classes</Link>
                            </li>
                            <li>
                                <Link to='/notes'>Notes</Link>
                            </li>
                            <li>
                                <Link to='/etudiants'>Etudiants</Link>
                            </li>
                            <li>
                                <Link to='/professeurs'>
                                    Professeurs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
