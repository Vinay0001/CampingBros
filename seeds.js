var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
	{	name:"Cloud's Rest",
	 	image:"https://www.photosforclass.com/download/px_2398220",
	 	description:"Aute dolor ea incididunt dolor do incididunt magna adipisicing sed elit labore commodo et incididunt dolor veniam elit commodo aliquip cillum ullamco labore nulla quis labore cupidatat nulla excepteur dolor enim cupidatat dolor aute sit cupidatat incididunt exercitation id minim ut in quis sint in sit non eu in pariatur esse proident exercitation aute labore commodo aliqua eiusmod ut tempor aliquip ut eiusmod in deserunt veniam elit voluptate in irure nisi dolore ut exercitation do labore reprehenderit dolore minim esse sint sit ut aliquip nulla in dolor cupidatat veniam exercitation ut nulla velit sint aliqua in laboris esse dolore quis minim adipisicing consectetur occaecat ut aliquip cillum fugiat tempor eiusmod aute nulla excepteur aliquip officia cupidatat irure commodo tempor ea duis adipisicing aliqua in proident consequat ut laborum est voluptate minim quis mollit ut pariatur magna aliquip incididunt velit ut consequat dolore voluptate incididunt exercitation eiusmod aliquip ullamco ut pariatur consequat exercitation cillum duis fugiat magna dolor in."
       
	},
	{
	 	name:"Joey's Fav",
	 	image:"https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&h=350",
	 	description:"Labore pariatur sunt minim sint tempor deserunt velit sit dolor id quis reprehenderit laboris enim fugiat exercitation nostrud in nisi reprehenderit ut in consequat aute aute dolor proident laborum dolor ut dolore amet in anim laboris commodo aliquip sit dolore aliquip officia enim dolor quis cillum do enim in id labore aute voluptate ut incididunt velit est labore cillum veniam amet quis eu dolor mollit eiusmod pariatur ea esse sed eiusmod cupidatat cupidatat enim laborum pariatur laborum cupidatat dolore duis id aliqua non laborum elit consequat veniam ea fugiat voluptate fugiat ea proident quis in sint in qui incididunt tempor in aliqua excepteur aliquip in aute incididunt do commodo incididunt excepteur nisi eiusmod aliqua eu magna sit nostrud in aliqua ullamco pariatur commodo consectetur culpa tempor quis mollit ut ullamco ad elit et ullamco deserunt sunt cillum aliquip irure ut dolore in id sit reprehenderit minim culpa quis consequat dolor eiusmod voluptate dolore nostrud adipisicing ullamco mollit exercitation incididunt cillum culpa nostrud do ut quis laboris fugiat ex sed ea tempor pariatur veniam qui amet cupidatat ut in magna in in aliqua minim sed enim qui nostrud exercitation consectetur do in officia sit in ea laborum dolore voluptate dolore sed laboris."
	},
	{
	 	name:"Canyon floor",
	 	image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
	 	description:"Elit enim sint eu mollit aliquip velit sit in in sint eiusmod officia nulla adipisicing pariatur exercitation quis reprehenderit deserunt excepteur commodo ut eiusmod proident in fugiat occaecat nisi non exercitation laborum in nisi mollit exercitation id velit non ea dolor eu aute occaecat ea cillum officia sit exercitation incididunt in deserunt in cupidatat eiusmod irure quis aute dolore minim magna do aliqua magna esse cupidatat sint ut elit laboris amet nulla labore laborum anim quis aliqua tempor eu ut consectetur occaecat sint consequat ex magna non voluptate commodo excepteur pariatur fugiat non dolor velit ut dolore fugiat velit voluptate do ea esse in velit consectetur occaecat mollit laboris veniam veniam aliquip dolor ut labore nisi esse nisi deserunt in do ut consectetur exercitation dolor do duis occaecat in cillum dolor adipisicing ullamco dolor dolore ex ex sint aliquip dolor dolor eiusmod dolore duis officia mollit velit in enim minim anim est tempor minim consectetur duis voluptate elit mollit aliquip sed enim ex culpa laboris et in sint exercitation enim dolor ut reprehenderit occaecat magna tempor incididunt occaecat officia non nostrud pariatur incididunt qui proident nisi ut esse ut culpa veniam ut in ullamco ex magna minim veniam et eiusmod velit commodo officia amet occaecat mollit proident incididunt id officia aliqua velit qui eu nisi in sint nostrud dolore eu eu aute ullamco exercitation non fugiat in sit ut ut magna proident in adipisicing magna sit."
	}
	]

function seedDB(){
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	console.log("removed Campground");
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err)
            }else {
                console.log("added a campground");
                //create a comment
                Comment.create(
                {
                    text:"This place is great but i wish there was internet",
                    author:"Homer"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a new comment")
                    }
                });
            }
        });
    }); 
    });
    //add a few campgrounds
    
}

module.exports=seedDB;