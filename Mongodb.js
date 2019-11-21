var mongoClient=require("mongodb").MongoClient;
var url="mongodb+srv://myuser:pass123@clustercruise-c0tbo.mongodb.net/test?retryWrites=true&w=majority";

function getCruiseList(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Cruise");
        var query={};
        var cruisename_array=(req.body.cruiseName).split(",");
        if(req.body.cruiseName!="undefined" && req.body.cruiseName!="")
        {
            query={CruiseName:{$in: cruisename_array}};
        }
        console.log(query);
        //  if(req.body.cruiseDestination!="")
        // {
        //     query={CompanyName:req.body.cruiseName};
        // }
        //  if(req.body.numDays!="")
        // {
        //     query={CompanyName:req.body.cruiseName};
        // }
        collection.find(query,{projection:{CompanyName:1,CruiseName:1,Guests:1,Crew:1,Launched:1,CruiseImage:1,Departs_from:1,Sails_to:1,_id:0}}).toArray((err,result)=>
        {
             if (err) throw err;
             console.log("res is :"+result);
             res.send("CruiseList @:"+JSON.stringify(result));
             db.close();
                    
        })
    })
}


function getDestinations(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Packages");
        //var query={CompanyName:req.body.cruiseName,Sails_to:req.body.cruiseDestination,Num_Days:req.body.numOfDays};
        var query={};
         if(req.body.cruiseName!=undefined && req.body.cruiseName!="")
        {
           query['CruiseName']=req.body.cruiseName;
        }
          if(req.body.packageName!=undefined && req.body.packageName!="")
        {
          query['PackageName']=req.body.packageName;
        }
        collection.find(query,{projection:{Sails_to:1,_id:0}}).toArray((err,result)=>
        {
             if (err) throw err;
             console.log(result);
             var data= filterArray(result,"Sails_to")
             console.log("filtered data : "+data.toString());
             res.send("DestinationsList@:"+data.toString());
             db.close();
                    
        })
        
    })
    
}

function filterArray(result,item)
{
      var filtered_res=[];
             result.forEach(function(itm){
                 var isfound=false;
                     filtered_res.forEach((filRes)=>{
                         if(filRes==itm[item])
                         {
                             isfound=true;
                             return;
                         }
                     })
                     if(isfound==false)
                     {
                         filtered_res.push(itm[item]);
                     }
                 })
    return filtered_res
}


function getDays(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Packages");
        //var query={CompanyName:req.body.cruiseName,Sails_to:req.body.cruiseDestination,Num_Days:req.body.numOfDays};
        var query={};
        if(req.body.cruiseDestination!=undefined && req.body.cruiseDestination!="")
        {
           query['Sails_to']=req.body.cruiseDestination;
        }
          if(req.body.packageName!=undefined && req.body.packageName!="")
        {
          query['PackageName']=req.body.packageName;
        }
        
        collection.find(query,{projection:{Num_Days:1,_id:0}}).toArray((err,result)=>
        {
             if (err) throw err;
             console.log(result);
             var data= filterArray(result,"Num_Days")
             console.log("filtered data : "+data.toString());
             res.send("DaysList@:"+data.toString());
             db.close();
                    
        })
    })
}

function filterNames(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Packages");
        var query={};
        //var query={CompanyName:req.body.cruiseName,Sails_to:req.body.cruiseDestination,Num_Days:req.body.numOfDays};
        var arr=[];
        if(req.body.cruiseName!=undefined && req.body.cruiseName!="")
        {
            query['CruiseName']=req.body.cruiseName;
            arr["CruiseName"]=req.body.cruiseName;
        }
         if(req.body.cruiseDestination!=undefined && req.body.cruiseDestination!="")
        {
             query['Sails_to']=req.body.cruiseDestination;
            arr["Sails_to"]=req.body.cruiseDestination;
        }
         if(req.body.numOfDays!=undefined && req.body.numOfDays!="")
        {
             query['Num_Days']=parseInt(req.body.numOfDays);
            arr["Num_Days"]=parseInt(req.body.numOfDays);
        }
        
        arr.forEach((v,k)=>{
            console.log(k+" --- "+v);
        })
        console.log(JSON.stringify(query));
        collection.find(query,{projection:{CruiseName:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
            console.log("result : "+JSON.stringify(result));
            var filter_result=filterArray(result,"CruiseName");
            console.log("res : "+filter_result);
            res.send("FilteredNames @:"+filter_result);
        })
        
        
    })
}

