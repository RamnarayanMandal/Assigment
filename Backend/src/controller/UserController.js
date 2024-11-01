import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes';




// Signup Controller
export const signupController = async (req, res) => {
    try {
        const { name, email, password,DOB } = req.body;

        // Validate if all required fields are provided
        if (!name || !email || !password || !DOB) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Name, Email, DOB  and Password are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'Email already registered. Please use a different one.' });
        }

        // Create new user instance
        const newUser = new User({
            name,
            email,
            password,
            DOB
        });

        // Save the user in the database
        const savedUser = await newUser.save();

        // Send back the response without the token
        res.status(StatusCodes.CREATED).json({
            message: 'User registered successfully.',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                DOB: savedUser.DOB,
            }
        });
    } catch (error) {
        console.error('Error in user registration:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error, please try again later.' });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password (user not found)' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password (password mismatch)' });
        }

        // Generate a JWT token or session here
        const token = user.createJWT();
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                
            }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};



