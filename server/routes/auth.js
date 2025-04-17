const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const router = express.Router();
const fs = require('fs');


// multer 设置上传文件位置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// 注册接口
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { fullName, email, password, type } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file ? req.file.filename : null;

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      type,
      image
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('[Register Error]', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// 登录接口
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        email: user.email,
        type: user.type,
        image: user.image,
        fullName: user.fullName 
      }
    });
  } catch (err) {
    console.error('[Login Error]', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// 获取用户头像（前端用于登录时显示）
router.get('/avatar', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ image: user.image });
  } catch (err) {
    console.error('[Avatar Error]', err);
    res.status(500).json({ message: 'Failed to get avatar' });
  }
});


router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating password' });
  }
});

// 更新头像
router.post('/update-avatar', upload.single('image'), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 如果用户原本有头像且不是默认头像，尝试删除旧文件
    if (user.image) {
      const oldPath = path.join(__dirname, '../uploads', user.image);

      // 检查文件存在且不是默认头像再删除
      if (
        fs.existsSync(oldPath) &&
        user.image !== 'img_avatar.png'
      ) {
        try {
          fs.unlinkSync(oldPath);
        } catch (err) {
          console.error('Failed to delete old avatar:', err);
        }
      }
    }

    // 更新用户头像字段
    user.image = req.file.filename;
    await user.save();

    res.status(200).json({ message: 'Avatar updated successfully.', image: user.image });
  } catch (err) {
    console.error('Avatar update error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
