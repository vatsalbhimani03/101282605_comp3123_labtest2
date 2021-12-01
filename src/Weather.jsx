import React, { useState, useEffect } from 'react';
import './Weather.css'

export function Weather() {
    const [Data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    var today = new Date();
    var curDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var curTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    useEffect(() => {
        getForecastInfo().then(data => {
                            setData(data);
                            setDetails(data.current);
                            debugger;
                        })
                        .catch(err => {
                            console.log(`Something went wrong!\n ${err}`); 
                        })
                        .finally(() => {
                            setLoading(false);
                        })
    }, []);

    if (loading) {
        return (
            <div className="col-12">
                Loading...
            </div>
        )
    }


    return (
        <div>
            <div class="section-center">
                <h1 class="head">My Weather Forecast App</h1>
            </div>
            <div class="wrapper">
                <div class="weather">
                    <div class="city"><h1>Toronto, On, Canada</h1></div>
                        
                        <div class="clearfix"></div>

                    <div class="cont">
                    <div class="icon">
                        <i class="fa fa-sun-o spin glow"></i>
                        <i class="fa fa-cloud wind"></i>
                        <i class="fa fa-cloud two"></i>
                        <img 
                            height={130}
                            width={200}
                            src={`http://openweathermap.org/img/wn/${details.weather[0].icon}@2x.png`} 
                        />
                    </div>
                    <div class="temp">
                        <div class="current">
                        { (details.temp - 273.15).toFixed(2) }&deg;
                        </div>
                        <div class="main">
                            <b>{ details.weather[0].main }</b>
                        </div>
                        <div class="des">
                            Description: { details.weather[0].description }
                        </div>
                    </div>
                    <div class="clearfix"></div>

                    <div class="left"><i class="fa fa-angle-left"></i></div>
                    
                    <div class="date"><p>{ curDate }</p></div>
                    <div class="time"><p>{ curTime }</p></div>
                    <div class="right"><i class="fa fa-angle-right"></i></div>

                    </div>
                </div> 
            </div>
        </div>
    )
}

export async function getForecastInfo() {
    const api = "f002b8e4fabd114ca2364b387e14be92";
    const req = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=43.6532&lon=-79.3832&appid=${api}`);
    return await req.json();
}
export const convertingInCel = (temp) => {
    return (temp - 273.15).toFixed(2);
} 