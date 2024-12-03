const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const users = []; // لتخزين المستخدمين مؤقتًا
const cors = require('cors');
app.use(cors());

// سر الـ JWT (يجب وضعه في متغير بيئي عند الإنتاج)
const JWT_SECRET = 'your_strong_secret_key'; // استبدل بمفتاح آمن

// API للتسجيل (Signup)
app.post('/signup', (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;

    // التحقق من صحة البيانات
    if (!first_name || !last_name || age <= 0 || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // التحقق من وجود المستخدم مسبقًا
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'Email already registered.' });
    }

    const newUser = { first_name, last_name, age, email, password };
    users.push(newUser);

    res.status(201).json({
        message: 'User registered successfully!',
    });
});

// API لتسجيل الدخول (Login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // التحقق من صحة البيانات
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    // البحث عن المستخدم
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // إزالة كلمة المرور من بيانات المستخدم
    const { password: _, ...userWithoutPassword } = user;

    // إنشاء JWT token
    const token = jwt.sign(userWithoutPassword, JWT_SECRET, {
        expiresIn: '1h', // مدة صلاحية الـ token
    });

    // إرسال الرد مع الـ token
    res.json({
        message: 'Login successful!',
        token, // إرسال الـ token
    });
});

// API لحماية البيانات (Profile)
app.get('/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // استخدم الهيدر للحصول على الـ token

    if (!token) {
        return res.status(403).json({ error: 'Token is required.' });
    }

    try {
        // التحقق من صحة الـ token
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({
            message: 'Profile data retrieved successfully.',
            user: decoded, // إرسال البيانات الموجودة داخل الـ token
        });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
