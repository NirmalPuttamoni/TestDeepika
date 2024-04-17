const express=require("express");
const notes=require("./data/notes")
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const app=express();
const userRoutes=require('./routes/userRoutes');
const noteRoutes=require("./routes/noteRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
dotenv.config();
app.use(express.json())
connectDB();

app.get("/",(req,res)=>
{
    res.send("Api is running")
});
// app.get("/api/notes",(req,res)=>
// {
//     res.json(notes);
// })
// app.get("/api/notes/:id",(req,res)=>
// {
//     const note=notes.find((n)=>n._id===req.params.id)
//     res.send(note)
// })
app.use("/api/users",userRoutes);
app.use("/api/notes",noteRoutes)
app.use(notFound);
app.use(errorHandler)
const PORT =process.env.PORT || 4000
app.listen(4000,console.log(`Server started on port ${PORT}`))