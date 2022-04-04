//var myPolygon;
function initialize() {
    // Map Center / Mi ubicacion, recibir JSON de coordenadas del dispositivo
    var lat=19.47227
    var lon=-97.92351
  
    alert("la distancia es de: "+getDistancia(19.299060, -98.241967,19.307522, -98.240744)+" metros");
    var myLatLng = new google.maps.LatLng(lat,lon);
    // Opciones generales
    var mapOptions = {
      zoom: 30,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.RoadMap
    };
  
    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

    var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));
        
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat,lon), 
    map: map,
    icon: pinImage,
    shadow: pinShadow
  });
  
  getDistancia = function (lat1,lon1,lat2,lon2)
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
}