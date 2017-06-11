//Google Maps
var mlat = 0;
var mlon = 0;

function initMap() {
    var location = {
        lat: mlat,
        lng: mlon
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.map,
        zoom: 4,
        center: location,
        disableDefaultUI: true
    });
    var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: location,
    });
    marker.addListener('click', function toggleBounce() {
        marker.getAnimation() !== null ? marker.setAnimation(null) : marker.setAnimation(google.maps.Animation.BOUNCE);
    });
}

function SetLocale(data) {
    mlat = data.results[0].geometry.location.lat;
    mlon = data.results[0].geometry.location.lng;
    initMap();
}

function GetGeoData() {
    var uri = "https://maps.googleapis.com/maps/api/geocode/json?&address=";
    var locale = $("#location").val();
    uri = uri + locale;
    $.ajax({
        url: uri,
        dataType: 'json',
        type: 'get',
        success: SetLocale
    })
}

$(document).ready(function () {
    $("#locate").click(GetGeoData);
});
