import React, { useState } from "react";
import "./carList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarList = () => {
  const { data, loading, error, reFetch } = useFetch(`/cars`);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingCar, setBookingCar] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleBookClick = (car) => {
    setBookingCar(car);
    setIsBooking(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/rentals/rent", {
        carId: bookingCar._id,
        userId: "66abb61a1546c119e6a78c34", // Replace with actual user ID
        start_date: startDate,
        end_date: endDate
      });
      console.log(response.data);
      setIsBooking(false);
      reFetch();
    } catch (error) {
      console.error("Error booking car", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <>
                {data.map((car) => (
                  <div className="carItem" key={car._id}>
                    <img
                      src={car.photos && car.photos.length > 0 ? car.photos[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                      alt={car.name}
                      className="carImg"
                    />
                    <div className="carDetails">
                      <h1 className="carTitle">{car.model}</h1><br></br>
                      <span className="carBrand">{car.make}</span><br></br>
                      <span className="carFeatures">{car.year}</span><br></br>
                      <span className="carPrice">${car.price_per_day}</span><br></br>
                      <button onClick={() => handleBookClick(car)}>Book Now</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {isBooking && (
        <div className="bookingModal">
          <form className="bookingForm" onSubmit={handleBookingSubmit}>
            <h2>Book {bookingCar.model}</h2>
            <label>
              Start Date:
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </label>
            <label>
              End Date:
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </label>
            <button type="submit">Confirm Booking</button>
            <button onClick={() => setIsBooking(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CarList;
