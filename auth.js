var mysql=require("mysql");

function createConnection()
{
    var connection=mysql.createPool({
        connectionLimit:5,
        host:'ec2-34-229-86-209.compute-1.amazonaws.com',
        user:"myuser",
        password:"pass123",
        database:"CruiseUsers"
    })
    return connection;
}
function signUp(require,response)
{
    var conn=createConnection();
    let signUp_query="INSERT INTO Users(email,password) VALUES ?";
    var user=[];
    let data=[];
    data.push(require.body.firstName);
    data.push(require.body.lastName);
    data.push(require.body.email);
    data.push(require.body.psw);
    user.push(data);
    conn.query(signUp_query,[user],function(err,rows,fields)
    {
        if(!err)
        {
            response.send("ok:SignUp succcessfull!!");
        }else{
            response.send("Error:SignUp failed Please try with different email");
        }
    });
}

function login(require,response)
{
    var conn=createConnection();
    let login_query="Select * from Users where email="+require.body.email+" and password="+require.body.psw;
    conn.query(login_query,function(err,rows,fields){
        if(!err)
        {
            response.send("ok:Login succcessfull!!");
        }else{
             response.send("Error:Login failed Please try again");
        }
        
    })
}

exports.login=login;
exports.signUp=signUp;