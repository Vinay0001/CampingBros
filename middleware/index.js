var Campground=require("../models/campground");
var Comment=require("../models/comment");

//all middleware goes here
var middlewareObj={};

middlewareObj.checkCGownership=function checkCGownership(req,res,next){
	if(req.isAuthenticated()){

	 Campground.findById(req.params.id,function(err,foundCampground){
		//does he owns the cg
			if(foundCampground.author.id.equals(req.user._id)|| req.user.isAdmin){
				next();
			}else{
				req.flash("error","You  don't have permission to do that");
					res.redirect("back");			}
		}
	);
	}else{
		req.flash("error","You need to be Logged in to do that");
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next){
	if(req.isAuthenticated()){

	 Comment.findById(req.params.comment_id,function(err,foundComment){
				//does he owns the comment
			if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin){
				next();
			}else{
				req.flash("error","You don't have permission to do that");
				res.redirect("back");			}
		
	});
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn=function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that");
	res.redirect("/login");
}





module.exports=middlewareObj;