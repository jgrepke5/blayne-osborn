// Archived map key for voting location pins.
// Restore: copy this block into map.js (after marker setup) and link map-legend.css in index.html.
//
// Requires: votingTypeColors, votingTypeLabels (defined in map.js)

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
