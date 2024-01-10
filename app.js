import express from "express";
import mongoose from "mongoose";
import Question from "./model/question.js";
// import omolara from "./model/lara.js"
 // intialize express
 const app = express();
 const port = 4000;
 await mongoose.connect('mongodb://localhost:27017/quiz');
 
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

 //homepage 
 app.set("view engine", "ejs") 
//  app.get("/",(req, res)=>{ 
//     console.log("A request came in")
//     res.render("home")
//  })
//



 // Home route - display all questions
app.get('/', async (req, res) => {
  
  res.render('home')
});
app.get ('/create', (req, res)=>{
 res.render("create")
});

app.get ('/start-quiz', async(req, res)=>{
  
  const questions = await Question.find()
  console.log(questions)
 res.render("start_quiz")
});
// Create new question form
app.get('/questions/new', (req, res) => {
  res.render('new');
});

// Create new question
app.post('/questions', async (req, res) => {
 try {
  const {question, correctAnswer,option1,option2,option3 }= req.body;
  //  console.log(req.body)
  //  console.log(question)
   const newQuestion = new Question({
    question,
    answers: [option1, option2, option3],
    correctAnswer
   })
   newQuestion.save()
   res.render('success',{success:true})
 } catch (error) {
   
  res.render('success',{success:false})
  console.log(error)
 }
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


