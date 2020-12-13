
$("#Search-Btn").on("click", function() {

var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
var cityName = $("#search").val()
var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        $("#city-title").text(cityName)
        //date showing in european way, figure out have to make month first than day, not other way around
        var date=new Date();
        var val=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        $("#today-date").text(val);
        
        console.log(cityName)
        console.log(response.main);
    })

})