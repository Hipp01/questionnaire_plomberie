# Questionnaire Plomberie

Bienvenue dans le projet **Questionnaire Plomberie** ! Ce projet est une application web qui permet de poser des questions interactives sur des problèmes de plomberie et fournit des réponses détaillées en fonction des choix de l'utilisateur.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Node.js** (version >= 16.0)
- **Vuejs** (version >= 3.0)
- **NPM** (version >= 7.0)
- **Vue CLI** (version >= 4.5)
- **MongoDB** (local ou un service cloud comme MongoDB Atlas)
- **Git** (si vous clonez le projet depuis un dépôt Git)

Si vous ne les avez pas installés, voici les liens pour le faire :

- [Node.js](https://nodejs.org/)
- [Vue.js](https://v3.vuejs.org/guide/installation.html)
- [MongoDB](https://www.mongodb.com/try/download/community) ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vue CLI](https://cli.vuejs.org/)
- [NPM](https://www.npmjs.com/get-npm)
- [Git](https://git-scm.com/)

## Installation

### Cloner le projet

Commencez par cloner ce repository sur votre machine locale :

```bash
git clone https://github.com/Hipp01/questionnaire_plomberie
cd questionnaire_plomberie
```

### Installer les dépendances
Le projet est divisé en deux parties : Backend (API) et Frontend (Application Web). Nous allons installer les dépendances pour chaque partie.

1. Backend (API) : Accédez au dossier Backend et installez les dépendances :

```bash
cd ./Bckend
npm install
```

2. Frontend (Application Web) : Accédez au dossier Frontend et installez les dépendances :

```bash
cd ./Frontend
npm install
```

### Lancer l'application
Une fois les dépendances installées, vous pouvez lancer l'application complète en utilisant un seul script à la racine du projet. Ce script démarrera à la fois le Backend (API) et le Frontend (Application Web).

Lancer l'application complète
Depuis la racine du projet, exécutez la commande suivante pour lancer l'API et le frontend simultanément :

```bash
npm run start
```

Lancez uniquement cette commande pour tout installer et démarrer l'application. Vous pouvez maintenant accéder à l'application à l'adresse suivante : [http://localhost:8080](http://localhost:8080)

```bash
cd ./Frontend
npm install
cd ../Backend
npm install
cd ..
npm run start
```

### Cela démarrera deux processus parallèles :

- Backend sur le port 5000.
- Frontend sur le port 5173.
- L'API et l'application web seront maintenant en ligne et accessibles dans votre navigateur.

### Vérification
- Vous pouvez accéder à l'API via http://localhost:5000.
- Vous pouvez accéder à l'application frontend via http://localhost:5173.

## Fonctionnalités

- **Questions interactives** : L'utilisateur peut répondre à des questions interactives sur des problèmes de plomberie.
- **Réponses détaillées** : L'application fournit des réponses détaillées en fonction des réponses de l'utilisateur.
- **Questionnaire de contact** : L'utilisateur peut remplir un formulaire de contact pour obtenir une intervention d'un dépanneur.


## Structure du projet

Voici un aperçu des dossiers de ce projet :

```bash
questionnaire_plomberie/
│
├── Backend/                # Code de l'API (Node.js, Express)
│   ├── src/                # Code source (contrôleurs, modèles, middlewares, etc.)
│   ├── data/               # Fichiers de données (questions, réponses)
│   ├── models/             # Modèles de données (Mongoose)
│   ├── routes/             # Définition des routes de l'API
│   ├── tests/              # Tests unitaires et tests d'intégration
│   └── app.ts              # Point d'entrée de l'application
│
├── Frontend/               # Code de l'application frontend (Vue.js, React, etc.)
│   ├── src/                # Code source (composants, pages, etc.)
│   └── public/             # Fichiers publics (index.html, images, etc.)
│
├── package.json            # Fichier de configuration npm
└── README.md               # Documentation du projet
```

## Exécution des tests

Pour exécuter les tests unitaires sur l'API et sur l'application, vous pouvez utiliser la commande suivante :

```bash
cd ./Backend
npm run test
```

```bash	
cd ./Frontend
npm run test
```

## Fonctionnement des interactions entre l'API et l'application

L'application frontend communique avec l'API pour récupérer les questions et les réponses. Voici comment cela fonctionne :

1. Une fois cliqué sur la première icone de plomberie, l'application frontend envoie une requête GET à l'API pour récupérer les questions correspondantes à ce problème.

2. L'API renvoie la prochaine question dans un champ "text", les réponses possibles dans un champ "options"
qui comporte lui même un champ "text" pour le texte de la réponse et un champ "nextQuestionId" pour l'identifiant de la prochaine question, et aussi l'identifiant de la question précédente.

3. L'utilisateur répond à la question en cliquant sur une des réponses possibles.

4. L'application frontend envoie une requête GET à l'API pour récupérer la prochaine question en fonction de la réponse de l'utilisateur, etc.

5. Une fois que l'utilisateur a répondu à toutes les questions (le champ 'nextQuestionId' est 'null'), l'application envoie une requête GET à l'API pour récupérer la réponse finale.

6. L'API renvoie la réponse finale correspondant aux réponses de l'utilisateur avec tous les champs requis pour optimiser la réponse à l'utilisateur.

7. L'utilisateur peut ensuite remplir un formulaire de contact pour obtenir une intervention d'un dépanneur.

8. Une fois ce formulaire rempli, l'application frontend envoie un mail au dépanneur avec les informations du formulaire.


## Aide

Si vous avez des questions ou des problèmes, n'hésitez pas à ouvrir une issue sur le dépôt GitHub du projet.
Si vous testez l'application et que vous trouvez des bugs, n'hésitez pas à les signaler en ouvrant une issue.

Si vous êtes un recruteur de chez Goweb, merci à vous de m'avoir donné l'opportunité de réaliser ce test technique. J'espère que ce projet vous plaira et je reste à votre disposition pour toute question ou information supplémentaire par e-mail ou par téléphone.

Merci pour votre attention et votre temps.

## Auteur

Hippolyte Larzul

[hippolyte.larzul@gmail.com](mailto:hippolyte.larzul@gmail.com)


[0767226362](telto:0767226362)


## Points à améliorer

- Ajouter du responsive design pour une meilleure expérience utilisateur sur mobile.
( Par soucis de rapidité et de simplicité, je n'ai pas ajouté de responsive design pour l'instant. )
- Affiner les modèles de données, ex: calculer les couts en fonction des réponses de l'utilisateur.
