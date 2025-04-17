const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Doctor = require("../models/Doctors");
const User = require("../models/User"); // ✅ 新增：导入 User 模型

// 获取所有医生
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 添加医生
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      department,
      specialty,
      title,
      bio,
      phone,
      availableDays,
      avatar,
    } = req.body;

    // ✅ 验证 userId 格式合法
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "❌ Invalid userId format" });
    }

    // ✅ 验证该 user 存在且是 employee 类型
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    if (!user || user.type !== "employee") {
      return res.status(400).json({
        error: "❌ The user does not exist or is not of employee type!",
      });
    }

    // ✅ 保存 doctor
    const newDoctor = new Doctor({
      userId,
      department,
      specialty,
      title,
      bio,
      phone,
      availableDays,
      avatar,
    });

    const saved = await newDoctor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "❌ Add failed: " + err.message });
  }
});

// 更新医生
router.put("/:id", async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除医生
router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
