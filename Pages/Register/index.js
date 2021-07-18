const { response } = require("express");
const express=require("express");
const app=express();
const mongoose=require("mongoose")
const {MongoClient} = require('mongodb');
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
url="mongodb+srv://Pawan:raw12345@cluster0.asc1h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(url);

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    company: String,
    shift: String,
    benefits: Array,
  }, {timestamps: true});

var user=mongoose.model("users",UserSchema)



app.get("/",function(request,response){
    response.sendFile(__dirname+"/register.html");
})

app.post("/",function(req,res){
    console.log(req.body)
    res.sendFile(__dirname+"/Success.html");

    mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
        var User = { name:req.body.name, email:req.body.email , password:req.body.password,
            company:req.body.compnay,benefits:req.body.benefits,shift:req.body.shift};  
            var userdata=new user(User);
            userdata.save(function(err,data){
                if (err) throw err;
            }) 
            
            console.log(" document inserted"); 
        })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    });


app.listen(3000,function(){
    console.log("Server Started")
});