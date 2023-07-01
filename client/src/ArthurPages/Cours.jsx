import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cours = () => {
    const [cours, setCours] = useState([]);
    const [newCours, setNewCours] = useState({
        idMatiere: '',
        idClasse: '',
        professeur: '',
        horaire: '',
    });
    const [updatingCours, setUpdatingCours] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3000/cours`
                );
                setCours(result.data);
                console.log(result.data);
            } catch (error) {
                console.log('error:', error);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCours({ ...newCours, [name]: value });
    };

    const handleUpdateInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatingCours({ ...updatingCours, [name]: value });
    };

    const handleCreateCours = async () => {
        try {
            const result = await axios.get(
                `http://localhost:3000/cours/create/${newCours.idMatiere}/${newCours.idClasse}/${newCours.professeur}/${newCours.horaire}`
            );
            setCours([...cours, result.data.ops[0]]);
            setNewCours({
                idMatiere: '',
                idClasse: '',
                professeur: '',
                horaire: '',
            });
        } catch (error) {
            console.log('error:', error);
        }
    };

    const handleDeleteCours = async (coursId) => {
        try {
            await axios.delete(
                `http://localhost:3000/cours/delete/${coursId}`
            );
            setCours(cours.filter((cours) => cours._id !== coursId));
        } catch (error) {
            console.log('error:', error);
        }
    };

    const handleUpdateCours = async (coursId) => {
        try {
            const result = await axios.put(
                `http://localhost:3000/cours/update/${coursId}`,
                updatingCours
            );
            const updatedCours = cours.map((cours) => {
                if (cours._id === result.data._id) {
                    return result.data;
                }
                return cours;
            });
            setCours(updatedCours);
            setUpdatingCours(null);
        } catch (error) {
            console.log('error:', error);
        }
    };

    return (
        <>
            <h1>Liste des cours</h1>
            <ul>
                {cours.map((cours) => (
                    <li key={cours._id}>{cours.professeur}</li>
                ))}
            </ul>
            <h2>Ajouter un cours</h2>
            <form>
                <label>
                    Matière:
                    <input
                        type='text'
                        name='idMatiere'
                        value={newCours.idMatiere}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Classe:
                    <input
                        type='text'
                        name='idClasse'
                        value={newCours.idClasse}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Professeur:
                    <input
                        type='text'
                        name='professeur'
                        value={newCours.professeur}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Horaire:
                    <input
                        type='text'
                        name='horaire'
                        value={newCours.horaire}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type='button' onClick={handleCreateCours}>
                    Ajouter
                </button>
            </form>
            {updatingCours && (
                <div>
                    <h2>Modifier le cours</h2>
                    <form>
                        <label>
                            Matière:
                            <input
                                type='text'
                                name='idMatiere'
                                value={updatingCours.idMatiere}
                                onChange={handleUpdateInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Classe:
                            <input
                                type='text'
                                name='idClasse'
                                value={updatingCours.idClasse}
                                onChange={handleUpdateInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Professeur:
                            <input
                                type='text'
                                name='professeur'
                                value={updatingCours.professeur}
                                onChange={handleUpdateInputChange}
                            />
                        </label>
                        <br />
                        <label>
                            Horaire:
                            <input
                                type='text'
                                name='horaire'
                                value={updatingCours.horaire}
                                onChange={handleUpdateInputChange}
                            />
                        </label>
                        <br />
                        <button
                            type='button'
                            onClick={handleUpdateCours}
                        >
                            Modifier
                        </button>
                        <button
                            type='button'
                            onClick={() => setUpdatingCours(null)}
                        >
                            Annuler
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Cours;
