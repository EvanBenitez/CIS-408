
function search() {
  var parsed_query;
  var search_type = document.querySelector('input[name="type"]:checked').value;
  var search = document.getElementById("search").value;
  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      parsed_query = this.responseText;
      console.log(parsed_query);
      parsed_query = JSON.parse(parsed_query);
      print_results(parsed_query);
    }
  };
  php.open("Get", "search.php?search="+search+"&type="+search_type, true);
  php.send();

}

function print_results(query) {
  var results = document.getElementById("results");
  var table = "<table class='data'>";

  results.style.marginTop = "50px";
  if(query.CD.length > 0){
    table += "<tr><th>Title</th><th>Artist</th><th>Country</th><th>Company</th><th>Price</th><th>Year</th></tr>";
    console.log(query.CD.length);
    for(var i=0; i<query.CD.length; i++){
      var cd = query.CD[i];
      table +="<tr><td>" + cd.TITLE + "</td><td>" + cd.ARTIST + "</td><td>" + cd.COUNTRY + "</td><td>" +
            cd.COMPANY + "</td><td>" + cd.PRICE + "</td><td>" + cd.YEAR + "</td></tr>";
    }
    table += "</table>";

    results.innerHTML = table;
  }
  else {
    results.innerHTML ="<h3>No results found</h4>";
  }
  results.classList.add("data");
}
