FROM node:20-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances en premier pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances (et éviter de garder les fichiers temporaires)
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm install

# Copier le reste des fichiers après installation des dépendances
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 5050

# Démarrer l'application
CMD ["npm", "start"]
