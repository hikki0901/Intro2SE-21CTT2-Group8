import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/usersModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { firstName, lastName, DOB, phone, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(401).json({ message: "Password and confirm password do not match" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({firstName, lastName, DOB, phone, email, password:hashedPassword});
    try {
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User doesn't exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: "User or password is invalid" });
    }
    const token = jwt.sign({ id: user._id}, "token");
    res.status(200).json({ success: true, message: "Login successful", token, userID: user._id });
});

export { router as userRouter };