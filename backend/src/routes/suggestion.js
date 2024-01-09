import express from "express";
import { suggestionModel } from "../models/suggestionModel.js";

const router = express.Router();

function getCurrentDayInISOFormat() {
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().split('T')[0]; // Extracting the date part
  
    return isoDate;
}
const today = getCurrentDayInISOFormat();

router.post("/view", async (req, res) => {
    const { email } = req.body;
    const suggestion = await suggestionModel.findOne({ userEmail: email, date: today });
    res.status(200).json({
        suggestion: suggestion ? suggestion.context : "",
        });
});

router.post("/add", async (req, res) => {
    const { userEmail, date, context } = req.body;
    const newSuggestion = new suggestionModel({ userEmail, date, context});
    try {
        await newSuggestion.save();
        res.json({ success: true, message: "Suggestion created successfully" });
    } catch (error) {
        console.error("Error saving suggestion:", error);
        res.json({ message: "Internal server error" });
    }
});

router.post("/save", async (req, res) => {
    const { email, suggestion } = req.body;
    try {
        const suggestions = await suggestionModel.findOne({ userEmail: email, date: today });
        if (suggestions) {
            suggestions.context = suggestion;
            await suggestions.save();
        } else {
            const newSuggestion = new suggestionModel({ userEmail: email, date: today, context: suggestion});
            try {
                await newSuggestion.save();
                return res.json({ success: true, message: "Suggestion created successfully" });
            } catch (error) {
                console.error("Error saving suggestion:", error);
                return res.json({ message: "Internal server error" });
            }
        }
        res.json({ success: true, message: "Suggestion updated successfully" });
    } catch (error) {
        console.error("Error saving suggestion:", error);
        res.json({ message: "Internal server error" });
    }
});


export { router as suggestionRouter };