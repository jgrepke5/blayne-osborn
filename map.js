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

// Voting location pin colors by type
const votingTypeColors = {
    'early-only': '#1B3A5C',
    'early-and-election': '#9B2335',
    'election-day-only': '#2E7D4E'
};

const votingTypeLabels = {
    'early-only': 'Early Voting Only',
    'early-and-election': 'Early Voting & Election Day',
    'election-day-only': 'Election Day Only'
};

function createVotingIcon(type) {
    const color = votingTypeColors[type] || '#666666';
    return L.divIcon({
        className: 'voting-marker-wrapper',
        html: `<span class="voting-marker" style="background-color:${color}"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10]
    });
}

function buildVotingPopup(location) {
    const typeLabel = votingTypeLabels[location.type] || 'Voting Location';
    let hoursHtml = '';

    if (location.schedule && location.schedule.length > 0) {
        hoursHtml += '<div class="voting-popup-section"><strong>Early Voting Hours</strong><ul class="voting-popup-hours">';
        location.schedule.forEach(function (entry) {
            hoursHtml += `<li><span class="voting-popup-date">${entry.date}</span> ${entry.hours}</li>`;
        });
        hoursHtml += '</ul></div>';
    }

    if (location.electionDay) {
        hoursHtml += '<div class="voting-popup-section"><strong>Election Day (Tuesday, June 9)</strong>';
        hoursHtml += `<p class="voting-popup-election">${location.electionDay}</p></div>`;
    }

    return `
        <div class="voting-popup">
            <h3 class="voting-popup-title">${location.name}</h3>
            <p class="voting-popup-type">${typeLabel}</p>
            <p class="voting-popup-address">${location.address}</p>
            ${hoursHtml}
        </div>
    `;
}

// Spread markers that overlap on screen so nearby locations stay visible
const OVERLAP_THRESHOLD_PX = 22;
const SPREAD_RADIUS_PX = 15;

function spreadOverlappingMarkers() {
    const entries = votingMarkers.map(function (entry) {
        const point = map.latLngToContainerPoint([entry.location.lat, entry.location.lng]);
        return { entry: entry, point: point, x: point.x, y: point.y };
    });

    const assigned = new Array(entries.length).fill(false);

    entries.forEach(function (_, startIdx) {
        if (assigned[startIdx]) return;

        const cluster = [startIdx];
        assigned[startIdx] = true;

        let queue = [startIdx];
        while (queue.length > 0) {
            const current = queue.shift();
            entries.forEach(function (other, otherIdx) {
                if (assigned[otherIdx]) return;
                const dx = entries[current].x - other.x;
                const dy = entries[current].y - other.y;
                if (Math.sqrt(dx * dx + dy * dy) < OVERLAP_THRESHOLD_PX) {
                    assigned[otherIdx] = true;
                    cluster.push(otherIdx);
                    queue.push(otherIdx);
                }
            });
        }

        if (cluster.length === 1) {
            const item = entries[cluster[0]];
            item.entry.marker.setLatLng([item.entry.location.lat, item.entry.location.lng]);
            return;
        }

        let centerX = 0;
        let centerY = 0;
        cluster.forEach(function (idx) {
            centerX += entries[idx].x;
            centerY += entries[idx].y;
        });
        centerX /= cluster.length;
        centerY /= cluster.length;

        cluster.forEach(function (idx, position) {
            const angle = (2 * Math.PI * position) / cluster.length;
            const displayPoint = L.point(
                centerX + SPREAD_RADIUS_PX * Math.cos(angle),
                centerY + SPREAD_RADIUS_PX * Math.sin(angle)
            );
            entries[idx].entry.marker.setLatLng(map.containerPointToLatLng(displayPoint));
        });
    });
}

// Add voting location markers
const votingMarkers = [];
votingLocations.forEach(function (location) {
    const marker = L.marker([location.lat, location.lng], {
        icon: createVotingIcon(location.type)
    }).addTo(map);

    const popupMaxWidth = window.matchMedia('(max-width: 768px)').matches ? 224 : 320;
    marker.bindPopup(buildVotingPopup(location), { maxWidth: popupMaxWidth });
    votingMarkers.push({ marker: marker, location: location });
});

map.on('zoomend moveend', spreadOverlappingMarkers);

// Map legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = '<strong class="map-legend-title">Voting Locations</strong>';
    Object.keys(votingTypeLabels).forEach(function (type) {
        div.innerHTML += `
            <div class="map-legend-item">
                <span class="map-legend-swatch" style="background-color:${votingTypeColors[type]}"></span>
                <span>${votingTypeLabels[type]}</span>
            </div>
        `;
    });
    return div;
};
legend.addTo(map);

// Fit the map to show district and all voting locations
const bounds = districtLayer.getBounds();
votingMarkers.forEach(function (entry) {
    bounds.extend([entry.location.lat, entry.location.lng]);
});
map.fitBounds(bounds, { padding: [30, 30] });
map.once('moveend', spreadOverlappingMarkers);

