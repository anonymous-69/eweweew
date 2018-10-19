
"use strict"
// Boilerplate code for the express app. 
const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")
const mongoose = require("mongoose")
const keys = require("./config/keys") //Contains db passwors and username. 
var data_model = require("./Models/db_model");
const date = require('date-and-time');
const axios = require('axios')
var rp = require('request-promise');
var get_ip = require('ipware')().get_ip;
const app = express()


// mongoose.connect(keys.mongodb.dbURI)
// .then(() => console.log("connected to mongodb"))
// .catch(function(err){
// 	console.log(err)
// })
mongoose.connect(keys.mongodb.dbURI, function(){
        console.log("connected to mongo")
})

app.use(bodyParser.json()); 




// app.use(function( req,res,next){
//     next()
    
// });


app.get('/', function(req, res,next){
	var ip_info = get_ip(req);
     	console.log(ip_info);
	res.send(JSON.stringify({"message":"this is an API, not a regular webpage.", 
                                 "endpoints":["/paytm", "/amazon", "/flipkart"]}))
})



let amazon = require('./routes/amazon');
app.use('/', amazon);

let flipkart = require('./routes/flipkart');
app.use('/', flipkart);


let paytm = require('./routes/paytm');
app.use('/', paytm);

app.use(function(req, res, next) {
    res.status(404);
    res.send({"message":"Page not found!"});
});


// app.use(function( req,res,next){
// 	next()
	

// });



const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
