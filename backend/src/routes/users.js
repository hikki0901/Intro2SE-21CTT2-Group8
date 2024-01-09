import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/usersModel.js";
import { dietitianModel } from "../models/dietitiansModel.js";
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
    const dietitian = await dietitianModel.findOne({ email });
    
    if (!user && !dietitian) {
        return res.json({ message: "User doesn't exist" });
    }
    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) { 
            return res.json({ message: "User or password is invalid" });
        }
        const token = jwt.sign({ id: user._id}, "token");
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token, 
            userID: user._id, 
            userName: user.lastName, 
            email: user.email, 
            type: "user", 
            isLogin: 1 });
    }
    else {
        const isValidPassword = await bcrypt.compare(password, dietitian.password);
        if (!isValidPassword) { 
            return res.json({ message: "User or password is invalid" });
        }
        const token = jwt.sign({ id: dietitian._id}, "token");
        res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            token, 
            dietitianID: dietitian._id, 
            dietitianName: dietitian.lastName, 
            email: dietitian.email, 
            type: "dietitian", 
            isLogin: 1 });
    }
});

router.post("/info", async (req, res) => {
    const {email} = req.body;
    var user = await userModel.findOne({ email });
    if (!user) {
       user = await dietitianModel.findOne({ email });
    }
    if (user) {
        res.status(200).json({ 
            firstName: user.firstName, 
            lastName: user.lastName, 
            height: user.height ? user.height : null, 
            weight:user.weight ? user.weight: null, 
            DOB:user.DOB, 
            gender:user.gender, 
            phone: user.phone});
    }
    else {
        return res.json({ message: "User doesn't exist" });
    }
    
});

router.post("/settings", async (req, res) => {
    try {
        const { firstName, lastName, height, weight, DOB, gender, phone, email, password, confirmPassword } = req.body;

        if (!validatePhoneNumber(phone) || phone.length < 7 || phone.length > 15) {
            return res.json({message: "Please enter a real phone number"});
        }
        
        const user = await userModel.findOne({ email });
        var hashedPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            return res.json({ message: "Your new password is the same as your previous password" });
        }
        if (password != confirmPassword) {
            return res.json({message: "New password and confirm new password does not match"});
        }
        if (password != "") {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        const updatedUser = await userModel.updateOne(
            { email },
            {
                firstName,
                lastName,
                height,
                weight,
                DOB,
                gender,
                phone,
                password: hashedPassword,
            }
        );
        if (updatedUser.acknowledged) {
            res.json({ success: true, message: "User information updated successfully" });
        } else {
            res.json({ success: false, message: "Failed to update user information" });
        }
    } catch (error) {
      console.error("Error during settings update:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post("/viewmembership", async (req, res) => {
    const email = req.body
    try {
        const users = await userModel.findOne(email);    
        res.status(200).json({ premium: users.premium });
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/updatemembership", async (req, res) => {
    const email = req.body
    try {
        const users = await userModel.findOne(email);
        users.premium = 1;
        await users.save();
    
        res.status(200).json({ message: 'Succesfully updated user to premium' , premium: users.premium});
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/deletemembership", async (req, res) => {
    const email = req.body
    try {
        const users = await userModel.findOne(email);
        users.premium = 0;
        await users.save();
    
        res.status(200).json({ message: 'Succesfully updated user to premium' , premium: users.premium});
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/password", async (req, res) => {
    const email = req.body
    try {
        const users = await userModel.findOne(email);
        if (!users) {
            res.status(200).json({success: false, message: 'user does not exist'});
        }
    
        res.status(200).json({success: true});
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/resetpassword", async (req, res) => {
    const { email, password }= req.body
    try {
        const users = await userModel.findOne({email});
        const hashedPassword = await bcrypt.hash(password, 10);
        users.password = hashedPassword;
        await users.save();
    
        res.status(200).json({success: true, message: 'Succesfully updated user password'});
      } catch (error) {
        console.error('Error updating user password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/viewdietitian", async (req, res) => {
    const email = req.body
    try {
        const user = await userModel.findOne(email).select("dietitianEmail");
        const dietitian = await dietitianModel.findOne({email : user.dietitianEmail}).select("email firstName lastName degree _id")
        res.status(200).json({ dietitian: dietitian });
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/choosedietitian", async (req, res) => {
    const {userEmail, dietitianEmail} = req.body
    try {
        const user = await userModel.findOne({email: userEmail});
        user.dietitianEmail = dietitianEmail;
        await user.save();
        res.status(200).json({success: true, message: "Update personal dietitian successfully"});
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.post("/deletedietitian", async (req, res) => {
    const {userEmail} = req.body
    try {
        const user = await userModel.findOne({email: userEmail});
        user.dietitianEmail = null;
        await user.save();
        res.status(200).json({success: true, message: "Delete personal dietitian successfully"});
      } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

export { router as userRouter };