function getCruiseName(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db){
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Cruise")
	    var query={};
	    collection.find(query,{projection:{CruiseName:1,_id:0}}).toArray((err,result)=>{
	        if(err) throw err;
	        console.log(result);
	        var data= filterArray(result,"CruiseName")
             console.log("filtered data : "+data.toString());
             res.send("CruiseNames @:"+data.toString());
	        db.close();
	    })
	  })
}

function getActivities(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
       //       CruiseName  Activities Entertainment  Dining
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Activity");
        var query={CruiseName:req.body.cruiseName};
        collection.find(query,{projection:{Activities:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
            
	        var data= filterArray(result,"Activities")
	        console.log("Entering Activities "+data);
	        res.send("Activity@:"+data);
	        
        })
      
    })
}

function getEntertainment(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
       //       CruiseName  Activities Entertainment  Dining
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Activity");
        var query={CruiseName:req.body.cruiseName};
        collection.find(query,{projection:{Entertainment:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
	        console.log(result);
	        var data= filterArray(result,"Entertainment")
	        console.log("Entering Entertainment "+data);
	        res.send("Entertainment@:"+data);
	        
        })
      
    })
}

function getDining(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
       //       CruiseName  Activities Entertainment  Dining
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Activity");
        var query={CruiseName:req.body.cruiseName};
        collection.find(query,{projection:{Dining:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
            
	        var result_dining=filterArray(result,"Dining");
	        console.log("Entering Dining: "+result_dining);
	        res.send("Dining@:"+result_dining);
        })
      
    })
}
function getCabins(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
       //       CruiseName Cabins Deck
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Trips");
        var query={CruiseName:req.body.cruiseName};
        //var query={};
        collection.find(query,{projection:{Cabins:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
            console.log("result is "+JSON.stringify(result))
	        res.send("Cabins@:"+JSON.stringify(result));
        })
      
    })
}

function getRouteDetails(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
//PackageName CruiseName DeptDate Num_Days Departs_from  Sails_to RouteMap
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Packages");
        var query={CruiseName:req.body.cruiseName};
        collection.find(query,{projection:{CruiseName:1,PackageName:1,DeptDate:1,Num_Days:1,Departs_from:1,RouteMap:1,Sails_to:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
	        console.log(result);
	        
	        res.send("RouteDetails@:"+JSON.stringify(result));
	        
        })
      
    })
}
function getdeck(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err, db) {
       //       CruiseName Cabins Deck
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Trips");
        var query={CruiseName:req.body.cruiseName};
        //var query={};
        collection.find(query,{projection:{Deck:1,_id:0}}).toArray((err,result)=>{
            if(err) throw err;
              var data= filterArray(result,"Deck")
            console.log("result is "+JSON.stringify(result))
	        res.send("Decks@:"+data);
        })
      
    })
}

// db.collection.update({
//     "entityId": "12"
// }, {
//     $push: {
//     "nameIdentity": {
//         "fName": "123",
//         "lName": "456",
//         "dob": "00",
//         "address": "789"
//     }
//     }
// })

function addReview(req,res)
{
mongoClient.connect(url,{useUnifiedTopology:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("CruiseDataDB");
  var collection=dbo.collection("CruiseRating");
  var query = { "CompanyName": req.body.companyName}
  var updatedata={ $push:{"reviews":{"UserName": req.body.userName,"Rating": Number(req.body.rating),"Comments":req.body.comments}}};
  
  collection.updateOne(query,updatedata, function(err, result) {
    if (err) throw err;
    console.log("review added");
    console.log("review : "+result);res.send("ReviewAdded@:Review Added successfuly!!");
    db.close();
  });

//   var total=collection.aggregate([
//       {$match:{}},
//       {$group: {"Rating":{$sum:"$Rating"}}}
//       ]);
     
      //collection.reviews
});
}

