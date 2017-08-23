var express=require('express');
var app=express();
var path = require("path");
var mongodb = require("mongodb");
var promise = require("bluebird");
var bodyParser = require("body-parser");
var auth = require("basic-auth");
var credential;
var mongoClient = mongodb.MongoClient;
var db;
var crud = require("./crud.js");
var url = 'mongodb://localhost:27017/employee';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

promise.promisify(mongodb);
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

mongoClient.connect(url,function(err,_db){
	if(err){
		console.log("Err",err);
	}else{
		db = _db;
	}
});
app.get('/',function(req,res){
	credential = auth(req);
	crud.getRowsArray(db,function(err,result){
		res.render("contacts.html",{title:"WebDev App (Angular View)",username:"Dude"});
	})
});
app.get("/entrycontact",function(req,res){
	credential = auth(req);
	res.render("entrycontact.html");
})
app.get("/deleteRecord/:id",function(req,res){
	credential = auth(req);
    id = req.params.id;
	crud.deleteRecord(db,id,function(err,result){
		res.send("Record deleted");
	})
})
app.get("/getone/:id",function(req,res){
	credential = auth(req);
	var cId = req.params.id;
	crud.getRowArray(db,cId,function(err,result){
		res.send(JSON.stringify({"contact":result[0],"x":"heheh"}));
	})
});
app.get("/editcontact/:id",function(req,res){
	credential = auth(req);
	crud.getRowsArray(db,function(err,result){
		res.render("editcontact.html",{title:"WebDev App (Angular View)",username:"Dude"});
	})
});
app.get("/getcontacts",function(req,res){
	credential = auth(req);
	crud.getRowsArray(db,function(err,result){
		res.send({"contact":result});
	})
});
app.post("/saveContact",function(req,res){
	credential = auth(req);
    var data = req.body;
	db.createCollection("mydb",{"ok":1});
	wri = crud.writeRecord(db,data,function(){
		res.redirect("/");
	});
})
app.post("/updateContact",function(req,res){
	credential = auth(req);
    var data = req.body;
	db.createCollection("mydb",{"ok":1});
	ups = crud.upsert(db,data,function(){
		res.redirect("/");
	});
})
app.listen(3000,function(){
	console.log('Listening port 3000');
});
