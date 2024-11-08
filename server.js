const express = require('express')
let ejs = require('ejs');
//Mongoose library instance
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user')

const app = express()
const port = 3000

// Template engine conf
app.set('view engine', 'ejs')

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//URL of MongoDB Database
const mongoDBURL = 'mongodb://127.0.0.1:27017/mydemoDB';
 
//connect to Database
mongoose.connect(mongoDBURL)
    .then(() => { console.log("Connection Successfull") })
    .catch((err) => { console.log("Received an Error") })

// let person = {name : "Deep", roll : 6}

// app.get('/', (req, res) => {
//   res.render('homepage', {person})
// })

app.get('/' , (req, res) => {
  res.render('homepage')
})

app.get('/userCreate' , (req, res) => {
  res.render('user')
})

app.post('/userCreate' , (req, res) => {
  console.log(req.body.email)
  
  const user = new User({
    email: req.body.email,
    name: req.body.name
  });

  user.save()
  console.log('User saved')

  res.render('homepage')
})

app.get('/contact' , (req, res) => {
  res.render('contactus')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