function getReview(req,res)
{
mongoClient.connect(url,{useNewUrlParser:true}, function(err, db) {
  if (err) throw err;
  var dbo=db.db("CruiseDataDB");
  var collection=db.collection("CruiseRating");
  var query={};
  if(req.body.companyName!=undefined && req.body.companyName!="")
  {
      query['CompanyName']=req.body.companyName;
  }
    collection.find(query,{projection:{CompanyName:1,UserName:1,Rating:1,Comments:1,_id:0}},).toArray((err,result)=>{
    if (err) throw err;
    console.log(JSON.stringify(result));
    res.send("Reviews@:"+result);
  });
});
}

function getRating(req,res)
{
mongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("CruiseDataDB");
  var myobj = { "CompanyName": req.body.companyName, "UserName": req.body.userName,"Rating": req.body.rating,"Comments":req.body.comments};
  dbo.collection("CruiseRating").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("review added");
    db.close();
  });
});
}


function getPackages(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Packages");
        //var query={CompanyName:req.body.cruiseName,Sails_to:req.body.cruiseDestination,Num_Days:req.body.numOfDays};
        var query={};
        if(req.body.cruiseName!=undefined && req.body.cruiseName!="")
        {
          query={CruiseName:req.body.cruiseName};
        }
        collection.find(query,{projection:{PackageName:1,_id:0}}).toArray((err,result)=>
        {
             if (err) throw err;
             console.log(result);
             var data= filterArray(result,"PackageName")
             console.log("filtered data : "+data.toString());
             res.send("PackagesList@:"+data.toString());
             db.close();
                    
        })
        
    })
}

function bookTickets(req,res)
{
    
mongoClient.connect(url,{useUnifiedTopology:true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("CruiseDataDB");
  var collection=dbo.collection("Booking");
  var query = { "PackageName": req.body.packageName}
  //,"bookRooms":{ $elemMatch:{"roomNumber":{$ne:Number(req.body.roomNumber)}}}}
  var updatedata={ $push:{"bookRooms":{"roomNumber":req.body.roomNumber,"UserName": req.body.userName,"numPeople": Number(req.body.numPeople),"cabinType":req.body.cabinType,
  "totalPrice":req.body.totalPrice}}};
  collection.updateOne(query,updatedata, function(err, result) {
    if (err) throw err;
    console.log("review added");
    console.log("review : "+result);
    res.send("SeatsBooked@:Booking successfuly!!");
    db.close();
  });
});
}


function checkRoom(req,res)
{
      mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Booking");
        var query={ "PackageName":req.body.packageName,"bookRooms":{ $elemMatch:{"roomNumber":Number(req.body.roomNumber)}}}
        console.log(query);
  
   collection.find(query,{projection:{PackageName:1,bookRooms:1,roomNumber:1,_id:0}}).count(function (err, count)
        {
             if (err) throw err;
           console.log("count : "+count);
             db.close();
             res.send("checkRoomResult@:"+count);
        });
    });
    
}




exports.getDaysList=getDays;
exports.getDestinationsList=getDestinations;
exports.getCruiseList=getCruiseList;
exports.getCruiseNameList=getCruiseName;
exports.getFilteredNames=filterNames;
exports.getDiningList=getDining;
exports.getActivitiesList=getActivities;
exports.getEntertainmentList=getEntertainment;
exports.getdeckList=getdeck;
exports.getRouteDetailsList=getRouteDetails;
exports.getCabinsList=getCabins;
exports.getPackageList=getPackages;
exports.addNewReview=addReview;
exports.checkRoom=checkRoom;
exports.bookTickets=bookTickets;

