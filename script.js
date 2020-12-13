
$("#Search-Btn").on("click", function() {

var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
var cityName = $("#search").val()
var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        //city name
        $("#city-title").text(response.name)
        //date
        var date=new Date();
        var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		$("#today-date").text(val);
        //weather icon
        //temp
        //humidity
        //wind speed
        //UV index where number has background color depending on how bad/good it is
        console.log(cityName)
        console.log(response.name);
    })

})