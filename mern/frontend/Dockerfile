# Étape 1 : Build avec Node.js
FROM node:18.9.1 AS builder

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application (dossier dist)
RUN npm run build

# Étape 2 : Utiliser un serveur statique pour servir le build
FROM node:18.9.1

# Installer "serve" pour servir l'app construite
RUN npm install -g serve

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/dist ./dist

# Exposer le port de Vite
EXPOSE 5173

# Commande de démarrage du conteneur
CMD ["serve", "-s", "dist", "-l", "5173"]
