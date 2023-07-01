import React from 'react';
// , { useState, useEffect }
// import axios from 'axios';

const students = () => {
    // const [eleves, setEleves] = useState([]);
    // const [newEleve, setNewEleve] = useState({
    //     surname: '',
    //     name: '',
    // });
    // const [updatingEleve, setUpdatingEleve] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await axios.get(
    //                 `http://localhost:3000/students`
    //             );
    //             // const parsedData = JSON.parse(result.data);
    //             setEleves(result.data);
    //             // console.log(result.data);
    //             // for (let i = 0; i < result.data.length; i++) {
    //             //     console.log(result.data[i].name);
    //             // }
    //         } catch (error) {
    //             console.log('error:', error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setNewEleve({ ...newEleve, [name]: value });
    // };

    // const handleUpdateInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setUpdatingEleve({ ...updatingEleve, [name]: value });
    // };

    // const handleCreateEleve = async () => {
    //     try {
    //         const result = await axios.post(
    //             `http://localhost:3000/eleve/create`,
    //             newEleve
    //         );
    //         setEleves([...eleves, result.data.ops[0]]);
    //         setNewEleve({ surname: '', name: '' });
    //     } catch (error) {
    //         console.log('error:', error);
    //     }
    // };

    // const handleDeleteEleve = async (eleveId) => {
    //     try {
    //         await axios.delete(
    //             `http://localhost:3000/eleve/delete/${eleveId}`
    //         );
    //         setEleves(
    //             eleves.filter((eleve) => eleve._id !== eleveId)
    //         );
    //     } catch (error) {
    //         console.log('error:', error);
    //     }
    // };

    // const handleUpdateEleve = async (eleveId) => {
    //     try {
    //         const result = await axios.put(
    //             `http://localhost:3000/eleve/update/${eleveId}`,
    //             updatingEleve
    //         );
    //         const updatedEleves = eleves.map((eleve) => {
    //             if (eleve._id === result.data._id) {
    //                 return result.data;
    //             }
    //             return eleve;
    //         });
    //         setEleves(updatedEleves);
    //         setUpdatingEleve(null);
    //     } catch (error) {
    //         console.log('error:', error);
    //     }
    // };

    // console.log(eleves.data);

    return (
        <h1>Etudiants</h1>
        // <div>
        //     <h1>Liste des élèves</h1>
        //     <ul>
        //         {eleves.map((eleve) => (
        //             <li key={eleve._id}>
        //                 <p>
        //                     {eleve.surname} {eleve.name}
        //                 </p>
        //                 <button
        //                     onClick={() =>
        //                         handleDeleteEleve(eleve._id)
        //                     }
        //                 >
        //                     Supprimer
        //                 </button>
        //                 <button
        //                     onClick={() => setUpdatingEleve(eleve)}
        //                 >
        //                     Mettre à jour
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        //     <h2>Créer un nouvel élève</h2>
        //     <div>
        //         <label htmlFor='nom'>Nom :</label>
        //         <input
        //             type='text'
        //             id='nom'
        //             name='nom'
        //             value={newEleve.nom}
        //             onChange={handleInputChange}
        //         />
        //     </div>
        //     <div>
        //         <label htmlFor='prenom'>Prénom :</label>
        //         <input
        //             type='text'
        //             id='prenom'
        //             name='prenom'
        //             value={newEleve.prenom}
        //             onChange={handleInputChange}
        //         />
        //         <button onClick={handleCreateEleve}>Créer</button>
        //     </div>
        //     {updatingEleve && (
        //         <div>
        //             <h2>
        //                 Mettre à jour {updatingEleve.nom}{' '}
        //                 {updatingEleve.prenom}
        //             </h2>
        //             <div>
        //                 <label htmlFor='nom'>Nom :</label>
        //                 <input
        //                     type='text'
        //                     id='nom'
        //                     name='nom'
        //                     value={updatingEleve.nom}
        //                     onChange={handleUpdateInputChange}
        //                 />
        //             </div>
        //             <div>
        //                 <label htmlFor='prenom'>Prénom :</label>
        //                 <input
        //                     type='text'
        //                     id='prenom'
        //                     name='prenom'
        //                     value={updatingEleve.prenom}
        //                     onChange={handleUpdateInputChange}
        //                 />
        //                 <button
        //                     onClick={() =>
        //                         handleUpdateEleve(updatingEleve._id)
        //                     }
        //                 >
        //                     Enregistrer
        //                 </button>
        //                 <button
        //                     onClick={() => setUpdatingEleve(null)}
        //                 >
        //                     Annuler
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </div>
    );
};

export default students;
