var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose")
const MongoClient = require('mongodb').MongoClient;
var flash=require("connect-flash"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground=require("./models/campground"),
    User=require("./models/user"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds")

const uri = "mongodb+srv://vinay:VinayKaDB@campingbros.6e89b.mongodb.net/YelpCamp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//requiring routes
var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index")

mongoose.connect("mongodb://localhost:27017/yelpcamp_v12",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seeds the database

//passport configuration

app.use(require("express-session")({
	secret:"Once Again Rusty is good",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function(){
	console.log("the yelpcamp sever has started");
})