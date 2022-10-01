//imports
import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
host: "localhost",
    user: "root",
    password: "root",
    database: "bookshop",
    port: "8889",
})

//middleware
app.use(express.json())



app.get("/" , (req,res) => {
    res.json('hello from home')
})

app.get("/books", (req,res) => {
   const query = "SELECT * FROM books";
    db.query(query,(err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`) VALUES(?) "
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover]
    db.query(query,[values],(err, data) => {
        if(err) return res.json(err);
        return res.json("Success")
    })
})

app.listen("8000", () => {
    console.log("listening to port 8000")
});