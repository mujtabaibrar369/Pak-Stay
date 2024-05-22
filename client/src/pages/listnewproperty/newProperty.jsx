import "./newProperty.css";
import { Link, useNavigate } from "react-router-dom";
import Appartment from "./app.png";
import Home from "./homes.png";
import Hotel from "./hotel.png";
import More from "./more.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const NewProperty = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const gotToNewPage = () => {
    navigate("/addProperty");
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="homecontainer">
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Pak Stay</span>
          </Link>
          <Link style={{ color: "inherit", textDecoration: "none" }}>
            <span className="listing">View Your Listings</span>
          </Link>
        </div>
      </div>
      <div className="objective">
        <p className="main">
          List your property on Booking.com and start welcoming guests in no
          time!
        </p>
        <p className="sub">
          To get started, choose the type of property you want to list on
          Pak-Stay
        </p>
      </div>
      <div className="property-container">
        {/* Apartment section */}
        <div className="property">
          <img src={Appartment} />
          <h2>Apartment</h2>
          <p>
            Self-contained accommodation offering multiple rooms, kitchen
            facilities, providing a private and home-like setting for extended
            or short-term stays.
          </p>
          <button onClick={() => gotToNewPage()}>List your Property</button>
        </div>

        {/* Hotel section */}
        <div className="property">
          <img src={Hotel} />
          <h2>Hotel</h2>
          <p>
            Full-service accommodation, offering rooms and suites with daily
            housekeeping and amenities like restaurants, gyms, and room service.
          </p>
          <button onClick={() => gotToNewPage()}>List your Property</button>
        </div>

        {/* Villa section */}
        <div className="property">
          <img src={Home} />
          <h2>Homes</h2>
          <p>
            Privately owned residences, fully equipped for self-catering stays,
            where guests have exclusive access to the entire property.
          </p>
          <button onClick={() => gotToNewPage()}>List your Property</button>
        </div>
        {/* Villa section */}
        <div className="property">
          <img src={More} />
          <h2>Resort</h2>
          <p>
            A comprehensive holiday destination providing accommodation, dining,
            recreational activities, and wellness facilities in a single
            location.
          </p>
          <button onClick={() => gotToNewPage()}>List your Property</button>
        </div>
      </div>
    </div>
  );
};
export default NewProperty;
