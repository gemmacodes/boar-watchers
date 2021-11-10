import {useState, useEffect} from 'react'

export const usePosition = () => {
    const [position, setPosition] = useState({});
    
    //callback functions
    const successGettingLocation = ({coords}) => {
    setPosition({
        lat: coords.latitude,
        long: coords.longitude,
    });
    };

    const errorGettingLocation = (error) => {
        console.log(error.message);
    };

    // fetching geolocation info from browser
    useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
        console.log('Geolocation is not supported');
        return;
    }

    geo.getCurrentPosition(successGettingLocation, errorGettingLocation);

       
    }, []);
    return position;
}