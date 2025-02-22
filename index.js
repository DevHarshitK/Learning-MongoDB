const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 5001;
const Chat = require("./models/chats")

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
.then(res => {console.log("Connected to DB");})
.catch(err => {
    console.log("Error connecting to DB");
    console.log(err);
});

app.listen(port,()=>{
    console.log("Listening on port "+port);
});

app.get("/",(req,res)=>{
    res.redirect("/chats");
});

app.get("/chats",async (req,res)=>{
    let data= await Chat.find();
    if(data){
        res.render("index.ejs",{data});
    }
    else{
        res.send("Sorry! We don't have data");
    }
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats/new", (req,res)=>{
    let data = req.body;
    let newChat = new Chat({
        from:req.body.Sender,
        to:req.body.Receiver,
        message:req.body.message,
        created_at:new Date()
    });
    newChat.save()
    .then(result => {
        console.log(result);
        res.redirect("/");
    })
    .catch(err =>{
        res.render("error.ejs",{err})
    });
});