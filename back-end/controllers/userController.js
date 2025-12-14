import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middlewares/asyncHandler.js';

import createToken from '../utils/createToken.js';


const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
    console.log('role', role);

    if (!name || !email || !password || !role) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const userExists = await user.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
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
        res.status(201).json({
            message: "User registered successfully",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}
);
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const userExists = await user.findOne({ email });
    if (userExists && (await bcrypt.compare(password, userExists.password))) {
        console.log(req.body);
        createToken(res, userExists._id);
            res.status(200).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                role: userExists.role,
            });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

const logOutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const userProfile = await user.findById(req.user._id).select("-password");
    
    if (!userProfile) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json(userProfile);
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userProfile = await user.findById(req.user._id);
    
    if (!userProfile) {
        res.status(404);
        throw new Error("User not found");
    }

    if (name) userProfile.name = name;
    if (email) userProfile.email = email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        userProfile.password = await bcrypt.hash(password, salt);
    }

    await userProfile.save();

    res.status(200).json(userProfile);
}
);

export { createUser, loginUser ,logOutCurrentUser,getCurrentUserProfile , updateCurrentUserProfile};