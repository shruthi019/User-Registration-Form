const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');


//const AuthRoute = require('./routes/auth');

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', ()=>{
	console.log('error occurred');
});
db.once('open', ()=>{
	console.log("connection succeeded");
})

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// app.get('/example',(req, res)=>{
// 	res.send('hitting example');
// });

// app.get('/example/:name/:age', (req, res)=>{
// 	console.log(req.params);
// 	console.log(req.query);
// 	res.send(req.params.name + " :" + req.params.age);
// });

app.post('/', (req,res)=>{
	console.log(req.body);
	var name = req.body.name; 
    var email =req.body.email;
    var college = req.body.college;
    var year = req.body.year; 
    var pass = req.body.password; 
    
    var data = { 
        "name": name, 
        "email":email,
        "college": college,
        "year": year, 
        "password": pass, 
    } 
	db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
	res.sendFile(path.join(__dirname, 'static', 'success.html'));
})

app.listen(3000);
//app.use('/api', AuthRoute);