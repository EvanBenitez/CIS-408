/*
var Business_Data = {"business_id": "5UmKMjUEUNdYWqANhGckJw", "full_address": "4734 Lebanon Church Rd\nDravosburg, PA 15034", "hours": {"Friday": {"close": "21:00", "open": "11:00"}, "Tuesday": {"close": "21:00", "open": "11:00"}, "Thursday": {"close": "21:00", "open": "11:00"}, "Wednesday": {"close": "21:00", "open": "11:00"}, "Monday": {"close": "21:00", "open": "11:00"}}, "open": true, "categories": ["Fast Food", "Restaurants"], "city": "Dravosburg", "review_count": 4, "name": "Mr Hoagie", "neighborhoods": [], "longitude": -79.9007057, "state": "PA", "stars": 4.5, "latitude": 40.3543266, "attributes": {"Take-out": true, "Drive-Thru": false, "Good For": {"dessert": false, "latenight": true, "lunch": true, "dinner": true, "brunch": true, "breakfast": true}, "Caters": false, "Noise Level": "average", "Takes Reservations": true, "Delivery": false, "Ambience": {"romantic": true, "intimate": false, "classy": false, "hipster": true, "divey": false, "touristy": false, "trendy": true, "upscale": false, "casual": true}, "Parking": {"garage": false, "street": true, "validated": false, "lot": true, "valet": false}, "Has TV": true, "Outdoor Seating": true, "Attire": "casual", "Alcohol": "none", "Waiter Service": true, "Accepts Credit Cards": true, "Good for Kids": true, "Good For Groups": true, "Price Range": 2}, "type": "business"}
*/
var Business_Data;
var http = new XMLHttpRequest();

http.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    console.log("In the ready");
    Business_Data = JSON.parse(this.responseText);
    init();
  }
};
http.open("GET","YelpOneBusinessJsonData.txt", true);
http.send();

function init() {
    // get name
    var node = document.getElementById("bName");
    node.innerHTML = "<h1 style='color: green;'>" + Business_Data.name + "</h1>";
    node.classList.add("hide");

    //get address
    node = document.getElementById("bAddress");
    var text = Business_Data.full_address.replace("\n", "<br />")
    node.innerHTML = "<h1 style='color: green;'>Address</h1>" +
                        "<h4>" + text + "</h4>";
    node.classList.add("hide");

    //get Hours
    node = document.getElementById("bHours");
    var hours = "";
    var x;
    hours = "<table><tr>"

      //this is necessary because the days are not in order
      if(x = "Sunday" in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x = "Monday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x = "Tuesday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x = "Wednesday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x = "Thursday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x = "Friday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }
      if((x == "Saturday") in Business_Data.hours) {
        hours += "<td>" + x  + "</td><td>" + get12HourTime(Business_Data.hours[x].open) + " - " + get12HourTime(Business_Data.hours[x].close) + "</td></tr>";
      }

    node.innerHTML = "<h1 style='color: red;'>Hours</h1>" + hours + "</table>";
    node.classList.add("hide");

    //get features
    var node1 = document.getElementById("attributes1");
    var node2 = document.getElementById("attributes2");
    var listFeatures1 = "<table><tr><td style='color: red; font-size: 34px; font-weight: bold;'>Services & Features</td><td></td><td></td></tr>";
    var listFeatures2 = "";
    var count1 = 0;
    for(feature in Business_Data.attributes) {
      if(Business_Data.attributes[feature]) {
        if(Business_Data.attributes[feature] == true){
          if(count1 == 0)
            listFeatures1 += "<tr>"
          listFeatures1 += "<td>-" + feature + "</td>";
          count1++;
          if(count1 == 3){
            listFeatures1 += "</tr>"
            count1 = 0;
          }
        }
        else {
          if(Business_Data.attributes[feature] instanceof Object) {
            //print header
            for(subFeature in Business_Data.attributes[feature]) {
              if(Business_Data.attributes[feature][subFeature]) {
                listFeatures2 += "<b style='font-size: 18px;'>" + feature + ": </b>";
                break;
              }
            }
            for(subFeature in Business_Data.attributes[feature]) {
              if(Business_Data.attributes[feature][subFeature]) {
                listFeatures2 += subFeature + ", ";
              }
            }
            //remove trailing comma
            if(listFeatures2.length > 0 && listFeatures2.substring(listFeatures2.length-2,listFeatures2.length-1) == ",")
              listFeatures2 = listFeatures2.slice(0,-2);
            listFeatures2 += "<br />";
          }
          else {
            if(count1 == 0)
              listFeatures1 += "<tr>"
            listFeatures1 += "<td>-" + feature + ": " + Business_Data.attributes[feature] + "</td>";
            count1++;
            if(count1 == 3){
              listFeatures1 += "</tr>"
              count1 = 0;
            }
          }
        }
      }
    }
    while(count1 != 3) {
      listFeatures1 += "<td></td>"
      count1++;
      if(count1 == 4){
        listFeatures1 += "</tr>"
        count1 = 0;
      }
    }
    listFeatures1 +="</table>";
    node1.innerHTML = listFeatures1;
    node2.innerHTML = listFeatures2;
    node1.classList.add("hide");
    node2.classList.add("hide");
}

function menuClick() {
  var menu = document.getElementById("menu");
  if(!menu.classList.contains("show")){
    menu.classList.add("show");
  }
  else {
    menu.classList.remove("show");
  }
}

function getName() {
  if(document.getElementById("bName").classList.contains("hide")){
    document.getElementById("bName").classList.remove("hide");
  }
  else {
    document.getElementById("bName").classList.add("hide");
  }

    console.log("in the getName");
}

function getAddress() {
  if(document.getElementById("bAddress").classList.contains("hide")){
    document.getElementById("bAddress").classList.remove("hide");
  }
  else {
    document.getElementById("bAddress").classList.add("hide");
  }

  console.log("in the getAddress");
}

function getHours() {
  if(document.getElementById("bHours").classList.contains("hide")){
    document.getElementById("bHours").classList.remove("hide");
  }
  else {
    document.getElementById("bHours").classList.add("hide");
  }

  console.log("in the getHours");
}

function getMenu() {
  console.log("in the getMenu");
}

function getServicesAndFeatures () {
  if(document.getElementById("attributes1").classList.contains("hide")){
    document.getElementById("attributes1").classList.remove("hide");
    document.getElementById("attributes2").classList.remove("hide");
  }
  else {
    document.getElementById("attributes1").classList.add("hide");
    document.getElementById("attributes2").classList.add("hide");
  }

  console.log("in the getServices");
}

function get12HourTime(time) {
  if(time.length == 5 && parseInt(time.substring(0,2)) <= 12) {
    return time + " am";
  }
  else {
    return "" + (parseInt(time.substring(0,2))-12) + time.substring(2) + " pm";
  }
}
