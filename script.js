
$(document).ready(function () {
    
    getItem()
    
    var nameStorage = []


    $("#Search-Btn").on("click", function (event) {
    
    var cityName = $("#search").val().trim()
    var div = $("<button>").attr("class", "re-search").text(cityName);
    $("#sidebar").append(div);
    var apiKey = "9c7c14eca6e16b6d4c30a7c992224a18";
    
    var queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    
    nameStorage.push(cityName)  
    event.preventDefault()
    
    
    
    function storeItem(){ 
      localStorage.setItem("content", JSON.stringify(nameStorage));
      var savedCities = JSON.parse(localStorage.getItem("content"));
      if (nameStorage !== null){
          nameStorage = savedCities
      }  
    }
    
    
    
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
        
    
    
            var cloudy = [801, 802, 803]
            var snowing = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
            var rain = [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
            var storm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
            var haze = [701, 711, 721, 741]
    
        var dayOneIcon = day.daily[0].weather[0].id
        var dayOneWind = day.daily[0].wind_speed
        var dayOne = day.daily[0];
        if(dayOneIcon === 800){
            $("#icon").attr("src", "assets/sun.png")
        //cloudy
        }else if (cloudy.includes(dayOneIcon)){
            $("#icon").attr("src", "assets/cloudy.png")
        //cloud
        }else if (dayOneIcon === 804){
            $("#icon").attr("src", "assets/cloud.png")
        //snowing
        }else if (snowing.includes(dayOneIcon)){
            $("#icon").attr("src", "assets/snowing.png")
        //rain
        }else if (rain.includes(dayOneIcon)){
            $("#icon").attr("src", "assets/rain.png")
        //wind
        //thunderstorm
        }else if (storm.includes(dayOneIcon)){
            $("#icon").attr("src", "assets/storm.png")
        }else if(haze.includes(dayOneIcon)){
            $("#icon").attr("src", "assets/haze.png")
    
        }else if ((dayOneWind) > 24){
             $("#icon").attr("src", "assets/wind.png")}
    
    
        //temp
        var fahrenheit = (((((dayOne.feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        $("#temp").text("Temperature: " + (fahrenheit) + "°F");
        //humidity
        $("#humidity").text("Humidity: " + (dayOne.humidity) + "%");
        //wind speed
        $("#wind-speed").text("Wind-speed: " + (dayOne.wind_speed) + " MPH");
         var dayOneUvi = dayOne.uvi
        $("#uv-index").text("UV Index: " + dayOneUvi);
        if(dayOneUvi < 2){
            $("#uv-index").attr("class", "uv-good")
        }else if(dayOneUvi > 2 < 8){
            $("#uv-index").attr("class", "uv-moderate")
        }else $("#uv-index").attr("class", "uv-bad")
        
        var fahrenheitOne = (((((day.daily[1].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        var fahrenheitTwo = (((((day.daily[2].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        var fahrenheitThree = (((((day.daily[3].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        var fahrenheitFour = (((((day.daily[4].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
        var fahrenheitFive = (((((day.daily[5].feels_like.day) - 273.15) * 9) / 5) + 32).toFixed(2);
    
        $("#day1-temp").text("Temp: " + fahrenheitOne + " °F")
        $("#day2-temp").text("Temp: " + fahrenheitTwo + " °F")
        $("#day3-temp").text("Temp: " + fahrenheitThree + " °F")
        $("#day4-temp").text("Temp: " + fahrenheitFour + " °F")
        $("#day5-temp").text("Temp: " + fahrenheitFive + " °F")
    
        $("#day1-humidity").text("Humidity: " + day.daily[1].humidity + "%")
        $("#day2-humidity").text("Humidity: " + day.daily[2].humidity + "%")
        $("#day3-humidity").text("Humidity: " + day.daily[3].humidity + "%")
        $("#day4-humidity").text("Humidity: " + day.daily[4].humidity + "%")
        $("#day5-humidity").text("Humidity: " + day.daily[5].humidity + "%")
    
    
        var date1=new Date();
        var val=(date1.getMonth()+1)+"/"+(date1.getDate()+1)+"/"+date1.getFullYear();
        $("#day1-date").text(val)
        var date2=new Date();
        var val=(date2.getMonth()+1)+"/"+(date2.getDate()+2)+"/"+date2.getFullYear();
        $("#day2-date").text(val)
        var date3=new Date();
        var val=(date3.getMonth()+1)+"/"+(date3.getDate()+3)+"/"+date3.getFullYear();
        $("#day3-date").text(val)
        var date4=new Date();
        var val=(date4.getMonth()+1)+"/"+(date4.getDate()+4)+"/"+date4.getFullYear();
        $("#day4-date").text(val)
        var date5=new Date();
        var val=(date5.getMonth()+1)+"/"+(date5.getDate()+5)+"/"+date5.getFullYear();
        $("#day5-date").text(val)
    
    
        var dayTwo = day.daily[1];
        if(dayTwo.weather[0].id === 800){
            $("#day-icon1").attr("src", "assets/sun.png")
        //cloudy
        }else if (cloudy.includes(dayTwo.weather[0].id)){
            $("#day-icon1").attr("src", "assets/cloudy.png")
        //cloud
        }else if (dayTwo.weather[0].id === 804){
            $("#day-icon1").attr("src", "assets/cloud.png")
        //snowing
        }else if (snowing.includes(dayTwo.weather[0].id)){
            $("#day-icon1").attr("src", "assets/snowing.png")
        //rain
        }else if (rain.includes(dayTwo.weather[0].id)){
            $("#day-icon1").attr("src", "assets/rain.png")
        //wind
        //thunderstorm
        }else if (storm.includes(dayTwo.weather[0].id)){
            $("#day-icon1").attr("src", "assets/storm.png")
        }else if(haze.includes(dayTwo.weather[0].id)){
            $("#day-icon1").attr("src", "assets/haze.png")
    
        }else if ((dayOne.wind_speed) > 24){
             $("#day-icon1").attr("src", "assets/wind.png")}
    
    
    
             var dayThree = day.daily[2];
             if(dayThree.weather[0].id === 800){
                 $("#day-icon2").attr("src", "assets/sun.png")
             //cloudy
             }else if (cloudy.includes(dayThree.weather[0].id)){
                 $("#day-icon2").attr("src", "assets/cloudy.png")
             //cloud
             }else if (dayThree.weather[0].id === 804){
                 $("#day-icon2").attr("src", "assets/cloud.png")
             //snowing
             }else if (snowing.includes(dayThree.weather[0].id)){
                 $("#day-icon2").attr("src", "assets/snowing.png")
             //rain
             }else if (rain.includes(dayThree.weather[0].id)){
                 $("#day-icon2").attr("src", "assets/rain.png")
             //wind
             //thunderstorm
             }else if (storm.includes(dayThree.weather[0].id)){
                 $("#day-icon2").attr("src", "assets/storm.png")
             }else if(haze.includes(dayThree.weather[0].id)){
                 $("#day-icon2").attr("src", "assets/haze.png")
     
             }else if ((dayOne.list[2].wind_speed) > 24){
                  $("#day-icon2").attr("src", "assets/wind.png")}
    
    
    
    
    
                  var dayFour = day.daily[3];
                  if(dayFour.weather[0].id === 800){
                      $("#day-icon3").attr("src", "assets/sun.png")
                  //cloudy
                  }else if (cloudy.includes(dayFour.weather[0].id)){
                      $("#day-icon3").attr("src", "assets/cloudy.png")
                  //cloud
                  }else if (dayFour.weather[0].id === 804){
                      $("#day-icon3").attr("src", "assets/cloud.png")
                  //snowing
                  }else if (snowing.includes(dayFour.weather[0].id)){
                      $("#day-icon3").attr("src", "assets/snowing.png")
                  //rain
                  }else if (rain.includes(dayFour.weather[0].id)){
                      $("#day-icon3").attr("src", "assets/rain.png")
                  //wind
                  //thunderstorm
                  }else if (storm.includes(dayFour.weather[0].id)){
                      $("#day-icon3").attr("src", "assets/storm.png")
                  }else if(haze.includes(dayFour.weather[0].id)){
                      $("#day-icon3").attr("src", "assets/haze.png")
          
                  }else if ((dayOne.wind_speed) > 24){
                       $("#day-icon3").attr("src", "assets/wind.png")}
    
    
    
    
    
    
    
    
    
    
                       var dayFive = day.daily[4];
                       if(dayFive.weather[0].id === 800){
                           $("#day-icon4").attr("src", "assets/sun.png")
                       //cloudy
                       }else if (cloudy.includes(dayFive.weather[0].id)){
                           $("#day-icon4").attr("src", "assets/cloudy.png")
                       //cloud
                       }else if (dayFive.weather[0].id === 804){
                           $("#day-icon4").attr("src", "assets/cloud.png")
                       //snowing
                       }else if (snowing.includes(dayFive.weather[0].id)){
                           $("#day-icon4").attr("src", "assets/snowing.png")
                       //rain
                       }else if (rain.includes(dayFive.weather[0].id)){
                           $("#day-icon4").attr("src", "assets/rain.png")
                       //wind
                       //thunderstorm
                       }else if (storm.includes(dayFive.weather[0].id)){
                           $("#day-icon4").attr("src", "assets/storm.png")
                       }else if(haze.includes(dayFive.weather[0].id)){
                           $("#day-icon4").attr("src", "assets/haze.png")
               
                       }else if ((dayOne.wind_speed) > 24){
                            $("#day-icon4").attr("src", "assets/wind.png")}
    
    
    
    
    
    
                            var daySix = day.daily[5];
                            if(daySix.weather[0].id === 800){
                                $("#day-icon5").attr("src", "assets/sun.png")
                            //cloudy
                            }else if (cloudy.includes(daySix.weather[0].id)){
                                $("#day-icon5").attr("src", "assets/cloudy.png")
                            //cloud
                            }else if (daySix.weather[0].id === 804){
                                $("#day-icon5").attr("src", "assets/cloud.png")
                            //snowing
                            }else if (snowing.includes(daySix.weather[0].id)){
                                $("#day-icon5").attr("src", "assets/snowing.png")
                            //rain
                            }else if (rain.includes(daySix.weather[0].id)){
                                $("#day-icon5").attr("src", "assets/rain.png")
                            //wind
                            //thunderstorm
                            }else if (storm.includes(daySix.weather[0].id)){
                                $("#day-icon5").attr("src", "assets/storm.png")
                            }else if(haze.includes(daySix.weather[0].id)){
                                $("#day-icon5").attr("src", "assets/haze.png")
                    
                            }else if ((dayOne.wind_speed) > 24){
                                 $("#day-icon5").attr("src", "assets/wind.png")}
                                
    
    storeItem()
                                
                                
    
    
        })   
    
    })
    
    
    
    })
    
    
    function getItem(){
        var getItem = JSON.parse(localStorage.getItem("content"))
         var arrayOfValues = [];
    
    
          
         function newButton(){
    
    
             for(var i in getItem){
            
             if(getItem.hasOwnProperty(i)){
                 arrayOfValues.push(getItem[i]);
             }}
    
             for (let i = 0; i < arrayOfValues.length; i++) {
    
    
                 var button = $("<button>").attr("class", "re-search").text(arrayOfValues[i])
             $("#sidebar").append(button)
             };
                  
            console.log(arrayOfValues)
         } 
         newButton()
    
    } 
    })
