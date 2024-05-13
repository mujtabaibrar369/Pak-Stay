import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./nearestProperties.css";

const NearestProperties = () => {
  let latitude, longitude;
  let cityName = "";
  const successCallback = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  const locationInfo = useFetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!locationInfo.loading) {
    cityName = locationInfo.data.city;
    console.log(cityName);
  }

  const { data, loading, error } = useFetch(`/hotels/?city=${cityName}`);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NearestProperties;
