import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import pool from "./db/connection.js"; // Importer la connexion PostgreSQL
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/record", records);

// Tester la connexion PostgreSQL avant de lancer le serveur
pool.connect()
  .then(() => {
    console.log("✅ Connexion à PostgreSQL réussie.");
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur Express en écoute sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Échec de la connexion à PostgreSQL :", err);
    process.exit(1); // Arrêter l'application si la base est inaccessible
  });
