
$("#Search-Btn").on("click", function() {

var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
var cityName = $("#search").val()
var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
//ajax call
$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
    //city name
    $("#city-title").text(response.name);
    //date
    var date=new Date();
    var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	$("#today-date").text(val);
    //weather icon STILL NEED TO DO and UV index color
    //temp
    var main = (response.main);
    $("#temp").text("Temperature: " + (main.temp));
    //humidity
    $("#humidity").text("Humidity: " + (main.humidity));
    //wind speed
    $("#wind-speed").text("Wind-speed: " + (response.wind.speed));
  
        var queryUV = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid="+ apiKey);

        $.ajax({
        url: queryUV,
        method: "GET"
        }).then(function(data) {

        $("#uv-index").text("UV Index: " + data.value);
        })

        var queryFive = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey)
        $.ajax({
            url: queryFive,
            method: "GET"
        }).then(function(day){
        console.log(day)
        })
      

    })
  //$("#forecast").text("5 Day Forecast:");

  

     

})