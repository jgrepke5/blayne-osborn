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

const mailByName = {};
mailBallotDropoffLocations.forEach(function (location) {
    mailByName[location.name.trim().toLowerCase()] = location;
});

function normalizeDateLabel(date) {
    const short = date.match(/^(MON|TUES|WED|THUR|FRI|SAT|SUN)\s+(\d{1,2})\/(\d{1,2})$/i);
    if (short) {
        const names = {
            MON: 'Monday',
            TUES: 'Tuesday',
            WED: 'Wednesday',
            THUR: 'Thursday',
            FRI: 'Friday',
            SAT: 'Saturday',
            SUN: 'Sunday'
        };
        const months = [
            '', 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return names[short[1].toUpperCase()] + ' (' + months[+short[2]] + ' ' + short[3] + ')';
    }
    return date.replace(/\n/g, ' ');
}

function isClosedVoting(hours) {
    return /closed/i.test(hours);
}

function hasVotingOnDate(votingLocation, dateLabel) {
    if (votingLocation.type === 'election-day-only') {
        return false;
    }
    const norm = normalizeDateLabel(dateLabel);
    const entry = votingLocation.schedule.find(function (s) {
        return normalizeDateLabel(s.date) === norm;
    });
    return entry && !isClosedVoting(entry.hours);
}

function getSupplementalMailSchedule(votingLocation, mailLocation) {
    if (!mailLocation || !mailLocation.schedule.length) {
        return [];
    }
    return mailLocation.schedule.filter(function (entry) {
        if (/june 9/i.test(entry.date)) {
            return false;
        }
        if (votingLocation.type === 'election-day-only') {
            return true;
        }
        return !hasVotingOnDate(votingLocation, entry.date);
    });
}

function buildMailDropoffHtml(schedule) {
    if (!schedule.length) {
        return '';
    }
    let html = '<div class="voting-popup-section"><strong>Mail Ballot Dropoff</strong><ul class="voting-popup-hours">';
    schedule.forEach(function (entry) {
        html += '<li><span class="voting-popup-date">' + entry.date + '</span> ' + entry.hours + '</li>';
    });
    html += '</ul></div>';
    return html;
}

function createVotingIcon(type) {
    const color = votingTypeColors[type] || '#666666';
    return L.divIcon({
        className: 'voting-marker-wrapper',
        html: '<span class="voting-marker" style="background-color:' + color + '"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10]
    });
}

function createMailIcon() {
    return L.divIcon({
        className: 'mail-marker-wrapper',
        html: '<span class="mail-marker" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#B45309"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5 8 5 8-5z"/></svg></span>',
        iconSize: [17, 17],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8]
    });
}

function buildVotingPopup(location) {
    const typeLabel = votingTypeLabels[location.type] || 'Voting Location';
    let hoursHtml = '';

    if (location.schedule && location.schedule.length > 0) {
        hoursHtml += '<div class="voting-popup-section"><strong>Early Voting Hours</strong><ul class="voting-popup-hours">';
        location.schedule.forEach(function (entry) {
            hoursHtml += '<li><span class="voting-popup-date">' + entry.date + '</span> ' + entry.hours + '</li>';
        });
        hoursHtml += '</ul></div>';
    }

    if (location.electionDay) {
        hoursHtml += '<div class="voting-popup-section"><strong>Election Day (Tuesday, June 9)</strong>';
        hoursHtml += '<p class="voting-popup-election">' + location.electionDay + '</p></div>';
    }

    const mailLocation = mailByName[location.name.trim().toLowerCase()];
    const mailSchedule = getSupplementalMailSchedule(location, mailLocation);
    hoursHtml += buildMailDropoffHtml(mailSchedule);

    return (
        '<div class="voting-popup">' +
            '<h3 class="voting-popup-title">' + location.name + '</h3>' +
            '<p class="voting-popup-type">' + typeLabel + '</p>' +
            '<p class="voting-popup-address">' + location.address + '</p>' +
            hoursHtml +
        '</div>'
    );
}

function buildMailOnlyPopup(location) {
    return (
        '<div class="voting-popup">' +
            '<h3 class="voting-popup-title">' + location.name + '</h3>' +
            '<p class="voting-popup-type">Mail Ballot Dropoff</p>' +
            '<p class="voting-popup-address">' + location.address + '</p>' +
            buildMailDropoffHtml(location.schedule) +
        '</div>'
    );
}

// Spread markers that overlap on screen so nearby locations stay visible
const OVERLAP_THRESHOLD_PX = 22;
const SPREAD_RADIUS_PX = 15;
const votingMarkers = [];
const mailMarkers = [];
const allMarkerEntries = [];

function spreadOverlappingMarkers() {
    const entries = allMarkerEntries.map(function (entry) {
        const point = map.latLngToContainerPoint([entry.location.lat, entry.location.lng]);
        return { entry: entry, point: point, x: point.x, y: point.y };
    });

    const assigned = new Array(entries.length).fill(false);

    entries.forEach(function (_, startIdx) {
        if (assigned[startIdx]) {
            return;
        }

        const cluster = [startIdx];
        assigned[startIdx] = true;

        let queue = [startIdx];
        while (queue.length > 0) {
            const current = queue.shift();
            entries.forEach(function (other, otherIdx) {
                if (assigned[otherIdx]) {
                    return;
                }
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

function addMarkerEntry(marker, location) {
    const entry = { marker: marker, location: location };
    allMarkerEntries.push(entry);
    return entry;
}

const popupMaxWidth = window.matchMedia('(max-width: 768px)').matches ? 224 : 320;

// Add voting location markers
votingLocations.forEach(function (location) {
    const marker = L.marker([location.lat, location.lng], {
        icon: createVotingIcon(location.type)
    }).addTo(map);

    marker.bindPopup(buildVotingPopup(location), { maxWidth: popupMaxWidth });
    votingMarkers.push(addMarkerEntry(marker, location));
});

// Add mail-ballot dropoff-only markers (envelope icon)
mailBallotDropoffLocations.forEach(function (location) {
    if (!location.isNew || location.lat == null || location.lng == null) {
        return;
    }

    const marker = L.marker([location.lat, location.lng], {
        icon: createMailIcon()
    }).addTo(map);

    marker.bindPopup(buildMailOnlyPopup(location), { maxWidth: popupMaxWidth });
    mailMarkers.push(addMarkerEntry(marker, location));
});

map.on('zoomend moveend', spreadOverlappingMarkers);

// Map legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = '<strong class="map-legend-title">Map Key</strong>';
    Object.keys(votingTypeLabels).forEach(function (type) {
        div.innerHTML +=
            '<div class="map-legend-item">' +
                '<span class="map-legend-swatch" style="background-color:' + votingTypeColors[type] + '"></span>' +
                '<span>' + votingTypeLabels[type] + '</span>' +
            '</div>';
    });
    div.innerHTML +=
        '<div class="map-legend-item">' +
            '<span class="map-legend-swatch map-legend-mail">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8" height="8" fill="#B45309"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5 8 5 8-5z"/></svg>' +
            '</span>' +
            '<span>Mail Ballot Dropoff Only</span>' +
        '</div>';
    return div;
};
legend.addTo(map);

// Fit the map to show district and all locations
const bounds = districtLayer.getBounds();
allMarkerEntries.forEach(function (entry) {
    bounds.extend([entry.location.lat, entry.location.lng]);
});
map.fitBounds(bounds, { padding: [30, 30] });
map.once('moveend', spreadOverlappingMarkers);
