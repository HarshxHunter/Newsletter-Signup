const express=require("express");
const request= require("request");
const https = require('node:https');
var bodyParser= require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("static"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){
    const firstName= req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    //console.log(firstName,lastName,emailAdd);

    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    } 

    const jsonData=JSON.stringify(data);

    const url= "https://us21.api.mailchimp.com/3.0/lists/9850b208f2";

    const options={
        method:"POST",
        auth:"harsh1:b03bf4d964a0aa58ed4e9bf828d4bd8c-us21"
    }

    const request= https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(porcess.env.PORT || 3000,function(){
    console.log("Server running on port 3000.");
});


// api id
//b03bf4d964a0aa58ed4e9bf828d4bd8c-us21
//user id mail chimp
//9850b208f2

//url of app using cyclic
//https://dark-pink-cod-robe.cyclic.app