import express from "express";
import mongoose from "mongoose";
import Question from "./models/question"
 // intialize express
 const app = express();
 const port = 4000;


 

 //homepage 
 app.set("view engine", "ejs") 
//  app.get("/",(req, res)=>{ 
//     console.log("A request came in")
//     res.render("home")
//  })
//



 // Home route - display all questions
app.get('/', async (req, res) => {
  const questions = await Question.find();
  res.render('index', { questions });
});

// Create new question form
app.get('/questions/new', (req, res) => {
  res.render('new');
});

// Create new question
app.post('/questions', async (req, res) => {
  const { question, answers, correctAnswer } = req.body;
  const newQuestion = new Question({ question, answers, correctAnswer });
  await newQuestion.save();
  res.redirect('/');
});



// Display a specific question
app.get('/questions/:id', async (req, res) => {
   const question = await Question.findById(req.params.id);
   res.render("start_quiz", { question });
 });

 // Handle quiz submission
 app.post('/questions/:id/submit', async (req, res) => {
   const question = await Question.findById(req.params.id);
   const userAnswer = parseInt(req.body.answer);
 
   // Check if the answer is correct
   const isCorrect = userAnswer === question.correctAnswer;
 
   res.render("result", { isCorrect });
 });





// app.get("/create",(req, res)=>{ 
//    console.log("A request came in")
//    res.render("create")
// })
// //
 

// app.get("/answer",(req, res)=>{ 
//    console.log("A request came in")
//    res.render("start_quiz")
// })




// make app listen for request
 app.listen(port,()=>{console.log(`app is listening on: ${port}`)});


