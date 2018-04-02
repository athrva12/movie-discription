var listTemplate = document.getElementById("list_template").innerHTML,
	detailsTemplate = document.getElementById("details_template").innerHTML,
	searchText = document.getElementById("search_text"),
	listDiv = document.getElementById("list"),
	detailsDiv = document.getElementById("details"),
	searchBtn = document.getElementById("search_button");

searchBtn.addEventListener("click", function() {
	var title = searchText.value;
	console.log("http://www.omdbapi.com/apikey=5dddf6a7&r=xml&s=" + title);
	$.get("http://www.omdbapi.com/apikey=5dddf6a7&r=xml&t=" + title, null, null, "json")
		.done(onSearchResult)
		.fail(onSearchFail);
});

function onSearchResult(data) {
	var html = Mustache.render(listTemplate, data);
	listDiv.innerHTML = html;

	var items = listDiv.getElementsByTagName("a");
	for(var i = 0; i < items.length; i++) {
		var item = items[i];
		item.addEventListener("click", getDetails);
	}
}

function onSearchFail() {
	alert("There was a problem contacting the server. Please try again.lol");
}

function getDetails(event) {
	var id = event.target.id;
	$.get("http://www.omdbapi.com/?plot=full&i=" + id, null, null, "json")
		.done(onDetailsResult)
		.fail(onSearchFail);
}

function onDetailsResult(data) {
	var html = Mustache.render(detailsTemplate, data);
	detailsDiv.innerHTML = html;
}
