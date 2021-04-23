var menu_text = "<MENU><BREAKFAST><APPETIZER><NAME>Fruit Bowl</NAME><PRICE>10.90</PRICE></APPETIZER><SALAD><NAME>Caeser SALAD</NAME><PRICE>3.90</PRICE></SALAD><SOUP><NAME>Chicken Noodle</NAME><PRICE>5.90</PRICE></SOUP><ENTREE><NAME>Omelet</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Scrambled Eggs</NAME><PRICE>20.90</PRICE></ENTREE><DESSERT><NAME>Apple Pie</NAME><PRICE>7.90</PRICE></DESSERT></BREAKFAST><BRUNCH><APPETIZER><NAME>Fruit Bowl</NAME><PRICE>10.90</PRICE></APPETIZER><APPETIZER><NAME>EggPlant Frits</NAME><PRICE>10.90</PRICE></APPETIZER><SALAD><NAME>House Salad</NAME><PRICE>3.90</PRICE></SALAD><SOUP><NAME>Chicken Noodle</NAME><PRICE>5.90</PRICE></SOUP><ENTREE><NAME>French Toast</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Omelet</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Scrambled Eggs</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Hamburg</NAME><PRICE>20.90</PRICE></ENTREE><DESSERT><NAME>Apple Pie</NAME><PRICE>7.90</PRICE></DESSERT></BRUNCH><LUNCH><APPETIZER><NAME>Calamari</NAME><PRICE>10.90</PRICE></APPETIZER><SALAD>Caeser Salad<PRICE>3.90</PRICE></SALAD><SALAD><NAME>Arugula Salad</NAME><PRICE>3.90</PRICE></SALAD><SOUP><NAME>Chicken Noodle</NAME><PRICE>5.90</PRICE></SOUP><SOUP><NAME>Italian Wedding Soup</NAME><PRICE>5.90</PRICE></SOUP><ENTREE><NAME>Steak</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Hamburg</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Angel Hair Pasta</NAME><PRICE>20.90</PRICE></ENTREE><DESSERT><NAME>Tiramisu</NAME><PRICE>7.90</PRICE></DESSERT></LUNCH><DINNER><APPETIZER><NAME>Calamari</NAME><PRICE>10.90</PRICE></APPETIZER><APPETIZER><NAME>EggPlant Frits</NAME><PRICE>10.90</PRICE></APPETIZER><SALAD>House Salad<PRICE>3.90</PRICE></SALAD><SALAD><NAME>Caeser Salad</NAME><PRICE>3.90</PRICE></SALAD><SOUP>Chicken Noodle<PRICE>5.90</PRICE></SOUP><SOUP><NAME>Italian Wedding Soup</NAME><PRICE>5.90</PRICE></SOUP><SOUP><NAME>Roasted Patato</NAME><PRICE>5.90</PRICE></SOUP><ENTREE><NAME>Steak</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Hamburg</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Angel Hair Pasta</NAME><PRICE>20.90</PRICE></ENTREE><ENTREE><NAME>Roasted Duck</NAME><PRICE>20.90</PRICE></ENTREE><DESSERT><NAME>Apple Pie</NAME><PRICE>7.90</PRICE></DESSERT><DESSERT><NAME>Tiramisu</NAME><PRICE>7.90</PRICE></DESSERT><DESSERT><NAME>Creme Brule</NAME><PRICE>7.90</PRICE></DESSERT></DINNER><DRINKS><BEER><NAME>Bud Weiser</NAME><PRICE>5.90</PRICE></BEER><BEER><NAME>Hefe Weissbier</NAME><PRICE>6.90</PRICE></BEER><WINE><NAME>Cabernet Sauvignon</NAME><FROM>Napa Valley</FROM><PRICE>15.90</PRICE></WINE><WINE><NAME>Margaux</NAME><PRICE>50.90</PRICE></WINE><WINE><NAME>Pinot Noir</NAME><FROM>Napa Valley</FROM><PRICE>12.90</PRICE></WINE><WINE><NAME>Chianti</NAME><PRICE>10.90</PRICE></WINE><COFFEE><NAME>Star Bucks</NAME><PRICE>3.90</PRICE></COFFEE><SODA>Coca Cola<PRICE>3.90</PRICE></SODA><SODA>Sprite<PRICE>3.90</PRICE></SODA></DRINKS></MENU>"

var menu_xml;

function init() {
  var parser = new DOMParser();
  menu_xml = parser.parseFromString(menu_text,"text/xml");
}

function onMenu() {
  var menu = document.getElementById("food-menu");
  if(menu.classList.contains("show")) {
    menu.classList.remove("show");
  }
  else {
    menu.classList.add("show");
  }
}

// print breakfast menu
function onBreakfast() {
  if(menu_xml.evaluate){
    menuAssembler("BREAKFAST");
  }
}

// print brunch menu
function onBrunch() {
  if(menu_xml.evaluate){
    menuAssembler("BRUNCH");
  }
}

// print lunch menu
function onLunch() {
  if(menu_xml.evaluate){
    menuAssembler("LUNCH");
  }
}

// print dinner menu
function onDinner() {
  if(menu_xml.evaluate){
    menuAssembler("DINNER");
  }
}

// print drink menu
function onDrink() {
  if(menu_xml.evaluate){
    menuAssembler("DRINKS");
  }
}

// create the specified menu
function menuAssembler(subMenu) {
  //get item type
  var path = "//" + subMenu + "/*";
  var nodes =  menu_xml.evaluate(path, menu_xml, null, XPathResult.ANY_TYPE, null);
  var result = nodes.iterateNext();
  var types = [];
  while(result) {
    if(types.indexOf(result.tagName) == -1)
      types.push(result.tagName);
    result = nodes.iterateNext();
  }
  // print menu
  var menu = document.getElementById("menu-content");
  var text = "<h1><center>" + subMenu + "</center></h1>";
  for(var i=0; i<types.length; i++) {
    text += "<h3>" + types[i] + "</h3>";
    //get item type nodes
    path = "//" + subMenu + "/" + types[i];
    nodes = menu_xml.evaluate(path, menu_xml, null, XPathResult.ANY_TYPE, null);
    result = nodes.iterateNext();

    while(result) {
      text += "<div><p>";

      console.log(result.tagName);
      console.log(result.childElementCount);
      // deal with irregular xml and extra data not in most sub trees
      for(var j = 0; j<result.childNodes.length; j++) {
        var seek = result.childNodes[j];
        while(seek.hasChildNodes()) {
          seek = seek.childNodes[0];
        }
        if(seek.parentNode.tagName == "FROM"){
          text += ", " + seek.nodeValue;
        }
        else {
          if(seek.parentNode.tagName == "PRICE"){
            text += "<span>$" + seek.nodeValue + "</span>";
          }
          else {
            text += seek.nodeValue;
          }
        }
      }
      text += "</p></div>";
      result = nodes.iterateNext();

    }
  }
  menu.innerHTML = text;
}
