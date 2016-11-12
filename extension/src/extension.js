

function process(element){

	var tweet=$(element).children().children()[1];
	var tweet_text_div=$(tweet).children()[1];
	var message_holder=$($(tweet_text_div).children()[0])[0];
	//console.log(message_holder);
	if(message_holder != null && message_holder!=undefined){
		var message=message_holder.innerText;
		console.log(message);
	}
	
}




/*ready('.stream', function (element) {
  process(element);
});*/

$(document).ready(function(){
	//console.log("You are on Twitter!");
	var stream=$(".stream-items");
	console.log(stream);
	console.log(stream.parent());
	var tweets=Array.from($(stream.children()));
	tweets.forEach(process);
	var config = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };
	var insertedNodes = [];
	var observer = new MutationObserver(function(mutations) {
	 mutations.forEach(function(mutation) {
	   for (var i = 0; i < mutation.addedNodes.length; i++)
	     insertedNodes.push(mutation.addedNodes[i]);
	 })
	});
	observer.observe(stream, config);
	console.log(insertedNodes);
});