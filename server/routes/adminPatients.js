// ✅ routes/adminPatients.js
const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// 获取所有患者
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().populate("userId", "email name");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加患者
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      birthDate,
      gender,
      bloodType,
      allergies,
      medicalHistory,
      emergencyContact,
    } = req.body;

    const newPatient = new Patient({
      userId,
      birthDate,
      gender,
      bloodType,
      allergies,
      medicalHistory,
      emergencyContact,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 更新患者
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除患者
router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
