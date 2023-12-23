import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/usersModel.js";

const router = express.Router();

function validatePhoneNumber(input_str) {
    var re = /^[\d\s\-\(\)]+$/;
  
    return re.test(input_str);
}

router.post("/register", async (req, res) => {
    const { firstName, lastName, DOB, phone, email, password, confirmPassword } = req.body;

    if (!validatePhoneNumber(phone) || phone.length < 7 || phone.length > 15) {
        return res.json({message: "Please enter a real phone number"});
    }

    if (password !== confirmPassword) {
        return res.json({ message: "Password and confirm password do not match" });
    }
    const user = await userModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({firstName, lastName, DOB, phone, email, password:hashedPassword, });
    try {
        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.json({ message: "User or password is invalid" });
    }
    const token = jwt.sign({ id: user._id}, "token");
    res.status(200).json({ success: true, message: "Login successful", token, userID: user._id, userName: user.lastName, email: user.email });
});

router.post("/info", async (req, res) => {
    const {email} = req.body;
    console.log(email);
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({ message: "User doesn't exist" });
    }
    res.status(200).json({ firstName: user.firstName, lastName: user.lastName, height: user.height, weight:user.weight, DOB:user.DOB, gender:user.gender, phone: user.phone});
});

// router.post("/settings", async (req, res) => {
//     const { firstName, lastName, height, weight, DOB, gender, phone, email, password, confirmPassword } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) {
//         return res.json({ message: "User doesn't exist" });
//     }
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//         return res.json({ message: "User or password is invalid" });
//     }
//     const token = jwt.sign({ id: user._id}, "token");
//     res.status(200).json({ success: true, message: "Login successful", token, userID: user._id, userName: user.lastName });
// });


export { router as userRouter };