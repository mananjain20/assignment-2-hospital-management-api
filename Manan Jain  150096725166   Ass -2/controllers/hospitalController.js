const Hospital = require("../models/Hospital");

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllHospitals, getHospitalById, createHospital, updateHospital, deleteHospital };
