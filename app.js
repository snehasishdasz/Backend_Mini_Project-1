const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const userModel = require("./models/user")
const postModel = require("./models/post")

app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/profile",isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate("posts");//we get the email from payload data
    res.render("profile",{user});
    
})

app.post("/post",isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})//we get the email from payload data
    let {content} = req.body;

    let post = await postModel.create({
    user:user._id,
    content
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile")
})

app.post("/register", async (req,res)=>{
    let {username,email,password,age,name} = req.body;

    let user = await userModel.findOne({email})
    if(user){
        return res.status(500).send("User already registered")
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let createdUser = await userModel.create({
                username,
                name,
                email,
                password:hash,
                age
            })
            
            let token = jwt.sign({email:email, userid: createdUser._id},"shhhhhhh")
            res.cookie("token",token)
            res.json({ message: "User Created Successfully", user: createdUser });

        });
    });      
})

app.get("/login", (req,res)=>{
    res.render("login")
    
})

app.post("/login", async(req,res)=>{
    let {email,password} = req.body;
    
    let user = await userModel.findOne({email})
    if(!user){
        return res.send("Something went wrong");
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email:email,userid: user._id},"shhhhhhh")
            res.cookie("token",token)
            res.status(200).redirect("/profile")
        }else{
            res.redirect("/login")
        }
            
        });
});

app.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.redirect("/login")
})

function isLoggedIn(req, res, next) {
    
    let token = req.cookies.token;

    if (!token) {  // Checks if token is missing
        // res.send("You must be logged in")
        return res.redirect("/login"); 
    }
    else{
        let data = jwt.verify(req.cookies.token,"shhhhhhh");  //here as a data we get the email and user id , which we set during the time of token creation
        req.user = data;
    }
    next()
}

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})