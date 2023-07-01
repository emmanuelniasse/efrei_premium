// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Note = () => {
//   const [notes, setNotes] = useState([]);
//   const [valeur, setValeur] = useState('');
//   const [eleves, setEleves] = useState([]);
//   const [selectedEleve, setSelectedEleve] = useState('');
//   const [matieres, setMatieres] = useState([]);
//   const [selectedMatiere, setSelectedMatiere] = useState('');

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const result = await axios.get('http://localhost:3000/note');
//       setNotes(result.data);
//     };
//     fetchNotes();

//     const fetchEleves = async () => {
//       const result = await axios.get('http://localhost:3000/eleve');
//       setEleves(result.data);
//     };
//     fetchEleves();

//     const fetchMatieres = async () => {
//       const result = await axios.get('http://localhost:3000/matiere');
//       setMatieres(result.data);
//     };
//     fetchMatieres();
//   }, []);

//   const handleValeurChange = (event) => {
//     setValeur(event.target.value);
//   };

//   const handleEleveChange = (event) => {
//     setSelectedEleve(event.target.value);
//   };

//   const handleMatiereChange = (event) => {
//     setSelectedMatiere(event.target.value);
//   };

//   const handleCreateNote = async () => {
//     try {
//       const result = await axios.get(`http://localhost:3000/note/create/${selectedEleve}/${selectedMatiere}/${valeur}`);
//       setNotes([...notes, result.data]);
//       setValeur('');
//       setSelectedEleve('');
//       setSelectedMatiere('');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <label>Elève :</label>
//         <select value={selectedEleve} onChange={handleEleveChange}>
//           <option value=''>Sélectionnez un élève</option>
//           {eleves.map((eleve) => (
//             <option key={eleve._id} value={eleve._id}>
//               {eleve.name} {eleve.surname}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Matière :</label>
//         <select value={selectedMatiere} onChange={handleMatiereChange}>
//           <option value=''>Sélectionnez une matière</option>
//           {matieres.map((matiere) => (
//             <option key={matiere._id} value={matiere._id}>
//               {matiere.nom}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Note :</label>
//         <input type='number' value={valeur} onChange={handleValeurChange} />
//       </div>
//       <div>
//         <button onClick={handleCreateNote}>Ajouter la note</button>
//       </div>
//       <h2>Liste des notes</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Elève</th>
//             <th>Matière</th>
//             <th>Note</th>
//           </tr>
//         </thead>
//         <tbody>
//           {notes.map((note) => (
//             <tr key={note._id}>
//               <td>
//                 {note.eleve.surname} {note.eleve.name}
//               </td>
//               <td>{note.matiere.nom}</td>
//               <td>{note.valeur}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// );
// };

// export default Note;
