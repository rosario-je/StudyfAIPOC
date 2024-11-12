import express from "express";
import db from '../db/connection.js'
const router = express.Router();

//openAI API
import OpenAI from 'openai';
const openai = new OpenAI();

//schema models
import userModel from '../db/models/model.js'

router.post('/signup', async (req, res) => {
  try {
    const newUser = new userModel({
      ...req.body,
      data: new Date(),
    });
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error creating new user", error });
  }
})

router.post('/summarize', async (req, res) => {
  const pdfDocument = req.body.pdfContent;
  try {
    const modelResponse = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: "system",
          content: "You are a student's assistant summarizing the provided notes. If the user provides no study material, respond with: 'Please provide valid study notes'. Format your response as JSON, with each topic as an object containing keys like title, content, and examples (if necessary). Example: {\"topic1\": {\"title\": \"Title1\", \"content\": \"Content1\", \"examples\": \"Example1\"}}."
        },
        {
          role: "user",
          content: pdfDocument,
        }
      ]
    });
    let aiResponseContent = modelResponse.choices[0].message.content;
    console.log("Raw AI Response Content:", aiResponseContent);

    // Remove code block markers if they exist
    aiResponseContent = aiResponseContent.replace(/```json|```/g, '').trim();

    let aiResponse;
    try {
      aiResponse = JSON.parse(aiResponseContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return res.status(500).send({ message: "Error parsing AI response" });
    }

    res.json(aiResponse);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send({ message: "Error generating summary", error });
  }
});

router.post('/pdfUpload', (req, res) => {
  try {
    const pdfDocument = req.body.pdfContent;
    console.log(pdfDocument);
    res.send({ message: "PDF upload endpoint hit!" });
  } catch (error) {
    console.error("Failed to retrieve PDF info", error);
    res.status(500).send({ message: "Failed to retrieve PDF info", error });
  }
});



export default router;