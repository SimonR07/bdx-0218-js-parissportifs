const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost', // database host
    user: 'root', // your database username
    password: 'Azerty123!', // your database password
    database: 'edual' // your database name
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

// Insert
// app.post('/addUsers', (req, res) => {
//     let post = {pseudo:'Post Two', password:'This is post number two'};
//     let sql = 'INSERT INTO users SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Posts 1 added...');
//     });
// });

 app.post('/addUsers', (req, res, next) => {
    console.log('bitch plz');

     let post = {
         pseudo: req.body.pseudo,
         email: req.body.email,
         password: req.body.password
     };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {         
    if (err) throw err;
         console.log(result);
         res.redirect('/paris');
     });
});

app.post('/authentificationUsers', (req,res,next) => {
    console.log('Formulaire authentification');

    let get = [
         req.body.pseudo,
         req.body.password
    ];
    let sql = `SELECT password FROM users WHERE pseudo='${req.body.pseudo}'`;
    let query = db.query(sql, get, (err, result) => {
        console.log("query",err, result);
        console.log(req.body);
        console.log(result[0]);
        console.log(result[0].password);
        if ( req.body.password && req.body.password === result[0].password) {
            console.log('GG man');
            req.session.authenticated = true;
			res.redirect('/paris');
		} else {
            console.log('Error man');
			res.redirect('/');
		}

    }); 
});

module.exports = app;