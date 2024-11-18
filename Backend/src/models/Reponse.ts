import mongoose, { Schema, Document } from 'mongoose';

export interface IReponse extends Document {
  id: string; // Identifiant unique de la réponse
  path: string; // Chemin catégorisé
  text: string; // Texte descriptif de la réponse
}

const ReponseSchema = new Schema<IReponse>({
  id: { type: String, required: true, unique: true }, // Champ obligatoire et unique
  path: { type: String, required: true }, // Champ obligatoire
  text: { type: String, required: true }, // Champ obligatoire
});

export default mongoose.model<IReponse>('Reponse', ReponseSchema);
