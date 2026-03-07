// Initialize the map centered on Assembly District 39 (Lyon/Douglas Counties area)
const map = L.map('map').setView([39.1, -119.5], 9);

// Add OpenStreetMap tiles (street map style)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// District 39 style
const districtStyle = {
    color: '#9B2335',
    weight: 3,
    opacity: 1,
    fillColor: '#1B3A5C',
    fillOpacity: 0.3
};

// Add District 39 boundary from embedded GeoJSON
const districtLayer = L.geoJSON(district39GeoJSON, {
    style: districtStyle
}).addTo(map);

// Fit the map to the district bounds
map.fitBounds(districtLayer.getBounds(), { padding: [20, 20] });
