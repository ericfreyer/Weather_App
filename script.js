
$("#Search-Btn").on("click", function() {

var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
var cityName = $("#search").val()
var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)

//ajax call
$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
    console.log(response)
    //city name
    $("#city-title").text(response.name);




    //date
    var date=new Date();
    var val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
    $("#today-date").text(val);
    





    //sun
    if((response.weather[0].id) === 800){
        $("#icon").attr("src", "assets/sun.png")
    //cloudy
    }else if ((response.weather[0].id) === 801 || 802 || 803){
        $("#icon").attr("src", "assets/cloudy.png")
    //cloud
    }else if ((response.weather[0].id) === 804){
        $("#icon").attr("src", "assets/cloud.png")
    //snowing
    }else if ((response.weather[0].id) === 600 || 601 || 602 || 611 || 612 || 613 || 615 || 616 || 620 || 621 || 622){
        $("#icon").attr("src", "assets/snowing.png")
    //rain
    }else if ((response.weather[0].id) === 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321 || 500 || 501 || 502 || 503 || 504 || 511 || 520 || 521 || 522 || 531){
        $("#icon").attr("src", "assets/rain.png")
    //wind
    }else if ((response.wind.speed) > 24){
        $("#icon").attr("src", "assets/wind.png")
    //thunderstorm
    }else if ((response.weather[0].id) === 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232){
        $("#icon").attr("src", "assets/storm.png")
    }else if ((response.weather[0].id) === 701 || 711 || 721 || 741){
        $("#icon").attr("src", "assets/haze.png")
    }
    
    




    //temp
    var fahrenheit = (((((response.main.temp) - 273.15) * 9) / 5) + 32).toFixed(2);
    $("#temp").text("Temperature: " + (fahrenheit) + "°F");
    //humidity
    $("#humidity").text("Humidity: " + (response.main.humidity) + "%");
    //wind speed
    $("#wind-speed").text("Wind-speed: " + (response.wind.speed) + " MPH");
  
        var queryUV = ("http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid="+ apiKey);

        $.ajax({
        url: queryUV,
        method: "GET"
        }).then(function(data) {

        $("#uv-index").text("UV Index: " + data.value);
        if(data.value < 2){
            $("#uv-index").attr("class", "uv-good")
        }else if(data.value > 2 < 8){
            $("#uv-index").attr("class", "uv-moderate")
        }else $("#uv-index").attr("class", "uv-bad")
        })
        
    })   
        //five day
        var queryFive = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey)
        $.ajax({
            url: queryFive,
            method: "GET"
        }).then(function(day){
                //console.log(day)
                var fahrenheitOne = (((((day.list[1].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
                var fahrenheitTwo = (((((day.list[9].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
                var fahrenheitThree = (((((day.list[17].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
                var fahrenheitFour = (((((day.list[25].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
                var fahrenheitFive = (((((day.list[33].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            $("#forecast").show();
            $("#footer").show();
            //day1
            $("#day1-date").text(day.list[1].dt_txt)
            //still need icon
            $("#day1-temp").text("Temp: " + fahrenheitOne + " °F")
            $("#day1-humidity").text("Humidity: " + day.list[1].main.humidity + "%")
            //day2
            $("#day2-date").text(day.list[9].dt_txt)
            //still need icon
            $("#day2-temp").text("Temp: " + fahrenheitTwo + " °F")
            $("#day2-humidity").text("Humidity: " + day.list[9].main.humidity + "%")
            //day 3
            $("#day3-date").text(day.list[17].dt_txt)
            //still need icon
            $("#day3-temp").text("Temp: " + fahrenheitThree + " °F")
            $("#day3-humidity").text("Humidity: " + day.list[17].main.humidity + "%")
            //day4
            $("#day4-date").text(day.list[25].dt_txt)
            //still need icon
            $("#day4-temp").text("Temp: " + fahrenheitFour + " °F")
            $("#day4-humidity").text("Humidity: " + day.list[25].main.humidity + "%")
            //day5
            $("#day5-date").text(day.list[33].dt_txt)
            //still need icon
            $("#day5-temp").text("Temp: " + fahrenheitFive + " °F")
            $("#day5-humidity").text("Humidity: " + day.list[33].main.humidity + "%")


        })
      

   
  //$("#forecast").text("5 Day Forecast:");

  

     

})