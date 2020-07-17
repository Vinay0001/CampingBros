var numofsquares=6;
var colors=[];   
var pickedcolor;
var h1=document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colordisplay=document.getElementById("colordisplay");
var messagedisplay=document.querySelector("#message");
var resetbutton=document.querySelector("#reset");
var modebuttons=document.querySelectorAll(".mode");


init();
function init(){
	setupmodebuttons();
	setupsquares();
 	reset(); 
 }

function setupmodebuttons(){
for(var i=0;i<modebuttons.length;i++){
   modebuttons[i].addEventListener("click",function(){
	modebuttons[0].classList.remove("selected");
	modebuttons[1].classList.remove("selected");
	this.classList.add("selected");
	this.textContent=="Easy" ? numofsquares=3 :numofsquares=6;
	reset();
	});
};
}
function setupsquares(){
for(var i=0;i<squares.length;i++) {
 
 	//add clickListener to squares
 	squares[i].addEventListener("click",function(){
 		var clickedcolor=this.style.background;
 	//compare clicked color to picked color

 	if(clickedcolor===pickedcolor){
 		messagedisplay.textContent="Correct";
 		resetbutton.textContent="Play Again?";
 		changecolors(clickedcolor);
 		h1.style.background=clickedcolor;

 	}else{
 		this.style.backgroundColor="#232323";
 		messagedisplay.textContent="Try again";
 	}
 	});
}}

function reset(){
	//generate all new color
	colors=generaterandomcolors(numofsquares);
	//pick new colors from array
	pickedcolor=pickcolor();
	//change color display to match picked color
	colordisplay.textContent=pickedcolor;
	resetbutton.textContent="New Colors"
	messagedisplay.textContent="";
	//change color of squares
	for(var i=0;i<squares.length;i++){
		 if(colors[i]){
		 	squares[i].style.display="block";
		 	squares[i].style.background=colors[i];
		 } else{
		 	squares[i].style.display="none";
		 }
		squares[i].style.background=colors[i];
	}
	h1.style.background="steelblue";
}

resetbutton.addEventListener("click",function(){
	reset();
});

 
function changecolors(color){
 	//loop through all colors
 	for(var i=0;i<squares.length;i++){
 		//change each color to match the correct color
 		squares[i].style.background=color;
 	}
 }
function pickcolor(){
	var random=Math.floor(Math.random()*colors.length)
	return colors[random];
}
function generaterandomcolors(num){
	//make an array
	var arr=[]
	//repeat num times
	for(var i=0;i<num;i++){
		//get random color and push into arr
		arr.push(randomcolor());
	}
	//return that array
	return arr;
}
function randomcolor(){
	//pick a red from 0 to 255
	var r=Math.floor(	Math.random()*256);
	//pick a blue from 0 to 255
	var g=Math.floor(	Math.random()*256);
	//pick a green from 0 to 255
	var b=Math.floor(	Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";
}