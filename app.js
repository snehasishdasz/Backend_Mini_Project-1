const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const upload = require("./config/multerconfig")
require('dotenv').config();

const userModel = require("./models/user")
const postModel = require("./models/post")

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));






app.get("/register",(req,res)=>{
    res.render("register");
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
            
            let token = jwt.sign({email:email, userid: createdUser._id},process.env.SECRET_KEY)
            res.cookie("token",token)
            // res.json({ message: "User Created Successfully", user: createdUser });
            // res.status(200).json({ message: "User Created Successfully", user: createdUser });
            res.redirect("/profile");

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
            let token = jwt.sign({email:email,userid: user._id},process.env.SECRET_KEY)
            res.cookie("token",token)
            res.status(200).redirect("/profile")
        }else{
            res.redirect("/login")
        }
            
        });
});


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

app.post("/like/:postId", isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.postId);
    let userId = req.user.userid;

    if (post.likes.includes(userId)) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();
    res.redirect("/profile");
});

app.get("/edit/:postId", isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.postId);

    // Security: Allow only post creator to edit
    if (post.user.toString() !== req.user.userid) {
        return res.status(403).send("Unauthorized");
    }

    res.render("edit", { post });
});


app.post("/edit/:postId", isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.postId);

    // Allow only post owner to update
    if (post.user.toString() !== req.user.userid) {
        return res.status(403).send("Unauthorized");
    }

    post.content = req.body.content;
    await post.save();
    res.redirect("/profile");
});

app.get("/profile/upload",(req,res)=>{
    res.render("profileUpload");
})

app.post("/profile/upload",isLoggedIn,upload.single("image"),async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    // console.log(req.file)
    let image = req.file.filename;
    user.profilepic = image;
    await user.save();
    res.redirect("/profile")

    
})




app.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.redirect("/login")
})


// Middleware to check if user is logged in before accessing certain routes
function isLoggedIn(req, res, next) {
    
    let token = req.cookies.token;

    if (!token) {  // Checks if token is missing
        // res.send("You must be logged in")
        return res.redirect("/login"); 
    }
    else{
        let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY);  //here as a data we get the email and user id , which we set during the time of token creation
        console.log(data)
        req.user = data;
    }
    next()
}

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})