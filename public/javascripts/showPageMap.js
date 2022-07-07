mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 7,
    center: hotel.geometry.coordinates
});

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

new mapboxgl.Marker()
    .setLngLat(hotel.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${hotel.title}</h3><p>${hotel.location}</p>`
            )
    )
    .addTo(map);