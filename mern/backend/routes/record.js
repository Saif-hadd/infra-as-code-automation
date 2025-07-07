import { Router } from "express";
import pool from "../db/connection.js";

const router = Router();

// Route pour récupérer tous les enregistrements
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM records");
    console.log("✅ Enregistrements récupérés :", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des enregistrements :", err.message);
    res.status(500).send("Error fetching records");
  }
});

// Route pour récupérer un enregistrement par ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM records WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Record not found");
    }
    console.log("✅ Enregistrement récupéré :", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération de l'enregistrement :", err.message);
    res.status(500).send("Error fetching record");
  }
});

// Route pour créer un enregistrement
router.post("/", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    console.log("📥 Requête POST reçue :", req.body);

    // Valider les données
    if (!name || !position || !level) {
      return res.status(400).json({ error: "Les champs name, position et level sont requis" });
    }

    const query = `
      INSERT INTO records (name, position, level)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, position, level];

    const result = await pool.query(query, values);
    console.log("✅ Enregistrement créé :", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Erreur lors de la création :", err.message);
    res.status(500).json({ error: "Erreur lors de la création de l'enregistrement", details: err.message });
  }
});

// Route pour mettre à jour un enregistrement
router.patch("/:id", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    console.log("📥 Requête PATCH reçue :", req.body);

    // Valider les données
    if (!name || !position || !level) {
      return res.status(400).json({ error: "Les champs name, position et level sont requis" });
    }

    const query = `
      UPDATE records
      SET name = $1, position = $2, level = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, position, level, req.params.id];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send("Record not found");
    }
    console.log("✅ Enregistrement mis à jour :", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour :", err.message);
    res.status(500).send("Error updating record");
  }
});

// Route pour supprimer un enregistrement
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM records WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Record not found");
    }
    console.log("✅ Enregistrement supprimé :", req.params.id);
    res.status(200).send("Record deleted");
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err.message);
    res.status(500).send("Error deleting record");
  }
});

export default router;