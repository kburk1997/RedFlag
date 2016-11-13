function request(message, tweet){
		var profane=false;
		var angry=false;
		var API_token='xxxxxxxxx';
		var data={'message': message};
		var url='https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
		//console.log(url);
		//run through API
		/*$.ajax({
			url: url,
			method: 'POST',
			data: data,
			headers:{
				'Ocp-Apim-Subscription-Key': API_token,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			success: function(data){
				console.log(data);
			}
		});*/

		//Call background.js

		


		if (message){

			/*chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			  console.log(tabs[0]);

			  chrome.tabs.executeScript(tabs[0].id, {
				    code: 'var data = ' + JSON.stringify(data)
				}, function() {
				    chrome.tabs.executeScript(tab.id, {file: 'background.js'});
				});

			});*/
			


			//Get profanity
			$.getJSON("https://raw.githubusercontent.com/ChaseFlorell/jQuery.ProfanityFilter/master/swearWords.json", function(json){
				//console.log(json);
				json.forEach(function(profanity){
					var str="/"+profanity+"/i";
					//console.log(message.search(profanity));
					if (message.search(profanity)!=-1){
						console.log("This tweet has a bad word!");
						if(!profane){

							//Construct HTML

							$(tweet).append("<p>This tweet might be harassment</p>");

							//Get tweet data
							var header=$($(tweet).children()[0]);
							console.log(header);
							console.log(header.children()[0]);
							var twitter_name="";


							var message_link="";

							var report_link="";

							//console.log($(tweet));

							//Check if a user was 
							var table="<a href=\"http://s.codepen.io/kburk97/debug/woGqPM\">Your Options</a>";
							$(tweet).append(table);


							profane=true;
						}						

					}
				});
			});

			
		}

		//Then check if directed at person

		//Do sentiment analysis here
		return profane;
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
		var profane =request(message, tweet);
		if (profane){
			console.log("PROFANE VERY PROFANE");
		}
		
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