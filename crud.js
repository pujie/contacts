var mongodb = require("mongodb");
var promise = require("bluebird");
var ObjectId = require('mongodb').ObjectID;
var mongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/employee';
module.exports = {
	deleteRecord : function(db,contact_id, callback) {
		db.collection('mydb').deleteOne( {
			"_id" : ObjectId(contact_id)
		}, function(err, result) {
			console.log("Delete record.",contact_id);
			callback();
		});
	},	
	writeRecord : function(db,data, callback) {
		db.collection('mydb').insertOne( {
			"name" : data.name,
			"title" : data.title,
			"email" : data.email,
			"phone" : data.phone,
			"fullname" : data.fullname,
			"address" : data.address,
			"company" : data.company,

		}, function(err, result) {
			console.log("Inserted a document into the contact collection.");
			callback();
		});
	},
	getRows : function(db, callback) {
		var cursor =db.collection('mydb').find( );
		cursor.each(function(err, doc) {
			if (doc != null) {
				callback(err,doc);
			} else {
				console.log("End of Doc");
			}
		});
	},
	findRow : function(db, callback) {
		var cursor =db.collection('mydb').find();
		cursor.each(function(err, doc) {
			if (doc != null) {
				console.dir(doc);
				callback(err,doc);
			} else {
				console.log("End of Doc");
				callback(err,null);
			}
		});
	},
	getRowsArray : function(db, callback) {
		var cursor =db.collection('mydb').find( ).toArray(function(err,res){
			console.log("Result",res);
			callback(err,res);
		});
	},
	getRowArray : function(db, cId,callback) {
		var cursor =db.collection('mydb').find({_id:ObjectId(cId)}).toArray(function(err,res){
			console.log("Result",res);
			callback(err,res);
		});
	},
	upsert : function(db, data, callback){
		db.collection("mydb").update({
			_id:ObjectId(data._id)
		},{
			name:data.name,
			address:data.address,
			title:data.title,
			phone:data.phone,
			email:data.email,
			company:data.company,
			fullname:data.fullname,
		},{
			upsert:true
		});
		callback();
	}
}
