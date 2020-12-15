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
            $("#icon").attr("src", "assets/haze.png")

        }else if ((day.list[1].wind.speed) > 24){
             $("#icon").attr("src", "assets/wind.png")}


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
        var val=(date5.getMonth()+1)+"/"+(date5.getDate()+1)+"/"+date5.getFullYear();
        $("#day5-date").text(val)


        var dayTwo = day.daily[1];
        if(dayTwo.weather[0].id === 800){
            $("#day-icon1").attr("src", "assets/sun.png")
        //cloudy
        }else if (dayTwo.weather[0].id === 801 || dayTwo.weather[0].id === 802 || dayTwo.weather[0].id === 803){
            $("#day-icon1").attr("src", "assets/cloudy.png")
        //cloud
        }else if (dayTwo.weather[0].id === 804){
            $("#day-icon1").attr("src", "assets/cloud.png")
        //snowing
        }else if (dayTwo.weather[0].id === 600 || dayTwo.weather[0].id === 601 || dayTwo.weather[0].id === 602 || dayTwo.weather[0].id === 611 || dayTwo.weather[0].id === 612 || dayTwo.weather[0].id === 613 || dayTwo.weather[0].id === 615 || dayTwo.weather[0].id === 616 || dayTwo.weather[0].id === 620 || dayTwo.weather[0].id === 621 || dayTwo.weather[0].id === 622){
            $("#day-icon1").attr("src", "assets/snowing.png")
        //rain
        }else if (dayTwo.weather[0].id === 300 || dayTwo.weather[0].id === 301 || dayTwo.weather[0].id === 302 || dayTwo.weather[0].id === 310 || dayTwo.weather[0].id === 311 || dayTwo.weather[0].id === 312 || dayTwo.weather[0].id === 313 || dayTwo.weather[0].id === 314 || dayTwo.weather[0].id === 321 || dayTwo.weather[0].id === 500 || dayTwo.weather[0].id === 501 || dayTwo.weather[0].id === 502 || dayTwo.weather[0].id === 503 || dayTwo.weather[0].id === 504 || dayTwo.weather[0].id === 511 || dayTwo.weather[0].id === 520 || dayTwo.weather[0].id === 521 || dayTwo.weather[0].id === 522 || dayTwo.weather[0].id === 531){
            $("#day-icon1").attr("src", "assets/rain.png")
        //wind
        //thunderstorm
        }else if (dayTwo.weather[0].id === 200 || dayTwo.weather[0].id === 201 || dayTwo.weather[0].id === 202 || dayTwo.weather[0].id === 210 || dayTwo.weather[0].id === 211 || dayTwo.weather[0].id === 212 || dayTwo.weather[0].id === 221 || dayTwo.weather[0].id === 230 || dayTwo.weather[0].id === 231 || dayTwo.weather[0].id === 232){
            $("#day-icon1").attr("src", "assets/storm.png")
        }else if(dayTwo.weather[0].id === 701 || dayTwo.weather[0].id === 711 || dayTwo.weather[0].id === 721 || dayTwo.weather[0].id === 741){
            $("#day-icon1").attr("src", "assets/haze.png")

        }else if ((day.list[1].wind.speed) > 24){
             $("#day-icon1").attr("src", "assets/wind.png")}








             var dayThree = day.daily[2];
             if(dayThree.weather[0].id === 800){
                 $("#day-icon2").attr("src", "assets/sun.png")
             //cloudy
             }else if (dayThree.weather[0].id === 801 || dayThree.weather[0].id === 802 || dayThree.weather[0].id === 803){
                 $("#day-icon2").attr("src", "assets/cloudy.png")
             //cloud
             }else if (dayThree.weather[0].id === 804){
                 $("#day-icon2").attr("src", "assets/cloud.png")
             //snowing
             }else if (dayThree.weather[0].id === 600 || dayThree.weather[0].id === 601 || dayThree.weather[0].id === 602 || dayThree.weather[0].id === 611 || dayThree.weather[0].id === 612 || dayThree.weather[0].id === 613 || dayThree.weather[0].id === 615 || dayThree.weather[0].id === 616 || dayThree.weather[0].id === 620 || dayThree.weather[0].id === 621 || dayThree.weather[0].id === 622){
                 $("#day-icon2").attr("src", "assets/snowing.png")
             //rain
             }else if (dayThree.weather[0].id === 300 || dayThree.weather[0].id === 301 || dayThree.weather[0].id === 302 || dayThree.weather[0].id === 310 || dayThree.weather[0].id === 311 || dayThree.weather[0].id === 312 || dayThree.weather[0].id === 313 || dayThree.weather[0].id === 314 || dayThree.weather[0].id === 321 || dayThree.weather[0].id === 500 || dayThree.weather[0].id === 501 || dayThree.weather[0].id === 502 || dayThree.weather[0].id === 503 || dayThree.weather[0].id === 504 || dayThree.weather[0].id === 511 || dayThree.weather[0].id === 520 || dayThree.weather[0].id === 521 || dayThree.weather[0].id === 522 || dayThree.weather[0].id === 531){
                 $("#day-icon2").attr("src", "assets/rain.png")
             //wind
             //thunderstorm
             }else if (dayThree.weather[0].id === 200 || dayThree.weather[0].id === 201 || dayThree.weather[0].id === 202 || dayThree.weather[0].id === 210 || dayThree.weather[0].id === 211 || dayThree.weather[0].id === 212 || dayThree.weather[0].id === 221 || dayThree.weather[0].id === 230 || dayThree.weather[0].id === 231 || dayThree.weather[0].id === 232){
                 $("#day-icon2").attr("src", "assets/storm.png")
             }else if(dayThree.weather[0].id === 701 || dayThree.weather[0].id === 711 || dayThree.weather[0].id === 721 || dayThree.weather[0].id === 741){
                 $("#day-icon2").attr("src", "assets/haze.png")
     
             }else if ((day.list[1].wind.speed) > 24){
                  $("#day-icon2").attr("src", "assets/wind.png")}





                  var dayFour = day.daily[3];
                  if(dayFour.weather[0].id === 800){
                      $("#day-icon3").attr("src", "assets/sun.png")
                  //cloudy
                  }else if (dayFour.weather[0].id === 801 || dayFour.weather[0].id === 802 || dayFour.weather[0].id === 803){
                      $("#day-icon3").attr("src", "assets/cloudy.png")
                  //cloud
                  }else if (dayFour.weather[0].id === 804){
                      $("#day-icon3").attr("src", "assets/cloud.png")
                  //snowing
                  }else if (dayFour.weather[0].id === 600 || dayFour.weather[0].id === 601 || dayFour.weather[0].id === 602 || dayFour.weather[0].id === 611 || dayFour.weather[0].id === 612 || dayFour.weather[0].id === 613 || dayFour.weather[0].id === 615 || dayFour.weather[0].id === 616 || dayFour.weather[0].id === 620 || dayFour.weather[0].id === 621 || dayFour.weather[0].id === 622){
                      $("#day-icon3").attr("src", "assets/snowing.png")
                  //rain
                  }else if (dayFour.weather[0].id === 300 || dayFour.weather[0].id === 301 || dayFour.weather[0].id === 302 || dayFour.weather[0].id === 310 || dayFour.weather[0].id === 311 || dayFour.weather[0].id === 312 || dayFour.weather[0].id === 313 || dayFour.weather[0].id === 314 || dayFour.weather[0].id === 321 || dayFour.weather[0].id === 500 || dayFour.weather[0].id === 501 || dayFour.weather[0].id === 502 || dayFour.weather[0].id === 503 || dayFour.weather[0].id === 504 || dayFour.weather[0].id === 511 || dayFour.weather[0].id === 520 || dayFour.weather[0].id === 521 || dayFour.weather[0].id === 522 || dayFour.weather[0].id === 531){
                      $("#day-icon3").attr("src", "assets/rain.png")
                  //wind
                  //thunderstorm
                  }else if (dayFour.weather[0].id === 200 || dayFour.weather[0].id === 201 || dayFour.weather[0].id === 202 || dayFour.weather[0].id === 210 || dayFour.weather[0].id === 211 || dayFour.weather[0].id === 212 || dayFour.weather[0].id === 221 || dayFour.weather[0].id === 230 || dayFour.weather[0].id === 231 || dayFour.weather[0].id === 232){
                      $("#day-icon3").attr("src", "assets/storm.png")
                  }else if(dayFour.weather[0].id === 701 || dayFour.weather[0].id === 711 || dayFour.weather[0].id === 721 || dayFour.weather[0].id === 741){
                      $("#day-icon3").attr("src", "assets/haze.png")
          
                  }else if ((day.list[1].wind.speed) > 24){
                       $("#day-icon3").attr("src", "assets/wind.png")}










                       var dayFive = day.daily[4];
                       if(dayFive.weather[0].id === 800){
                           $("#day-icon4").attr("src", "assets/sun.png")
                       //cloudy
                       }else if (dayFive.weather[0].id === 801 || dayFive.weather[0].id === 802 || dayFive.weather[0].id === 803){
                           $("#day-icon4").attr("src", "assets/cloudy.png")
                       //cloud
                       }else if (dayFive.weather[0].id === 804){
                           $("#day-icon4").attr("src", "assets/cloud.png")
                       //snowing
                       }else if (dayFive.weather[0].id === 600 || dayFive.weather[0].id === 601 || dayFive.weather[0].id === 602 || dayFive.weather[0].id === 611 || dayFive.weather[0].id === 612 || dayFive.weather[0].id === 613 || dayFive.weather[0].id === 615 || dayFive.weather[0].id === 616 || dayFive.weather[0].id === 620 || dayFive.weather[0].id === 621 || dayFive.weather[0].id === 622){
                           $("#day-icon4").attr("src", "assets/snowing.png")
                       //rain
                       }else if (dayFive.weather[0].id === 300 || dayFive.weather[0].id === 301 || dayFive.weather[0].id === 302 || dayFive.weather[0].id === 310 || dayFive.weather[0].id === 311 || dayFive.weather[0].id === 312 || dayFive.weather[0].id === 313 || dayFive.weather[0].id === 314 || dayFive.weather[0].id === 321 || dayFive.weather[0].id === 500 || dayFive.weather[0].id === 501 || dayFive.weather[0].id === 502 || dayFive.weather[0].id === 503 || dayFive.weather[0].id === 504 || dayFive.weather[0].id === 511 || dayFive.weather[0].id === 520 || dayFive.weather[0].id === 521 || dayFive.weather[0].id === 522 || dayFive.weather[0].id === 531){
                           $("#day-icon4").attr("src", "assets/rain.png")
                       //wind
                       //thunderstorm
                       }else if (dayFive.weather[0].id === 200 || dayFive.weather[0].id === 201 || dayFive.weather[0].id === 202 || dayFive.weather[0].id === 210 || dayFive.weather[0].id === 211 || dayFive.weather[0].id === 212 || dayFive.weather[0].id === 221 || dayFive.weather[0].id === 230 || dayFive.weather[0].id === 231 || dayFive.weather[0].id === 232){
                           $("#day-icon4").attr("src", "assets/storm.png")
                       }else if(dayFive.weather[0].id === 701 || dayFive.weather[0].id === 711 || dayFive.weather[0].id === 721 || dayFive.weather[0].id === 741){
                           $("#day-icon4").attr("src", "assets/haze.png")
               
                       }else if ((day.list[1].wind.speed) > 24){
                            $("#day-icon4").attr("src", "assets/wind.png")}






                            var daySix = day.daily[5];
                            if(daySix.weather[0].id === 800){
                                $("#day-icon5").attr("src", "assets/sun.png")
                            //cloudy
                            }else if (daySix.weather[0].id === 801 || daySix.weather[0].id === 802 || daySix.weather[0].id === 803){
                                $("#day-icon5").attr("src", "assets/cloudy.png")
                            //cloud
                            }else if (daySix.weather[0].id === 804){
                                $("#day-icon5").attr("src", "assets/cloud.png")
                            //snowing
                            }else if (daySix.weather[0].id === 600 || daySix.weather[0].id === 601 || daySix.weather[0].id === 602 || daySix.weather[0].id === 611 || daySix.weather[0].id === 612 || daySix.weather[0].id === 613 || daySix.weather[0].id === 615 || daySix.weather[0].id === 616 || daySix.weather[0].id === 620 || daySix.weather[0].id === 621 || daySix.weather[0].id === 622){
                                $("#day-icon5").attr("src", "assets/snowing.png")
                            //rain
                            }else if (daySix.weather[0].id === 300 || daySix.weather[0].id === 301 || daySix.weather[0].id === 302 || daySix.weather[0].id === 310 || daySix.weather[0].id === 311 || daySix.weather[0].id === 312 || daySix.weather[0].id === 313 || daySix.weather[0].id === 314 || daySix.weather[0].id === 321 || daySix.weather[0].id === 500 || daySix.weather[0].id === 501 || daySix.weather[0].id === 502 || daySix.weather[0].id === 503 || daySix.weather[0].id === 504 || daySix.weather[0].id === 511 || daySix.weather[0].id === 520 || daySix.weather[0].id === 521 || daySix.weather[0].id === 522 || daySix.weather[0].id === 531){
                                $("#day-icon5").attr("src", "assets/rain.png")
                            //wind
                            //thunderstorm
                            }else if (daySix.weather[0].id === 200 || daySix.weather[0].id === 201 || daySix.weather[0].id === 202 || daySix.weather[0].id === 210 || daySix.weather[0].id === 211 || daySix.weather[0].id === 212 || daySix.weather[0].id === 221 || daySix.weather[0].id === 230 || daySix.weather[0].id === 231 || daySix.weather[0].id === 232){
                                $("#day-icon5").attr("src", "assets/storm.png")
                            }else if(daySix.weather[0].id === 701 || daySix.weather[0].id === 711 || daySix.weather[0].id === 721 || daySix.weather[0].id === 741){
                                $("#day-icon5").attr("src", "assets/haze.png")
                    
                            }else if ((day.list[1].wind.speed) > 24){
                                 $("#day-icon5").attr("src", "assets/wind.png")}
     



        })   

    })

})









        // var weatherArray = [
        //     (day.daily[0].weather[0].id)
        //     (day.daily[1].weather[0].id) 
        //     (day.daily[2].weather[0].id)
        //     (day.daily[3].weather[0].id)
        //     (day.daily[4].weather[0].id)
        //     (day.daily[5].weather[0].id)
        // ]
        //     for (let i = 0; i < weatherArray.length; index++) {
        //             console.log(weatherArray[i])
        //             if(weatherArray[i] === 800){
        //                 $("#icon").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 $("#day-icon1").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 $("#day-icon2").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 $("#day-icon3").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 $("#day-icon4").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 $("#day-icon5").append(weatherArray[0]).attr("src", "assets/sun.png")
        //                 //$("#icon").attr("src", "assets/sun.png")
        //             //cloudy
        //             }else if (weatherArray[i] === 801 || weatherArray[i] === 802 || weatherArray[i] === 803){
        //                 $("#icon").attr("src", "assets/cloudy.png")
        //             //cloud
        //             }else if (weatherArray[i] === 804){
        //                 $("#icon").attr("src", "assets/cloud.png")
        //             //snowing
        //             }else if (weatherArray[i] === 600 || weatherArray[i] === 601 || weatherArray[i] === 602 || weatherArray[i] === 611 || weatherArray[i] === 612 || weatherArray[i] === 613 || weatherArray[i] === 615 || weatherArray[i] === 616 || weatherArray[i] === 620 || weatherArray[i] === 621 || weatherArray[i] === 622){
        //                 $("#icon").attr("src", "assets/snowing.png")
        //             //rain
        //             }else if (weatherArray[i] === 300 || weatherArray[i] === 301 || weatherArray[i] === 302 || weatherArray[i] === 310 || weatherArray[i] === 311 || weatherArray[i] === 312 || weatherArray[i] === 313 || weatherArray[i] === 314 || weatherArray[i] === 321 || weatherArray[i] === 500 || weatherArray[i] === 501 || weatherArray[i] === 502 || weatherArray[i] === 503 || weatherArray[i] === 504 || weatherArray[i] === 511 || weatherArray[i] === 520 || weatherArray[i] === 521 || weatherArray[i] === 522 || weatherArray[i] === 531){
        //                 $("#icon").attr("src", "assets/rain.png")
        //             //wind
        //             //thunderstorm
        //             }else if (weatherArray[i] === 200 || weatherArray[i] === 201 || weatherArray[i] === 202 || weatherArray[i] === 210 || weatherArray[i] === 211 || weatherArray[i] === 212 || weatherArray[i] === 221 || weatherArray[i] === 230 || weatherArray[i] === 231 || weatherArray[i] === 232){
        //                 $("#icon").attr("src", "assets/storm.png")
        //             }else if(weatherArray[i] === 701 || weatherArray[i] === 711 || weatherArray[i] === 721 || weatherArray[i] === 741){
        //                 $("#icon").attr("src", "assets/haze.png")
            
        //             }else if ((day.list[1].wind.speed) > 24){
        //                  $("#day-icon").attr("src", "assets/wind.png")}
        //     }




  