/**Server for Project Cruise**/
var fs=require("fs");
var express=require("express");
var bodyParser=require("body-parser");
var auth=require("./auth.js");
var mongodb=require("./Mongodb.js");

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
app.post("/cruiseList",function(req,res)
{
    console.log("Entered for cruise List");
    mongodb.getCruiseList(req,res);
})
app.post("/cruiseDestList",function(req,res)
{
    console.log("Entered for cruise dest List");
    mongodb.getDestinationsList(req,res);
})
app.post("/daysList",function(req,res)
{
    console.log("Entered for days List");
    mongodb.getDaysList(req,res);
})
app.post("/cruiseNameList",function(req,res)
{
    console.log("Entered for cruise name List");
    mongodb.getCruiseNameList(req,res);
})

app.post("/filterNames",function(req, res) {
    mongodb.getFilteredNames(req,res);
})
app.post("/entertainmentList",function(req, res) {
    mongodb.getEntertainmentList(req,res);
})
app.post("/activitiesList",function(req, res) {
    mongodb.getActivitiesList(req,res);
})
app.post("/diningList",function(req, res) {
    mongodb.getDiningList(req,res);
})
app.post("/routeDetails",function(req, res) {
    mongodb.getRouteDetailsList(req,res);
})
app.post("/cabins",function(req, res) {
    mongodb.getCabinsList(req,res);
})
app.post("/decks",function(req, res) {
    mongodb.getdeckList(req,res);
})
