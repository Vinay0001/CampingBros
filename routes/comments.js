var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground")
var Comment=require("../models/comment")
var middleware=require("../middleware");

////Comments new////

router.get("/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground: campground});
		}
	})
});

//comments create

router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campground")
		}else{
			Comment.create(req.body.comment,function(err,comment){
			if(err){
				req.flash("error","Something went wrong");

				console.log(err);
			}else{
				//add username and id to the comment
				comment.author.id=req.user._id;
				comment.author.username=req.user.username;
				//save the comment
				comment.save();
				console.log(comment);
				campground.comments.push(comment);
				campground.save();
				req.flash("success","Successfully added comment");
				res.redirect("/campgrounds/"+campground._id);
			}
			});
		}
	});
});

//comments edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err|| !foundCampground){
			req.flash("error","No Campground Found");
			res.redirect("back");
		}
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
		});
	});
});
//comment update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});
//comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	//find and remove
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment Deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


module.exports=router;
