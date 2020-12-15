//do it all in one AJAX call with the second one!!!!!
//look into using https://github.com/datejs/Datejs for dates
$("#Search-Btn").on("click", function() {

    var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
    var cityName = $("#search").val()
    var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    
    //ajax call for current weather
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
        
    

        var queryFive = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=&appid=" + apiKey)
        $.ajax({
           url: queryFive,
          method: "GET"
        }).then(function(day){
            console.log(day)
           $("#forecast").show();
           $("#footer").show();
        
        //ICONS NOT WORKING SOMETHING TO DO WITH "ELSE IF" If it doesn't match first criteria it will just pick the second.
        //sun
        var dayOne = day.daily[0];
        if(dayOne.weather[0].id === 800){
            $("#icon").attr("src", "assets/sun.png")
        //cloudy
        }else if (dayOne.weather[0].id === 801 || dayOne.weather[0].id === 802 || dayOne.weather[0].id === 803){
            $("#icon").attr("src", "assets/cloudy.png")
        //cloud
        }else if (dayOne.weather[0].id === 804){
            $("#icon").attr("src", "assets/cloud.png")
        //snowing
        }else if (dayOne.weather[0].id === 600 || dayOne.weather[0].id === 601 || dayOne.weather[0].id === 602 || dayOne.weather[0].id === 611 || dayOne.weather[0].id === 612 || dayOne.weather[0].id === 613 || dayOne.weather[0].id === 615 || dayOne.weather[0].id === 616 || dayOne.weather[0].id === 620 || dayOne.weather[0].id === 621 || dayOne.weather[0].id === 622){
            $("#icon").attr("src", "assets/snowing.png")
        //rain
        }else if (dayOne.weather[0].id === 300 || dayOne.weather[0].id === 301 || dayOne.weather[0].id === 302 || dayOne.weather[0].id === 310 || dayOne.weather[0].id === 311 || dayOne.weather[0].id === 312 || dayOne.weather[0].id === 313 || dayOne.weather[0].id === 314 || dayOne.weather[0].id === 321 || dayOne.weather[0].id === 500 || dayOne.weather[0].id === 501 || dayOne.weather[0].id === 502 || dayOne.weather[0].id === 503 || dayOne.weather[0].id === 504 || dayOne.weather[0].id === 511 || dayOne.weather[0].id === 520 || dayOne.weather[0].id === 521 || dayOne.weather[0].id === 522 || dayOne.weather[0].id === 531){
            $("#icon").attr("src", "assets/rain.png")
        //wind
        //thunderstorm
        }else if (dayOne.weather[0].id === 200 || dayOne.weather[0].id === 201 || dayOne.weather[0].id === 202 || dayOne.weather[0].id === 210 || dayOne.weather[0].id === 211 || dayOne.weather[0].id === 212 || dayOne.weather[0].id === 221 || dayOne.weather[0].id === 230 || dayOne.weather[0].id === 231 || dayOne.weather[0].id === 232){
            $("#icon").attr("src", "assets/storm.png")
        }else if(dayOne.weather[0].id === 701 || dayOne.weather[0].id === 711 || dayOne.weather[0].id === 721 || dayOne.weather[0].id === 741){
            $("#icon").attr("src", "assets/haze.png")}

        


        //temp
        var fahrenheit = (((((dayOne.feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        $("#temp").text("Temperature: " + (fahrenheit) + "°F");
        //humidity
        $("#humidity").text("Humidity: " + (dayOne.humidity) + "%");
        //wind speed
        $("#wind-speed").text("Wind-speed: " + (dayOne.wind_speed) + " MPH");

        $("#uv-index").text("UV Index: " + dayOne.uvi);
        if(dayOne.uvi < 2){
            $("#uv-index").attr("class", "uv-good")
        }else if(dayOne.uvi > 2 < 8){
            $("#uv-index").attr("class", "uv-moderate")
        }else $("#uv-index").attr("class", "uv-bad")
            
        })   

    })

})









           //this is the one to use for the 5 - day
    //  var queryFive = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=&appid=" + apiKey)
    //          $.ajax({
    //             url: queryFive,
    //            method: "GET"
    //          }).then(function(day){
    //             $("#forecast").show();
    //             $("#footer").show();
    //                  //console.log(day)
    //                 var fahrenheitOne = (((((day.daily[1].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
    //                 var fahrenheitTwo = (((((day.daily[2].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
    //                 var fahrenheitThree = (((((day.daily[3].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
    //                 var fahrenheitFour = (((((day.daily[4].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
    //                 var fahrenheitFive = (((((day.daily[5].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);

    //                 $("#day1-temp").text("Temp: " + fahrenheitOne + " °F")
    //                 $("#day2-temp").text("Temp: " + fahrenheitTwo + " °F")
    //                 $("#day3-temp").text("Temp: " + fahrenheitThree + " °F")
    //                 $("#day4-temp").text("Temp: " + fahrenheitFour + " °F")
    //                 $("#day5-temp").text("Temp: " + fahrenheitFive + " °F")

    //                 $("#day1-humidity").text("Humidity: " + day.daily[1].humidity + "%")
    //                 $("#day2-humidity").text("Humidity: " + day.daily[2].humidity + "%")
    //                 $("#day3-humidity").text("Humidity: " + day.daily[3].humidity + "%")
    //                 $("#day4-humidity").text("Humidity: " + day.daily[4].humidity + "%")
    //                 $("#day5-humidity").text("Humidity: " + day.daily[5].humidity + "%")
    //          })
    
        
    
            //press ctrl + / to uncomment
            //AJAX for five day forecast MIGHT WANT TO USE DIFFERENT API TO GET THE ICONS FOR THER FIVE DAY> NEED A GENERAL ID FOR THE WHOLE DAY
            // var queryFive = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey)
            // $.ajax({
            //     url: queryFive,
            //     method: "GET"
            // }).then(function(day){
            //         console.log(day)
            //         var fahrenheitOne = (((((day.list[1].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            //         var fahrenheitTwo = (((((day.list[9].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            //         var fahrenheitThree = (((((day.list[17].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            //         var fahrenheitFour = (((((day.list[25].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            //         var fahrenheitFive = (((((day.list[33].main.feels_like) - 273.15) * 9) / 5) + 32).toFixed(2);
            //     $("#forecast").show();
            //     $("#footer").show();
            //     //day1
            //     $("#day1-date").text(day.list[1].dt_txt)
    
            //         if((day.list[1].weather[0].id) === 800){
            //             $("#day-icon1").attr("src", "assets/sun.png")
            //         //cloudy
            //         }else if (((day.list[1].weather[0].id) === 801 || 802 || 803)){
            //             $("#day-icon1").attr("src", "assets/cloudy.png")
            //         //cloud
            //         }else if (((day.list[1].weather[0].id) === 804)){
            //             $("#day-icon1").attr("src", "assets/cloud.png")
            //         //snowing
            //         }else if (((day.list[1].weather[0].id) === 600 || 601 || 602 || 611 || 612 || 613 || 615 || 616 || 620 || 621 || 622)){
            //             $("#day-icon1").attr("src", "assets/snowing.png")
            //         //rain
            //         }else if (((day.list[1].weather[0].id) === 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321 || 500 || 501 || 502 || 503 || 504 || 511 || 520 || 521 || 522 || 531)){
            //             $("#day-icon1").attr("src", "assets/rain.png")
            //         //wind
            //         }else if ((day.list[1].wind.speed) > 24){
            //             $("#day-icon1").attr("src", "assets/wind.png")
            //         //thunderstorm
            //         }else if (((day.list[1].weather[0].id) === 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232)){
            //             $("#day-icon1").attr("src", "assets/storm.png")
            //         }else if (((day.list[1].weather[0].id) === 701 || 711 || 721 || 741)){
            //             $("#day-icon1").attr("src", "assets/haze.png")
            //         }
            //     $("#day1-temp").text("Temp: " + fahrenheitOne + " °F")
            //     $("#day1-humidity").text("Humidity: " + day.list[1].main.humidity + "%")
                
                
            //     //day2
            //     $("#day2-date").text(day.list[9].dt_txt)
                
    
            //         if((day.list[9].weather[0].id) === 800){
            //             $("#day-icon2").attr("src", "assets/sun.png")
            //         //cloudy
            //         }else if (((day.list[9].weather[0].id) === 801 || 802 || 803)){
            //             $("#day-icon2").attr("src", "assets/cloudy.png")
            //         //cloud
            //         }else if (((day.list[9].weather[0].id) === 804)){
            //             $("#day-icon2").attr("src", "assets/cloud.png")
            //         //snowing
            //         }else if (((day.list[9].weather[0].id) === 600 || 601 || 602 || 611 || 612 || 613 || 615 || 616 || 620 || 621 || 622)){
            //             $("#day-icon2").attr("src", "assets/snowing.png")
            //         //rain
            //         }else if (((day.list[9].weather[0].id) === 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321 || 500 || 501 || 502 || 503 || 504 || 511 || 520 || 521 || 522 || 531)){
            //             $("#day-icon2").attr("src", "assets/rain.png")
            //         //wind
            //         }else if ((day.list[9].wind.speed) > 24){
            //             $("#day-icon2").attr("src", "assets/wind.png")
            //         //thunderstorm
            //         }else if (((day.list[9].weather[0].id) === 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232)){
            //             $("#day-icon2").attr("src", "assets/storm.png")
            //         }else if (((day.list[9].weather[0].id) === 701 || 711 || 721 || 741)){
            //             $("#day-icon2").attr("src", "assets/haze.png")
            //         }
    
    
            //     $("#day2-temp").text("Temp: " + fahrenheitTwo + " °F")
            //     $("#day2-humidity").text("Humidity: " + day.list[9].main.humidity + "%")
            //     //day 3
            //     $("#day3-date").text(day.list[17].dt_txt)
    
    
    
    
            //     if((day.list[17].weather[0].id) === 800){
            //         $("#day-icon3").attr("src", "assets/sun.png")
            //     //cloudy
            //     }else if (((day.list[17].weather[0].id) === 801 || 802 || 803)){
            //         $("#day-icon3").attr("src", "assets/cloudy.png")
            //     //cloud
            //     }else if (((day.list[17].weather[0].id) === 804)){
            //         $("#day-icon3").attr("src", "assets/cloud.png")
            //     //snowing
            //     }else if (((day.list[17].weather[0].id) === 600 || 601 || 602 || 611 || 612 || 613 || 615 || 616 || 620 || 621 || 622)){
            //         $("#day-icon3").attr("src", "assets/snowing.png")
            //     //rain
            //     }else if (((day.list[17].weather[0].id) === 300 || 301 || 302 || 310 || 311 || 312 || 313 || 314 || 321 || 500 || 501 || 502 || 503 || 504 || 511 || 520 || 521 || 522 || 531)){
            //         $("#day-icon3").attr("src", "assets/rain.png")
            //     //wind
            //     }else if ((day.list[17].wind.speed) > 24){
            //         $("#day-icon3").attr("src", "assets/wind.png")
            //     //thunderstorm
            //     }else if (((day.list[17].weather[0].id) === 200 || 201 || 202 || 210 || 211 || 212 || 221 || 230 || 231 || 232)){
            //         $("#day-icon3").attr("src", "assets/storm.png")
            //     }else if (((day.list[17].weather[0].id) === 701 || 711 || 721 || 741)){
            //         $("#day-icon").attr("src", "assets/haze.png")
            //     }
    
    
    
    
    
    
    
            //     $("#day3-temp").text("Temp: " + fahrenheitThree + " °F")
            //     $("#day3-humidity").text("Humidity: " + day.list[17].main.humidity + "%")
            //     //day4
            //     $("#day4-date").text(day.list[25].dt_txt)
            //     //still need icon
            //     $("#day4-temp").text("Temp: " + fahrenheitFour + " °F")
            //     $("#day4-humidity").text("Humidity: " + day.list[25].main.humidity + "%")
            //     //day5
            //     $("#day5-date").text(day.list[33].dt_txt)
            //     //still need icon
            //     $("#day5-temp").text("Temp: " + fahrenheitFive + " °F")
            //     $("#day5-humidity").text("Humidity: " + day.list[33].main.humidity + "%")
    
    
            // })
          
    
       
    
    
      
    
    
    
    