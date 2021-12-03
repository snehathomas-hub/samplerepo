const express=require('express');
const Bookdata = require('./src/model/Bookdata');
const port=process.env.PORT || 3000;

var app=new express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
const Authordata = require('./src/model/Authordata');
const Signupdata = require('./src/model/Signupdata');
const logindata= require('./src/model/logindata');
app.use(bodyParser.json());

var username="admin";
 var password="12345";
 const path=require('path');
 app.use(express.static('./dist/FRONTEND'));


app.post('/api/login',(req,res)=>{
   let userData=req.body;
if(!username){
    res.status(401).send("invalid username");
}else
if(password != userData.password){
    res.status(401).send("invalid password");
}
else{
    let payload={subject:username+password}
    let token=jwt.sign(payload,'secretkey')
    res.status(200).send({token})
}


});
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request');
    }
    let token=req.headers.authorization.split('')[1]
    if(token=='null'){
        return res.status(401).send('unauthorized request');
    }
    let payload=jwt.verify(token,'secretkey')
    console.log(payload)
    if(!payload){
        return res.status(401).send('unauthorized request');
    }
    req.userId=payload.subject
    next()

}

app.post('/api/adduser',function(req,res){
   
    console.log(req.body);
   
    var user = {       
        name: req.body.user.name,
        username:   req.body.user.username,
        pwd: req.body.user.pwd,
   }       
   var user = new Signupdata(user);
   user.save();
});

app.get('/api/books',function(req,res){
    
    Bookdata.find()
                .then(function(bookdatas){
                    res.send(bookdatas);
                });
});
app.get('/api/book/:id',  (req, res) => {
  
    const id = req.params.id;
      Bookdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })

  app.get('/api/author/:id',  (req, res) => {
  
    const id = req.params.id;
      Authordata.findOne({"_id":id})
      .then((author)=>{
          res.send(author);
      });
  })



app.get('/api/authors',function(req,res){
    
    Authordata.find()
                    .then(function(authordatas){
                        res.send(authordatas);
                    })
});

app.post('/api/addbook',function(req,res){
   
    console.log(req.body);
   
    var book = {       
        title: req.body.book.title,
        author: req.body.book.author,
        genre: req.body.book.genre,
        image : req.body.book.image
   }       
   var book = new Bookdata(book);
   book.save();
});
app.post('/api/addauthor',function(req,res){
   
    console.log(req.body);
   
    var author = {       
        name: req.body.author.name,
        nationality: req.body.author.nationality,
        image : req.body.author.image
   }       
   var author = new Authordata(author);
   author.save();
});

app.put('/api/updatebook',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    title= req.body.title,
    author = req.body.author,
    genre = req.body.genre,
    image = req.body.image
   Bookdata.findByIdAndUpdate({"_id":id},
                                {$set:{"title":title,
                                "author":author,
                                "genre":genre,
                                "image":image}})
   .then(function(){
       res.send();
   })
 })

 app.delete('/api/removebook/:id',(req,res)=>{
   
    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

  app.put('/api/updateauthor',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    name= req.body.name,
    nationality = req.body.nationality,
    image = req.body.image
   Authordata.findByIdAndUpdate({"_id":id},
                                {$set:{"name":name,
                                "nationality":nationality,
                                "image":image}})
   .then(function(){
       res.send();
   })
 })

 app.delete('/api/removebook/:id',(req,res)=>{
   
    id = req.params.id;
    Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })


  app.delete('/api/removeauthor/:id',(req,res)=>{
   
    id = req.params.id;
    Authordata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })

  app.get('/*',function(req,res){
      res.sendFile(path.join(__dirname + '/dist/FRONTEND/index.html'));
  })
app.listen(port,()=>{
    console.log("Server ready at" + port);
});
