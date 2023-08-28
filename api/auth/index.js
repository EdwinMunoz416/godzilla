const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersDB = [];
const SECRET = 'my_secret_key';

// Functions for handling different actions
const handleRegister = async (context, username, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  usersDB.push({ username, password: hashedPassword });
  context.res.status(201).json({ success: true, message: 'User registered successfully' });
};

const handleLogin = async (context, username, password) => {
  const user = usersDB.find(u => u.username === username);
  if (!user) throw new Error('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid password');
  const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
  context.res.json({ success: true, token });
};

const handleRefreshToken = async (context, token) => {
  // Implement token refresh logic here
};

// Main function
module.exports = async function (context, req) {
  const action = req.query.action || (req.body && req.body.action);
  const { username, password } = req.body;

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    context.res.status(400).json({ success: false, message: 'Invalid username or password format' });
    return;
  }

  try {
    if (action === 'register') {
      await handleRegister(context, username, password);
    } else if (action === 'login') {
      await handleLogin(context, username, password);
    } else if (action === 'refresh_token') {
      await handleRefreshToken(context, req.body.token);
    } else {
      throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    context.res.status(400).json({ success: false, message: error.message });
  }
};
