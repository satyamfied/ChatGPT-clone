import express from "express";
import Thread from "../models/Thread.js";
import getopenAIResponse from "../utils/openAi.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId : "xyz123",
            title : "New Thread 1"
        });

        const resposne = await thread.save();
        res.send(resposne);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to save in MongoDB" });
    }
});

// Get all threads with their latest messages
router.get("/thread", async (req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1 });
        res.json(threads);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to fetch threads from MongoDB" });
    }
});

// Get all messages of a thread
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try{
        const thread = await Thread.findOne({ threadId });

        if(!thread){
            return res.status(404).json({ error: "Thread not found" });
        }

        res.json(thread.messages);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

// Delete a thread and all its messages
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try{
        const thread = await Thread.findOneAndDelete({ threadId });

        if(!thread){
            return res.status(404).json({ error: "Thread not found" });
        }

        res.status(200).json({ message: "Thread deleted successfully" });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to delete thread" });
    }
});

// Add a new message to a thread and get response from OpenAI
router.post("/chat", async (req, res) => {

    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({
            error: "Missing required fields"
        });
    }

    try {

        let thread = await Thread.findOne({ threadId });

        if (!thread) {

            thread = new Thread({
                threadId,
                title: message,
                messages: [{
                        role: "user",
                        content: message
                }]
            });

        } else {

            thread.messages.push({
                role: "user",
                content: message
            });

        }

        const assistantReply = await getopenAIResponse(message);

        thread.messages.push({
            role: "assistant",
            content: assistantReply
        });

        thread.updatedAt = new Date();

        await thread.save();

        res.json({
            message: assistantReply
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to add message to thread"
        });

    }

});

export default router;