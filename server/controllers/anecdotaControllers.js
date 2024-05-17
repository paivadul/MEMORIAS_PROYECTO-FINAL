const { Anecdota } = require("../models/anecdotaModels");

const createNewAnecdota = async (req, res) => {
  try {
    const { titulo, descripcion, fecha } = req.body;
    const media = req.file ? req.file.filename : null;

    const anecdota = new Anecdota({
      titulo,
      descripcion,
      fecha,
      media,
    });

    await anecdota.save();

    res.status(201).json({ message: "Anécdota creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewAnecdota,
};

const getAllAnecdotas = async (req, res) => {
  try {
    const anecdotas = await Anecdota.find();
    res.status(200).json(anecdotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnecdotaById = async (req, res) => {
  try {
    const anecdota = await Anecdota.findById(req.params.id);
    if (!anecdota) {
      return res.status(404).json({ message: "Anécdota no encontrada" });
    }
    res.status(200).json(anecdota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnecdota = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, media } = req.body;

    await Anecdota.findByIdAndUpdate(req.params.id, {
      titulo,
      descripcion,
      fecha,
      media,
    });

    res.status(200).json({ message: "Anécdota actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAnecdota = async (req, res) => {
  try {
    await Anecdota.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Anécdota eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchAnecdotas = async (req, res) => {
  try {
    const { message } = req.params;
    const regex = new RegExp(message, "i");
    const anecdotas = await Anecdota.find({
      $or: [{ titulo: regex }, { descripcion: regex }],
    });
    res.status(200).json(anecdotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewAnecdota,
  getAllAnecdotas,
  getAnecdotaById,
  updateAnecdota,
  deleteAnecdota,
  searchAnecdotas,
};
