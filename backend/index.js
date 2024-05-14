const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 4000
const connectMongo = require("./db/db")
const {app,server} = require("./socket/socket")
const cookieParser = require("cookie-parser")
  
app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.json())
app.use(cookieParser())

connectMongo()

//available routes

app.get("/",(req,res)=>{
    res.send("sami is here")
})
app.get("/about",(req,res)=>{
    res.send("this is about")
})

app.use("/api/auth",require("./routes/user"))
app.use("/api/image",require("./routes/image"))
app.use("/api/messages",require("./routes/messageroute"))


server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})