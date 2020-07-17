var express=require("express");
var router=express.Router();
var Campground=require("../models/campground")
var middleware=require("../middleware");

//INDEX -show all campgrounds
router.get("/",function(req,res){
	//getall campgrounds from db
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log("err");
		} else {
			res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user});

		}
	});

});

//create route
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form and 
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newcampground={name:name,price:price,image:image,description:description,author:author}
	
	//create a new campground and save to db

	Campground.create(newcampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		} else {
			
			res.redirect("/campgrounds");
		}
	});
});


//new campground route
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//show- shows more info about the campgrounds
router.get("/:id",function(req,res){
	//find campground on provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not Found");
			res.redirect("back");
		} else{
			console.log(foundCampground);
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

//EDIT UPDATE ROUTE
router.get("/:id/edit",middleware.checkCGownership,function(req,res){ 
	Campground.findById(req.params.id,function(err,foundCampground){
		req.flash("error","Campground not found");
		res.render("campgrounds/edit",{campground:foundCampground});
	});
});
router.put("/:id",middleware.checkCGownership,function(req,res){
	//find and update the correct campground

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
	//redirect
})
//DESTROY ROUTE
router.delete("/:id",middleware.checkCGownership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			req.flash("success","Campground Deleted");
			res.redirect("/campgrounds");
		}
	});
});





module.exports=router;
