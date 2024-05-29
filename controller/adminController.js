const Users=require('../model/userModel')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        res.status(400).json("User already exists");
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({ name, email, password: hashedPassword, isAdmin: true });
        await user.save();
        res.status(201).json(user);
    }
};
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser && existingUser.isAdmin ) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
            res.status(200).json({ user: existingUser, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
