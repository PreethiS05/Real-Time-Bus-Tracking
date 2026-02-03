const routes = {
  "Route 1": [
    { name: "Bus Stand", lat: 12.305, lng: 76.655 },
    { name: "University Circle", lat: 12.315, lng: 76.665 }
  ],
  "Route 2": [
    { name: "Mall Road", lat: 12.290, lng: 76.640 },
    { name: "Tech Park", lat: 12.300, lng: 76.650 }
  ]
};


function calculateETA(bus, stop) {
  const R = 6371; // km
  const dLat = (stop.lat - bus.lat) * Math.PI/180;
  const dLon = (stop.lng - bus.lng) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 +
            Math.cos(bus.lat * Math.PI/180) *
            Math.cos(stop.lat * Math.PI/180) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // km
  const speed = bus.speed || 20; // km/h fallback
  return Math.round((distance / speed) * 60); // minutes
}

markers[busId].bindPopup(
  `<b>${bus.busNumber}</b><br>
   Route: ${bus.route}<br>
   Status: ${bus.status}<br>
   Speed: ${bus.speed} km/h<br>
   ETA to next stop: ${calculateETA(bus, nearestStop)} min`
);
