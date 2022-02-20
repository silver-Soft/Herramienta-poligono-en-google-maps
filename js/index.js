//var myPolygon;
function initialize() {
  // Map Center / Mi ubicacion, recibir JSON de coordenadas del dispositivo
  var lat=19.4722552
  var lon=-97.92357

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
    new google.maps.LatLng(19.47225,-97.9235), 
    new google.maps.LatLng(19.47221,-97.92354), 
    new google.maps.LatLng(19.47229,-97.92369), 
    new google.maps.LatLng(19.47233,-97.92365),
  ]; 

 /* var coordenadas = [{  }] //Para recibir JSON de coordenadas de todos los edificios de resctoria
  {
    Rectoria : [{
    auditorio: [item1, item2, ], 
    sistemas: [item1, item2,..], 
    alberca: [item1,item2,..]
  }]
};*/

  var triangleCoords1=[
    new google.maps.LatLng(19.47234,-97.92365),
    new google.maps.LatLng(19.47225,-97.9235), 
    new google.maps.LatLng(19.47235,-97.92352), 
  ]

  const polygon = new google.maps.Polygon({ paths: triangleCoords },{ paths: triangleCoords1 });
  //const polygon2 = new google.maps.Polygon({ paths: triangleCoords1 });

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
  myPolygon1 = new google.maps.Polygon({
    paths: triangleCoords1,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF3400',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF3400',
    fillOpacity: 0.35
  });
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

  myPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
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
function copyToClipboard(text) {
  window.prompt("Ctrl+C para copiar", text);
}

/*/Encointrar distancia de punto a poligono<<<<<<<<<<<<<<<<<<<----------------------------------------
function vlen(vector) { return Math.sqrt(vector[0]*vector[0] + vector[1] * vector[1]); 
} 
function vsub(v1, v2) { return [v1[0] - v2[0], v1[1] - v2[1]]; 
} 
function vscale(vector, factor) { 
  return [vector[0] * factor, vector[1] * factor]; 
}
 
function vnorm(v) { return [-v[1], v[0]]; 
} 
function distance_to_poly(point, poly) { 
  var dists = $.map(poly, function(p1, i) { 
    var prev = (i == 0 ? poly.length : i) - 
    1, p2 = poly[prev], 
    line = vsub(p2, p1); if (vlen(line) == 0) 
    return vlen(vsub(point, p1)); 
    var norm = vnorm(line), 
    x1 = point[0], x2 = norm[0], 
    x3 = p1[0], x4 = line[0], 
    y1 = point[1], y2 = norm[1], 
    y3 = p1[1], y4 = line[1], 

    j = (x3 - x1 - x2 * y3 / y2 + x2 * y1 / y2) / (x2 * y4 / y2 - x4), 
    i; 

    if (j < 0 || j > 1) 
      return Math.min( vlen(vsub(point, p1)), 
      vlen(vsub(point, p2))); 
      i = (y3 + j * y4 - y1) / y2; 
      return vlen(vscale(norm, i)); 
    }); 

    return Math.min.apply(null, dists); 
  }
*/