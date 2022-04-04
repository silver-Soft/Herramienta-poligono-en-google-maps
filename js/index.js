//var myPolygon;
function initialize() {
  // Map Center / Mi ubicacion, recibir JSON de coordenadas del dispositivo
  //var lat=19.47227
  //var lon=-97.92351
  var lat=19.30074;
  var lon=-98.2428;
  var x = document.getElementById("distancia");  
  
  var myLatLng = new google.maps.LatLng(lat,lon);
  // Opciones generales
  var mapOptions = {
    zoom: 30,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  // Coordenadas de mi polígono
  var triangleCoords = [
    new google.maps.LatLng(19.30387,-98.24124),
    new google.maps.LatLng(19.30306,-98.24234), 
    new google.maps.LatLng(19.30247,-98.24357), 
    new google.maps.LatLng(19.30211,-98.2444), 
    new google.maps.LatLng(19.30023,-98.2439), 
    new google.maps.LatLng(19.29977,-98.24391),
    new google.maps.LatLng(19.29905,-98.24396), 
    new google.maps.LatLng(19.29885,-98.24154), 
    //new google.maps.LatLng(19.30387,-98.24124), 
    
    /*new google.maps.LatLng(19.47225,-97.9235), 
    new google.maps.LatLng(19.47221,-97.92354), 
    new google.maps.LatLng(19.47229,-97.92369), 
    new google.maps.LatLng(19.47233,-97.92365)*/
  ]; 

  var triangleCoords2 = [
    new google.maps.LatLng(19.47215,-97.92358), 
    new google.maps.LatLng(19.4722,-97.92355), 
    new google.maps.LatLng(19.47228,-97.9237), 
    new google.maps.LatLng(19.47222,-97.92373),
  ]; 

 var coordenadas = [ ] //Para recibir JSON de coordenadas de todos los edificios de resctoria
  

  const polygon = new google.maps.Polygon({ paths: triangleCoords});
  const polygon2 = new google.maps.Polygon({ paths: triangleCoords2 });

  var pinColor = "FE7569";
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34));
  var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
      new google.maps.Size(40, 37),
      new google.maps.Point(0, 0),
      new google.maps.Point(12, 35));
      
      //distance_to_poly(myLatLng,polygon)

      //Determina si el punto de ubicacion se encuentra dentro del poligono
  if (google.maps.geometry.poly.containsLocation(myLatLng, polygon, true)) {
    alert("Si esta dentro");
} else {
    alert("No esta dentro");

}
var marker = new google.maps.Marker({
  position: new google.maps.LatLng(lat,lon), 
  map: map,
  icon: pinImage,
  shadow: pinShadow
});
  // Estilo y controles
  myPolygon = new google.maps.Polygon({
    paths: triangleCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF3400',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF3400',
    fillOpacity: 0.35
  });

  myPolygon2 = new google.maps.Polygon({
    paths: triangleCoords2,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF3400',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF3400',
    fillOpacity: 0.35
  });

  myPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);

  myPolygon2.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(myPolygon2.getPath(), "insert_at", getPolygonCoords2);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon2.getPath(), "set_at", getPolygonCoords2);
}



//Display Coordinates below map
function getPolygonCoords() {
  var len = myPolygon.getPath().getLength();
  var htmlStr = "";
  for (var i = 0; i < len; i++) {
    htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}

function getPolygonCoords2() {
  var len = myPolygon2.getPath().getLength();
  var htmlStr = "";
  for (var i = 0; i < len; i++) {
    htmlStr += "new google.maps.LatLng(" + myPolygon2.getPath().getAt(i).toUrlValue(5) + "), ";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}

function copyToClipboard(text) {
  window.prompt("Ctrl+C para copiar", text);
}
function medir(){
  alert("la distancia es de: "+getKilometros(19.47227,-97.92351,19.47223,-97.92344)+" metros");
}
getKilometros = function (lat1,lon1,lat2,lon2)
{
rad = function(x) {return x*Math.PI/180;}
var R = 6378.137; //Radio de la tierra en km
var dLat = rad( lat2 - lat1 );
var dLong = rad( lon2 - lon1 );
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
d=d*1000;
return d.toFixed(3); //Retorna tres decimales
}