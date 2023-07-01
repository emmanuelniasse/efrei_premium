// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Matiere = () => {
//   const [matieres, setMatieres] = useState([]);
//   const [nom, setNom] = useState("");
//   const [coef, setCoef] = useState("");

//   const getMatieres = async () => {
//     const res = await axios.get("http://localhost:3000/matiere");
//     setMatieres(res.data);
//   };

//   useEffect(() => {
//     getMatieres();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.get(`http://localhost:3000/matiere/create/${nom}/${coef}`);
//       setNom("");
//       setCoef("");
//       getMatieres();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.get(`http://localhost:3000/matiere/delete/${id}`);
//       getMatieres();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async (id) => {
//     try {
//       await axios.get(`http://localhost:3000/matiere/update/${id}/${nom}/${coef}`);
//       setNom("");
//       setCoef("");
//       getMatieres();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Liste des matières</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Coefficient</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matieres.map((matiere) => (
//             <tr key={matiere._id}>
//               <td>{matiere.nom}</td>
//               <td>{matiere.coef}</td>
//               <td>
//                 <button onClick={() => handleDelete(matiere._id)}>
//                   Supprimer
//                 </button>
//                 <button onClick={() => handleUpdate(matiere._id)}>
//                   Modifier
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Ajouter une matière</h2>
//       <form onSubmit={handleCreate}>
//         <div>
//           <label>Nom :</label>
//           <input
//             type="text"
//             value={nom}
//             onChange={(e) => setNom(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Coefficient :</label>
//           <input
//             type="number"
//             value={coef}
//             onChange={(e) => setCoef(e.target.value)}
//           />
//         </div>
//         <button type="submit">Ajouter</button>
//       </form>
//     </div>
//   );
// };

// export default Matiere;
