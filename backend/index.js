//imports
import express from "express"
import mysql from "mysql"
import cors from "cors"

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
app.use(cors())



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
    const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES(?) "
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover]
    db.query(query,[values],(err, data) => {
        if(err) return res.json(err);
        return res.json("Success")
    })
})

app.delete("/books/:id", (req,res) => {
    const query = "DELETE FROM books WHERE id = ? "
    const values = req.params.id
    db.query(query,[values],(err, data) => {
        if(err) return res.json(err);
        return res.json("Deleted successfully")
    })
})

app.put("/books/:id", (req,res) => {
    const query = "UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover`= ? WHERE id = ?"
    const bookId = req.params.id;
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(query,[...values,bookId],(err, data) => {
        if(err) return res.json(err);
        return res.json("Updated successfully")
    })
})

app.listen("8000", () => {
    console.log("listening to port 8000")
});