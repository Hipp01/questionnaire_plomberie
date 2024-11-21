// import mongoose, { Schema, Document } from 'mongoose';

// export interface IReponse extends Document {
//   id: string; // Identifiant unique de la réponse
//   path: string; // Chemin catégorisé
//   text: string; // Texte descriptif de la réponse
// }

// const ReponseSchema = new Schema<IReponse>({
//   id: { type: String, required: true, unique: true }, // Champ obligatoire et unique
//   path: { type: String, required: true }, // Champ obligatoire
//   text: { type: String, required: true }, // Champ obligatoire
// });

// export default mongoose.model<IReponse>('Reponse', ReponseSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IReponse extends Document {
  id: string; // Identifiant unique de la réponse
  path: string; // Chemin catégorisé
  text: string; // Texte descriptif de la réponse
  title: string;  // Le titre de la réponse
  infos: string[]; // Tableau des informations
  couts: string[]; // Tableau des coûts
}

const ReponseSchema = new Schema<IReponse>({
  id: { type: String, required: true, unique: true }, // Champ obligatoire et unique
  path: { type: String, required: true }, // Champ obligatoire
  text: { type: String, required: true }, // Champ obligatoire
  title: { type: String, required: true }, // Le titre est requis
  infos: { type: [String], default: [] }, // Tableau d'infos, vide par défaut
  couts: { type: [String], default: [] }, // Tableau de coûts, vide par défaut
});

export default mongoose.model<IReponse>('Reponse', ReponseSchema);
