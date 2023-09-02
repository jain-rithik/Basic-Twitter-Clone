const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOveride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOveride("_method"));

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let tweets = [
    {
        id : uuidv4(),
        username : "warikoo",
        content : "You DO NOT need to set up your life before you are 30. Life is not a scripted game. Things won't go as you planned and adding a deadline will not necessarily help. Take your time. Explore. You have time."
    },
    {
        id : uuidv4(),
        username : "kunalb11",
        content : "Some people get a false illusion of being superior by losing temper and being offended easily. Outrage is a great tactic to garner attention but comes at cost of reputation."
    },
    {
        id : uuidv4(),
        username : "rajshamani",
        content : "LISTEN to people! Don’t invalidate their feelings because something is not making sense to you. Something that's not big enough to you, can mean everything to someone."
    },
]

app.get("/tweets", (req,res) => {
    res.render("index.ejs", {tweets});
})

app.get("/tweets/new", (req,res) => {
    res.render("new.ejs");
})

app.post("/tweets", (req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    tweets.push( {id, username, content} );
    res.redirect("/tweets");
})

app.get("/tweets/:id", (req,res) => {
    let {id} = req.params;
    let tweet = tweets.find((t) => id === t.id);
    res.render("show.ejs", {tweet});
})

app.patch("/tweets/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let tweet = tweets.find((t) => id === t.id);
    tweet.content = newContent;
    console.log(tweet);
    res.redirect("/tweets");
})

app.get("/tweets/:id/edit", (req,res) => {
    let {id} = req.params;
    let tweet = tweets.find((t) => id === t.id);
    res.render("edit.ejs", {tweet});
})

app.delete("/tweets/:id", (req,res) => {
    let {id} = req.params;
    tweets = tweets.filter((t) => id !== t.id);
    res.redirect("/tweets");
})

app.listen(port, () => {
    console.log("listening to port 8080");
})