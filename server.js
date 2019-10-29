/**Server for Project Cruise**/
var fs=require("fs");
var express=require("express");
var bodyParser=require("body-parser");
var auth=require("./auth.js");

var app=express();
var port=8000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

var server=app.listen(port,()=>{
   console.log("Server listening at port "+server.address().port); 
})

app.post("/login",function(req,res)
{
        console.log("Entered for login")
    auth.login(req,res);
})

app.post("/signUp",function(req,res)
{
    console.log("Entered for signup")
    auth.signUp(req,res);
})
