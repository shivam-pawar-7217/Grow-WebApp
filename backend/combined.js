const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize express app
const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Atlas connection string
const mongoDBConnectionString = "mongodb+srv://LIGHTNING:Shivam@cluster0.50u48.mongodb.net/growDB?retryWrites=true&w=majority";

mongoose.connect(mongoDBConnectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Serve the login HTML file on the root route
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login | Mangools</title>
        <style>
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
            }

            .logo {
                margin-bottom: 1rem;
                font-weight: bold;
                font-size: 1.5rem;
                color: #f57d1d;
            }

            .tagline {
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
                color: #333;
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
            }

            .login-btn {
                background-color: #28a745;
                color: white;
                border: none;
                padding: 0.8rem 1rem;
                font-size: 1rem;
                border-radius: 5px;
                cursor: pointer;
                width: 100%;
                margin-top: 0.5rem;
                transition: background-color 0.3s ease;
            }

            .login-btn:hover {
                background-color: #218838;
            }

            .links {
                margin-top: 1rem;
                font-size: 0.9rem;
                color: #555;
            }

            .links a {
                color: #f57d1d;
                text-decoration: none;
                margin: 0 0.5rem;
            }

            .links a:hover {
                text-decoration: underline;
            }

            .footer {
                margin-top: 2rem;
                display: flex;
                justify-content: space-around;
            }

            .footer img {
                width: 40px;
                height: 40px;
                transition: transform 0.2s;
            }

            .footer img:hover {
                transform: scale(1.1);
            }
        </style>
    </head>

    <body>
        <div class="login-container">
            <div class="logo">grow</div>
            <div class="tagline">Good to see you again</div>
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
            <div class="links">
                <a href="#">Don't have an account?</a> | <a href="#">Forgot password?</a>
            </div>
            <div class="footer">
                <img src="https://images.freeimages.com/fic/images/icons/2437/pretty_social_media_icon_part_1/256/linkedin.png" alt="KWFinder">
                <img src="https://img.favpng.com/17/20/25/made-in-kings-heath-instagram-facebook-female-photography-png-favpng-rPdTRBWci5EUw6JEQNWffZ8Ca_t.jpg" alt="SERPChecker">
                <img src="https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg" alt="SERPWatcher">
              
            </div>
        </div>
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

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Server listening on port 5000
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});