// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Classe = () => {
//   const [classes, setClasses] = useState([]);
//   const [newClasse, setNewClasse] = useState({ nom: '', annee: '' });
//   const [updatingClasse, setUpdatingClasse] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios.get(`http://localhost:3000/classe`);
//         setClasses(result.data);
//       } catch (error) {
//         console.log('error:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewClasse({ ...newClasse, [name]: value });
//   };

//   const handleUpdateInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatingClasse({ ...updatingClasse, [name]: value });
//   };

//   const handleCreateClasse = async () => {
//     try {
//       const result = await axios.get(`http://localhost:3000/classe/create/${newClasse.nom}/${newClasse.annee}`);
//       setClasses([...classes, result.data.ops[0]]);
//       setNewClasse({ nom: '', annee: '' });
//     } catch (error) {
//       console.log('error:', error);
//     }
//   };

//   const handleDeleteClasse = async (classeId) => {
//     try {
//       await axios.get(`http://localhost:3000/classe/delete/${classeId}`);
//       setClasses(classes.filter((classe) => classe._id !== classeId));
//     } catch (error) {
//       console.log('error:', error);
//     }
//   };

//   const handleUpdateClasse = async (classeId) => {
//     try {
//       const result = await axios.get(`http://localhost:3000/classe/update/${classeId}/${updatingClasse.nom}/${updatingClasse.annee}`);
//       const updatedClasses = classes.map((classe) => {
//         if (classe._id === result.data._id) {
//           return result.data;
//         }
//         return classe;
//       });
//       setClasses(updatedClasses);
//       setUpdatingClasse(null);
//     } catch (error) {
//       console.log('error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Liste des classes d'élèves</h1>
//       <ul>
//         {classes.map((classe) => (
//           <li key={classe._id}>
//             <p>{classe.nom}</p>
//             <p>{classe.annee}</p>
//             <button onClick={() => handleDeleteClasse(classe._id)}>Supprimer</button>
//             <button onClick={() => setUpdatingClasse(classe)}>Mettre à jour</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Créer une nouvelle classe</h2>
//       <div>
//         <label htmlFor="nom">Nom :</label>
//         <input type="text" id="nom" name="nom" value={newClasse.nom} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label htmlFor="annee">Année :</label>
//         <input type="number" id="annee" name="annee" value={newClasse.annee} onChange={handleInputChange} />
// </div>
// <button onClick={handleCreateClasse}>Créer</button>
// {updatingClasse && (
// <div>
// <h2>Mettre à jour la classe {updatingClasse.nom}</h2>
// <div>
// <label htmlFor="nom">Nom :</label>
// <input type="text" id="nom" name="nom" value={updatingClasse.nom} onChange={handleUpdateInputChange} />
// </div>
// <div>
// <label htmlFor="annee">Année :</label>
// <input type="number" id="annee" name="annee" value={updatingClasse.annee} onChange={handleUpdateInputChange} />
// </div>
// <button onClick={() => handleUpdateClasse(updatingClasse._id)}>Enregistrer</button>
// </div>
// )}
// </div>
// );
// };

// export default Classe;
