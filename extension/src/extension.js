function request(message){
		var profane=false;
		var angry=false;
		var API_token='xxxxxxxxxxxxxxxxxxx';
		var data={"message": message};
		var url='https://partner.bark.us/api/v1/messages';
		//console.log(url);
		//run through API
		/*$.ajax({
			url: url,
			method: 'POST',
			data: data,
			headers:{
				'Content-Type':'application/json; charset=utf-8',
				'X-Token-Auth': API_token
			},
			success: function(data){
				console.log(data);
			}
		});*/
		if (message){
			//Get profanity
			$.getJSON("https://raw.githubusercontent.com/ChaseFlorell/jQuery.ProfanityFilter/master/swearWords.json", function(json){
				//console.log(json);
				json.forEach(function(profanity){
					var str="/"+profanity+"/i";
					//console.log(message.search(profanity));
					if (message.search(profanity)!=-1){
						console.log("This tweet has a bad word!");
						profane=true;
					}
				});
			});
		}

		//Do sentiment analysis here
		
}

function process(element){

	var tweet=$(element).children().children()[1];
	var tweet_text_div=$(tweet).children()[1];
	var message_holder=$($(tweet_text_div).children()[0])[0];
	//console.log(message_holder);
	if(message_holder != null && message_holder!=undefined){
		var message=message_holder.innerText;
		//console.log(message);
		//Replace this token with the actual token
		request(message);

	}
	
}




/*ready('.stream', function (element) {
  process(element);
});*/

$(document).ready(function(){

	var timeout=setTimeout(request, 300);
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
	//var insertedNodes = [];
	var observer = new MutationObserver(function(mutations) {
	 mutations.forEach(function(mutation) {
	   for (var i = 0; i < mutation.addedNodes.length; i++){
	     //insertedNodes.push(mutation.addedNodes[i]);
	     process(mutation.addedNodes[i]);
	   }
	 })
	});
	observer.observe(stream.get(0), config);

	//console.log(insertedNodes);
});