const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();

// Allow requests from the frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Atlas connection string
const mongoDBConnectionString = "mongodb+srv://grow-admin:Shivam%407217@cluster0.50u48.mongodb.net/growDB?retryWrites=true&w=majority";

mongoose.connect(mongoDBConnectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Serve the login page
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login | Grow</title>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #fff6e5, #ffe8e8);
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .login-container {
                background: #fff;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                max-width: 400px;
                width: 100%;
                animation: fadeIn 0.6s ease-out;
            }

            .logo {
                margin-bottom: 1rem;
                font-weight: bold;
                font-size: 1.5rem;
                color: #f57d1d;
                animation: pulse 2s infinite;
            }

            .input-group {
                margin-bottom: 1.5rem;
                text-align: left;
            }

            .input-group label {
                display: block;
                font-size: 0.9rem;
                color: #555;
                margin-bottom: 0.5rem;
            }

            .input-group input {
                width: 100%;
                padding: 0.8rem;
                font-size: 1rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                outline: none;
                transition: all 0.3s ease;
            }

            .input-group input:focus {
                border-color: #f57d1d;
                box-shadow: 0 0 5px rgba(245, 125, 29, 0.4);
                transform: scale(1.02);
            }

            .login-btn, .register-btn {
                background-color: #28a745;
                color: white;
                border: none;
                padding: 0.8rem 1rem;
                font-size: 1rem;
                border-radius: 5px;
                cursor: pointer;
                width: 100%;
                margin-top: 0.5rem;
                transition: all 0.3s ease;
            }

            .login-btn:hover, .register-btn:hover {
                background-color: #218838;
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .error-message {
                color: red;
                font-size: 0.9rem;
                margin-top: 1rem;
                animation: fadeIn 0.3s ease-out;
            }

            .register-link {
                margin-top: 1rem;
                font-size: 0.9rem;
                color: #007bff;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .register-link:hover {
                color: #0056b3;
                text-decoration: underline;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid #ffffff;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 0.8s linear infinite;
            }
        </style>
    </head>

    <body>
        <div class="login-container">
            <div class="logo">grow</div>
            <form id="login-form">
                <div class="input-group">
                    <label for="email">Your email</label>
                    <input type="email" id="email" name="email" placeholder="e.g. elon@tesla.com" required>
                </div>
                <div class="input-group">
                    <label for="password">Your password</label>
                    <input type="password" id="password" name="password" placeholder="e.g. ilovegrow123" required>
                </div>
                <button type="submit" class="login-btn">Sign in</button>
            </form>

            <div class="register-link" id="register-link">
                New user? Register here
            </div>
            
            <div class="error-message" id="error-message"></div>

            <form id="register-form" style="display: none;">
                <div class="input-group">
                    <label for="register-email">Your email</label>
                    <input type="email" id="register-email" name="email" placeholder="e.g. elon@tesla.com" required>
                </div>
                <div class="input-group">
                    <label for="register-password">Your password</label>
                    <input type="password" id="register-password" name="password" placeholder="e.g. ilovegrow123" required>
                </div>
                <button type="submit" class="register-btn">Register</button>
            </form>
        </div>

        <script>
            function showLoading(button) {
                const originalText = button.textContent;
                button.disabled = true;
                button.innerHTML = '<span class="loading"></span>';
                return () => {
                    button.disabled = false;
                    button.textContent = originalText;
                };
            }

            document.getElementById('login-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                const resetLoading = showLoading(this.querySelector('button[type="submit"]'));

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                try {
                    const response = await fetch('http://localhost:5000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Store the token in localStorage
                        localStorage.setItem('token', data.token);
                        // Redirect to the dashboard page
                        window.location.href = 'http://localhost:5173/dashboard';
                    } else {
                        document.getElementById('error-message').textContent = data.message || 'Login failed';
                    }
                } catch (error) {
                    document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
                } finally {
                    resetLoading();
                }
            });

            document.getElementById('register-link').addEventListener('click', function() {
                document.getElementById('login-form').style.display = 'none';
                document.getElementById('register-form').style.display = 'block';
                document.getElementById('register-link').style.display = 'none';
            });

            document.getElementById('register-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                const resetLoading = showLoading(this.querySelector('button[type="submit"]'));

                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;

                try {
                    const response = await fetch('http://localhost:5000/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // Redirect to login page after successful registration
                        window.location.href = '/';
                    } else {
                        document.getElementById('error-message').textContent = data.message || 'Registration failed';
                    }
                } catch (error) {
                    document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
                } finally {
                    resetLoading();
                }
            });
        </script>
    </body>

    </html>
    `);
});

// POST route to handle login
app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
                userId: user._id,
                email: user.email
            },
            'your_jwt_secret', { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                email: user.email,
                id: user._id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected route example
app.get('/user/profile', authenticateToken, async(req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route to handle registration
app.post('/register', async(req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Server listening on port 5000
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});

console.log('Server updated with animations');