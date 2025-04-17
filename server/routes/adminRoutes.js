const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctors"); // ✅ 加上这句
const User = require("../models/User");

// ✅ 检查某个 user 是否存在（用于 doctor 添加时验证）
router.get("/users/:id", async (req, res) => {
  console.log("✅ User model:", User); // ✅ 打印 User 模型
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Error in GET /users/:id", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ 获取所有医生
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 添加医生
router.post("/doctors", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const saved = await newDoctor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 更新医生
router.put("/doctors/:id", async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 删除医生
router.delete("/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 获取所有患者
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find().populate("userId", "email fullName");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 添加患者
router.post("/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const saved = await newPatient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ 更新患者
router.put("/patients/:id", async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 删除患者
router.delete("/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
