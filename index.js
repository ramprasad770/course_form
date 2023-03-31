const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const hostname="0.0.0.0"
const port = process.env.PORT || 3000;
const url ="mongodb://ram:ram@ac-el59qvb-shard-00-00.qf40oxe.mongodb.net:27017,ac-el59qvb-shard-00-01.qf40oxe.mongodb.net:27017,ac-el59qvb-shard-00-02.qf40oxe.mongodb.net:27017/members?ssl=true&replicaSet=atlas-g5lrsv-shard-0&authSource=admin&retryWrites=true&w=majority"

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))


//uncomment for localhost

// mongoose.connect('mongodb://localhost:27017/mydb',{
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// });

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});




var db= mongoose.connection;

db.on('error',function(){
    console.log("Error in connecting to database.")
})
db.once('open',function(){
    console.log("connected to database.")
})

// instagram
app.post("/submit",function(req,res){
    let name =req.body.name;
    let email =req.body.email;
    let number =req.body.number;
    let whatsapp =req.body.whatsapp;
    let course=req.body.course
    

    let data={
        "name":name,
        "email":email,
        "number":number,
        "whatsapp":whatsapp,
        "course":course
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
    });
    
    return res.redirect('thanks.html')
})

app.get("/",function(req,res){
    res.set({
        "Allow-access-Allow-Origin:":'*'
    })
    return res.redirect('index.html')
}).listen(port,hostname);


console.log(`listening on port ${port}`);
