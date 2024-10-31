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
  let userDocument = req.body.notes
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
          content: userDocument
        }
      ]
    });
    const aiResponse = JSON.parse(modelResponse.choices[0].message.content);
    res.json(aiResponse);
  } catch (error) {
    console.error("error generating request");
  }
})

router.post('/pdfUpload', (req, res) => {
  let pdfDocument = req.body.
})



export default router;