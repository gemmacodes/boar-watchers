import React from 'react'

export default function Geolocation(position) {

// GETTING GEOLOCATION DATA
  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successGettingLocation, errorGettingLocation, {timeout: 5000});
    } else {
      console.log("Geolocation not available.");
    }
  }

  function successGettingLocation(position) {
    // convert UNIX timestamp to SQL timestamp
    const date = new Date(position.timestamp);
          const hours = date.getHours(),
              minutes = date.getMinutes(),
              seconds = date.getSeconds(),
              month = date.getMonth() + 1,
              day = date.getDate(),
              year = date.getFullYear();

    function pad(date) {return (date < 10 ? "0" : "") + date;}
    
    const formattedDate = pad(year) + "-" + pad(month) + "-" + pad(day) + " " + pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    const location = {timestamp: formattedDate, latitude: position.coords.latitude, longitude: position.coords.longitude}
    
    return location
  }

  function errorGettingLocation(error) {
    switch (error.code) {
      case 1: setError("You've decided not to share your position, but it's OK. We won't ask you again.");
      break;
      case 2: setError("The network is down or the positioning service can't be reached.");
      break;
      case 3: setError("The attempt timed out before it could get the location data.");
      break;
      default: setError("Geolocation failed due to unknown error.");
      break;
    }
  }

    return (
        <div>

        </div>
    )
}
