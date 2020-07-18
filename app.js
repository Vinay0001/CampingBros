var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    flash=require("connect-flash"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground=require("./models/campground"),
    User=require("./models/user"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds")


//requiring routes
var commentRoutes=require("./routes/comments"),
	campgroundRoutes=require("./routes/campgrounds"),
	indexRoutes=require("./routes/index")

console.log(process.env.databaseURL);
mongoose.connect(process.env.databaseURL,{useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect(" mongodb+srv://vinay:VinayKaDB@campingbros.6e89b.mongodb.net/yelpcamp?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});


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

app.listen(process.env.PORT||5000,function(){
	console.log("the yelpcamp sever has started");
})