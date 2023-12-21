const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "navinportdb"
    ,port: "3306"
})

// db.connect((err) =>{
//     if(err){
//         console.log(err)
//         return;
//     }
//     console.log("connect mysql success")
// })

//GET
app.get('/getSubmit',(req,res) =>{
    db.query('SELECT * FROM company_submit', (err, result) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          return res.status(500).send('Error retrieving data');
        }
        res.send(result);
      });
})

app.post('/addSubmit',(req,res) =>{
    const name = req.body.name;
    const company = req.body.company;
    const email = req.body.email;
    const salary = req.body.salary;
    const comment = req.body.comment;

    db.query("INSERT INTO company_submit (name,com_name,email,salary,comment) VALUES(?,?,?,?,?)",
    [name,company,email,salary,comment]
    ,(err,post) => {
        if (err) {
          console.error('Error executing query: ' + err.stack);
          return res.status(500).send('Error retrieving data');
          }
        res.status(200).send("Insert Success")
    })

})

app.listen("8888",()=>{
    console.log("Server is running on port 8888...")
})