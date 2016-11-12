function process(element){

	var tweet=$(element).children().children()[1];
	console.log(tweet);
}


/*ready('.stream', function (element) {
  process(element);
});*/

$(document).ready(function(){
	console.log("You are on Twitter!");
	var stream=$(".stream-items");
	console.log(stream);
	var tweets=Array.from(stream.children())
	tweets.forEach(process);

});