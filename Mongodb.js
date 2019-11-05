var mongoClient=require("mongodb").MongoClient;
var url="mongodb+srv://myuser:pass123@clustercruise-c0tbo.mongodb.net/test?retryWrites=true&w=majority";

function getCruiseList(req,res)
{
    mongoClient.connect(url,{useNewUrlParser:true},function(err,db)
    {
        if(err) throw err;
        var dbo=db.db("CruiseDataDB");
        var collection=dbo.collection("Trips");
        var query={};
        collection.find(query,{projection:{CompanyName:1,CruiseName:1,Guests:1,Crew:1,Launched:1,CruiseImage:1,Departs_from:1,_id:0}}).toArray((err,result)=>
        {
             if (err) throw err;
            
             console.log(result);
             res.send(JSON.stringify(result));
             db.close();
                    
        })
        

    })
}

exports.getCruiseList=getCruiseList;