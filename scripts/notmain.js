//Default values for Lat,Long,Flag,URL for JSON
var urll = "https://maps.googleapis.com/maps/api/geocode/json?&address=";
var vlat = -25.274398;
var vlng = 133.775136;
var imgsrc = 'https://restcountries.eu/data/aus.svg';
var cptl = 'Canberra';
var crncynm = 'Australian dollar';
var lngge = 'English';
var clk=0;
var yr = new Date().getFullYear();
$("#year").text(yr);
$(document).ready(function () {
    binddata();
    binddetails();
    initMap();
});
//Search() is called when there is a change in the value of the dropdown
$("#ddlcountry").change(search);
//Getting the json(latitude and longitude) based upon the value of the dropdown for initializing map
function search() {
    clk=clk+1;
    if(clk==1)
        {
            $("#mncntnt").css("left","750px");
        }
    $("#map").css("display", "block");
    $("#cpcrln").css("display", "block");
    $("#flgimg").css("display", "flex");
    var _adrs = $("#ddlcountry option:selected").text();
    var curl = urll + _adrs;
    var cd = $("#ddlcountry").val().toLowerCase();
    $.ajax({
        type: "GET"
        , url: 'https://restcountries.eu/rest/v2/alpha/' + cd + '?fields=capital;currencies;languages;flag'
        , dataType: "json"
        , success: function (data) {
            cptl = data.capital;
            crncynm = data.currencies[0].name;
            lngge = data.languages[0].name;
            imgsrc = data.flag;
            binddetails();
        }
    });
    $.ajax({
        type: "GET"
        , url: curl
        , dataType: "json"
        , success: function (data) {
            vlat = data.results[0].geometry.location.lat;
            vlng = data.results[0].geometry.location.lng;
            imgsrc = 'https://restcountries.eu/data/' + $("#ddlcountry").val().toLowerCase() + '.svg';
            initMap();
        }
    });
}
//Currency,Capital,Language
function binddetails() {
    $("#flag").attr("src", imgsrc);
    $("#capital").text(cptl);
    $("#currency").text(crncynm);
    $("#lngs").text(lngge);
}
// Countries dropdown bind
function binddata() {
    $("#flag").attr("src", imgsrc);
    var listItems = "<option disabled value selected></option>";
    $.ajax({
        type: "GET"
        , url: 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code'
        , dataType: "json"
        , success: function (data) {
            $(data).each(function (index, value) {
                listItems += "<option value='" + value.alpha3Code + "'>" + value.name + "</option>";
            });
            $("#ddlcountry").html(listItems);
        }
    });
}
//For Initializing map with marker
function initMap() {
    var latlng = {
        lat: vlat
        , lng: vlng
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4
        , center: latlng
    });
    var marker = new google.maps.Marker({
        position: latlng
        , map: map
    });
}
//Function for displaying flag : Flag in the background
//function dispflg() {
//     var imgsrc ='url(assets/data/' + $("#ddlcountry").val().toLowerCase()+'.svg) no-repeat';
//     $("body").css("background",imgsrc);
//     $("body").css("background-size","100vw 100vh");
// }