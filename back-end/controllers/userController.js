import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';


const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        console.log('name', name);
        console.log('email', email);
        console.log('password', password);
        console.log('role', role);

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        if (newUser) {
            createToken(res, newUser._id);
            return res.status(201).json({
                message: 'User registered successfully',
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            });
        }
        return res.status(400).json({ message: 'Invalid user data' });
    } catch (err) {
        return next(err);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
       
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const userExists = await user.findOne({ email });
        if (userExists && (await bcrypt.compare(password, userExists.password))) {
            console.log(req.body);
            createToken(res, userExists._id);
            return res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                role: userExists.role,
            });
        }
        return res.status(400).json({ message: 'Invalid credentials' });
    } catch (err) {
        return next(err);
    }
};

const logOutCurrentUser = async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (err) {
        return next(err);
    }
};

const getCurrentUserProfile = async (req, res, next) => {
    try {
        const userProfile = await user.findById(req.user._id).select('-password');
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userProfile);
    } catch (err) {
        return next(err);
    }
};

const updateCurrentUserProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userProfile = await user.findById(req.user._id);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) userProfile.name = name;
        if (email) userProfile.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userProfile.password = await bcrypt.hash(password, salt);
        }
        await userProfile.save();
        return res.status(200).json(userProfile);
    } catch (err) {
        return next(err);
    }
};

export { createUser, loginUser, logOutCurrentUser, getCurrentUserProfile, updateCurrentUserProfile };