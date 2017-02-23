function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: { lat: 32.6635, lng: -79.9188 },
        mapTypeId: "terrain"
    });
    var flightPlanCoordinates = [
      { lat: 32.6645, lng: -79.9156 },
      { lat: 32.6638, lng: -79.9175 },
      { lat: 32.6634, lng: -79.9180 },
      { lat: 32.6632, lng: -79.9185 },

      { lat: 32.6635, lng: -79.9177 },
      { lat: 32.6636, lng: -79.9174 },
      { lat: 32.6639, lng: -79.9165 },
      { lat: 32.6646, lng: -79.9156 }


    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}