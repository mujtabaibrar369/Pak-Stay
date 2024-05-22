import ReactModal from "react-modal";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [days, setDays] = useState(0);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [rooms, setRooms] = useState(1);
  const { dispatch, dates, options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const newDates = {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    const newOptions = {
      adult: adults,
      children: children,
      room: rooms,
    };
    console.log(newDates, newOptions);
    console.log(start, end, dayDifference(start, end));
    dispatch({
      type: "NEW_SEARCH",
      payload: { dates: newDates, options: newOptions },
    });
    setDays(dayDifference(start, end));
    setDateModalOpen(false);
  };

  useEffect(() => {
    if (!dates || dates.length === 0) {
      setDays(0);
    } else {
      setDays(dayDifference(dates[0].endDate, dates[0].startDate));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div class="loader"></div>
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                {days === 0 ? (
                  <>
                    <h1>Perfect for your stay!</h1>
                    <h2>
                      <b>Starting from $ {data.cheapestPrice}</b>{" "}
                    </h2>
                    <button onClick={() => setDateModalOpen(true)}>
                      Select Options
                    </button>
                  </>
                ) : (
                  <>
                    <h1>Perfect for a {days}-night stay!</h1>
                    <h2>
                      <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                      nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      {dateModalOpen && (
        <ReactModal isOpen={dateModalOpen} className="dateModal">
          <h2>Select your dates</h2>
          <form onSubmit={handleDateSubmit}>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            <input
              type="number"
              placeholder="Adults"
              onChange={(e) => setAdults(e.target.value)}
            />
            <input
              type="number"
              placeholder="Children"
              onChange={(e) => setChildren(e.target.value)}
            />
            <input
              type="number"
              placeholder="Rooms"
              onChange={(e) => setRooms(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setDateModalOpen(false)}>Close</button>
        </ReactModal>
      )}
    </div>
  );
};

export default Hotel;
