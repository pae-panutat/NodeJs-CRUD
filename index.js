const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "test_node"
})

db.connect();

//show Data
app.get("/show", (req,res) => {
    //console.log("OK") 
    db.query('SELECT * FROM detail', (error, results, fields) => {
        if (error) throw error
        let message = ""
        if (results === undefined || results.length == 0) {
            message = "table is empty";
        } else {
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})


//show Data By id
app.get("/show/:id", (req,res) => {
    //console.log("OK") 
    db.query('SELECT * FROM detail WHERE id = ?', [req.params.id] , (error, results, fields) => {
        if (error) throw error
        let message = ""
        if (results === undefined || results.length == 0) {
            message = "table is empty";
        } else {
            message = "Successfully";
        }
        return res.send({ error: false, data: results, message: message});
    })
})


//inset Data
app.post("/insert", (req, res) => {
    const name = req.body.name
    const addr = req.body.addr
    // console.log(name)
    // console.log(addr)
    db.query('INSERT INTO detail (name, addr) VALUES(?,?)', [name, addr] , (err, results) => {
        if(err) throw err
        res.send("Success " + req.body.name)
    })
})


//Delete Data By id
app.delete("/delete/:id", (req,res) => {
    //console.log("OK") 
    db.query('DELETE FROM detail WHERE id = ?', [req.params.id] , (error, results, fields) => {
        if (error) throw error
        res.send("Deleted Success")
    })
})



app.listen(5000, () => {
    console.log("Server running successfully port 5000")
})