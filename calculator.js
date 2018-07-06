var keys = document.querySelectorAll('#calculator span');
var screen = document.querySelector('.screen');

var element = keys[0];
element.onclick = function(arg){
	console.log(this.innerHTML);
}