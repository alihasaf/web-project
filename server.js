const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve React build static files
const clientBuildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(clientBuildPath));

// Catch-all to serve React index.html for SPA routes
app.get('*', (req, res) => {
  // If the request starts with /api or is for the backend, skip to next handlers
  if (req.path.startsWith('/api') || req.path.startsWith('/signup') || req.path.startsWith('/login') || req.path.startsWith('/ordersdetail')) return res.status(404).end();
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const mongoUri = 'mongodb+srv://ecoomerce123:ecoomerce321@cluster112.z4djhvv.mongodb.net/mamaa?retryWrites=true&w=majority&appName=Cluster112';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Signup Schema
const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false }
});
const Signup = mongoose.model('signup', signupSchema, 'signup');

// Login Schema
const loginSchema = new mongoose.Schema({
  username: String,
  loginTime: { type: Date, default: Date.now }
});
const Login = mongoose.model('login', loginSchema, 'login');

// Signup Endpoint
app.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password) {
      console.log('Missing signup fields');
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Signup({ username, email, password: hashedPassword, isAdmin: !!isAdmin });
    await user.save();
    console.log('Signup successful:', username);
    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
});

// Admin Login Endpoint
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    // Allow login with username or email
    const user = await Signup.findOne({ $or: [ { username }, { email: username } ] });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Admin access denied' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // For demo, return a fake JWT
    const adminJwt = 'admin-demo-jwt';
    res.json({ message: 'Admin login successful', token: adminJwt, role: 'admin', username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error: error.message });
  }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  shipping: String,
  paymentMethod: String,
  paymentStatus: String,
  items: Array,
  grandTotal: Number,
  createdAt: { type: Date, default: Date.now }
});
const OrderDetail = mongoose.model('ordersdetail', orderSchema, 'ordersdetail');

// Order Save Endpoint
app.post('/ordersdetail', async (req, res) => {
  try {
    const order = new OrderDetail(req.body);
    await order.save();
    res.json({ message: 'Order saved successfully!' });
  } catch (error) {
    console.error('Order save error:', error);
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('Missing login fields');
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await Signup.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Save login attempt
    const login = new Login({ username });
    try {
      const doc = await login.save();
      console.log('Login document saved:', doc);
      console.log('Login successful:', username);
      res.json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error saving login:', err);
      res.status(500).json({ message: 'Login successful, but failed to record login in DB', error: err.message });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// --- Stripe Payment Endpoint ---
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/api/pay-with-stripe', async (req, res) => {
  const { paymentMethodId, amount, ...orderDetails } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });
    if (paymentIntent.status === 'succeeded') {
      return res.json({ success: true, paymentIntentId: paymentIntent.id });
    } else {
      return res.status(400).json({ success: false, message: 'Payment not successful', paymentIntent });
    }
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// --- AI Chatbot Endpoint ---
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
app.post('/api/ai-chat', async (req, res) => {
  console.log("AI chat endpoint hit!", req.body);
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing OpenAI API Key' });
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 150,
        temperature: 0.7
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return res.status(500).json({ error: data.error?.message || 'OpenAI API error' });
    }
    res.json({ reply: data.choices[0].message.content.trim() });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// Serve HTML forms
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
